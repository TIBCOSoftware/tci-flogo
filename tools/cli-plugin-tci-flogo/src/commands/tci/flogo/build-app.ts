import {flags} from '@oclif/command'
import {CLIBaseError, HTTPError, HTTPResponse, TCBaseCommand} from '@tibco-software/cic-cli-core';
import * as os from 'os'
const { exec } = require("child_process");


export default class TciFlogoBuildApp extends TCBaseCommand {
  static description = 'Build and download Flogo® application executable from TIBCO Cloud™ Integration'

  static getOSArch() {
    let arch = os.arch();
    if(arch == "x64") {
      return "amd64";
    }
    return arch;
  }

  static flags = {
    ...TCBaseCommand.flags,
    'app-file': flags.string({description: 'Local path of Flogo® application json file. Use this option in case you want to build executable from application json file', parse: (input) => input.trim(), exclusive: ['app-id']}),
    'app-id': flags.string({description: 'Id of Flogo® app in TIBCO Cloud™ Integration. Use this option in case you want to build executable for the TCI Flogo® application', parse: (input) => input.trim(), exclusive: ['app-file']}),
    'exe-name': flags.string({ required: true, description: 'Name of the executable', parse: (input) => input.trim()}),
    'exe-arch': flags.string({description: 'Architecture of the target operating system where executable to be run. Refer $GOARCH variable in https://go.dev/doc/install/source for supported architectures. Default set to current OS architecture', default: TciFlogoBuildApp.getOSArch()}),
    'exe-os': flags.string({description: 'Name of the target operating system where executable to be run. Refer $GOOS variable in https://go.dev/doc/install/source for supported OS names. Default set to current OS name', default: os.platform()}),
    'output-dir': flags.string({ description: 'Local directory path where executable to be downloaded. Default set to current directory', default: process.cwd()}),
    'build-docker-image': flags.boolean({ description: 'Build application docker image. Set this option in case you want to build docker image. `Docker` must be installed on the machine. By default this option is disabled', default: false}),
    'docker-file': flags.string({ description: 'Local path of the docker file. Default set to `${output-dir}/Dockerfile`', parse: (input) => input.trim(), dependsOn:['build-docker-image']}),
    'docker-image': flags.string({ description: 'Name of the docker image to be built. Default set to `${exe-name}:latest`', parse: (input) => input.trim(), dependsOn:['build-docker-image']}),
    'compress-exe': flags.boolean({ description: 'Set this option in case you want to download compressed executable. We use upx(https://upx.github.io/) for compression. By default this option is disabled', default: false}),
    'show-progress': flags.boolean({ description: 'Set this option in case you want to see the progress bar for operations. By default this option is disabled', default: false, hidden: true}),
  }



  async run() {
    const {flags} = this.parse(TciFlogoBuildApp)
    let app = flags["app-file"];
    let appId = flags["app-id"];
    if(app === "" && appId === "") {
      this.error("Either application json file path or TCI application ID must be provided");
      throw new CLIBaseError("Required configuration not provided");
    }
    let os_arch = flags["exe-arch"];
    let os_name = flags["exe-os"];
    let name = flags["exe-name"];
    let dest = flags["output-dir"];
    let compress = flags["compress-exe"];
    let showProgress = flags["show-progress"];
    let buildImage = flags["build-docker-image"];
    let req = this.getTCRequest();
    let resp = {} as HTTPResponse;
    const startTime = Date.now();
    if(buildImage == true && os_name === "darwin") {
      this.log("Setting OS name to `linux` as docker image build is enabled");
      os_name = 'linux';
    }
    if(app && app !== "") {
      this.log(`Building executable [Name:${name}, OS:${os_name}, Arch:${os_arch}] for the app [${app}]`)
      let data = {
        'flogo.json': "file://" + app
      }
      try {
        resp = await req.upload("/tci/v1/subscriptions/0/app/build/flogo?os=" + os_name + "&arch=" + os_arch, data, {}, showProgress);
      } catch (err) {
        if(err instanceof HTTPError) {
          let httpErr = err as HTTPError;
          throw new CLIBaseError(`Failed to build app executable due to problem with TCI API invocation. Response received - [Code:${httpErr.httpCode}, Body: ${JSON.stringify(httpErr.httpResponse)}]`);
        }
        throw err;
      }
    } else {
      this.log(`Building executable [Name:${name}, OS:${os_name}, Arch:${os_arch}] for the TCI app with Id [${appId}]`)
      try {
        resp = await req.doRequest("/tci/v1/subscriptions/0/apps/" + appId + "/flogo/build?os=" + os_name + "&arch=" + os_arch, {method: "POST"}, {});
      } catch (err) {
        if(err instanceof HTTPError) {
          let httpErr = err as HTTPError;
          throw new CLIBaseError(`Failed to build app executable due to problem with TCI API invocation. Response received - [Code:${httpErr.httpCode}, Body: ${JSON.stringify(httpErr.httpResponse)}]`);
        }
        throw err;
      }
    }
    if(((app !== "" && resp.statusCode == 202) || (appId !== "" && resp.statusCode == 200)) && resp.body) {
       let res = resp.body[resp.body.length - 1];
       let status = res['status'];
       if(status && status === "success") {
        this.log("App executable successfully built. Downloading now....")
        let success = false;
        if(app && app !== "") {
          let buildId = res['buildId'];
          try {
            success = await req.download("/tci/v1/subscriptions/0/app/build/flogo/" + buildId + "?compress=" + compress, dest + "/" + name, {method: "GET"}, showProgress);
          } catch (err) {
            if(err instanceof HTTPError) {
              let httpErr = err as HTTPError;
              throw new CLIBaseError(`Failed to download app executable due to problem with TCI API invocation. Response received - [Code:${httpErr.httpCode}, Body: ${JSON.stringify(httpErr.httpResponse)}]`);
            }
            throw err;
          }
        } else {
          try {
            success = await req.download("/tci/v1/subscriptions/0/apps/" + appId + "/flogo/build?compress=" + compress, dest + "/" + name, {method: "GET"}, showProgress);
          } catch (err) {
            if(err instanceof HTTPError) {
              let httpErr = err as HTTPError;
              throw new CLIBaseError(`Failed to download app executable due to problem with TCI API invocation. Response received - [Code:${httpErr.httpCode}, Body: ${JSON.stringify(httpErr.httpResponse)}]`);
            }
            throw err;
          }
        }
        if(success) {
          const stopTime = Date.now();
          this.log(`App executable [${name}] successfully built and downloaded at location [${dest}] in ${(stopTime - startTime)/1000} seconds.`);

          if(buildImage == true) {
            let dockerFile = flags["docker-file"];
            if(dockerFile === undefined || dockerFile === "") {
              dockerFile = dest+"/Dockerfile";
            }
            let dockerImage = flags["docker-image"];
            if(dockerImage === undefined || dockerImage === "") {
              dockerImage = name;
            }
            const startTime = Date.now();
            this.log(`Building docker image [${dockerImage}] using Dockerfile [${dockerFile}] from app directory [${dest}]`);
            exec("docker build -f "+dockerFile+" -t "+dockerImage+" "+dest, (error, stdout, stderr) => {
              if (error) {
                this.log('Failed to build Docker image ['+dockerImage+']');
                throw new CLIBaseError(error.message);
              }
              const stopTime = Date.now();
              this.log(`Docker image [${dockerImage}] successfully created in ${(stopTime - startTime)/1000} seconds.`);
            });

          }
        } else {
          throw new CLIBaseError("Failed to download app executable");
        }
       } else {
         throw new CLIBaseError(res['message']);
       }
    } else {
      this.log("ResponseCode:"+resp.statusCode);
      throw new CLIBaseError("Failed to build app executable.");
    }
  }
}
