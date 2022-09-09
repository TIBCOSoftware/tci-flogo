import {flags} from '@oclif/command';
import {CLIBaseError, HTTPError, HTTPResponse, TCBaseCommand} from '@tibco-software/cic-cli-core';



export default class TciFlogoExportApp extends TCBaseCommand {
  static description = 'Export Flogo® application from TIBCO Cloud™ Integration'
  static flags = {
    ...TCBaseCommand.flags,
    'app-id': flags.string({
      required: true,
      description: 'Id of Flogo® app in TIBCO Cloud™ Integration',
      parse: (input) => input.trim()
    }),
    'tci-manifest': flags.boolean({
      description: 'Set this option in case you also want to export TIBCO Cloud™ Integration manifest JSON file. When set, both app and manifest JSON files are bundles together and exported as ${file-name}.zip in ${output-dir}. When not set, app exported as ${file-name}.json in ${output-dir}. By default this option is disabled',
      default: false
    }),
    'file-name': flags.string({
      description: 'Name of the file to be exported. Provide name without extension',
      required: true,
      parse: (input) => input.trim()
    }),
    'output-dir': flags.string({
      description: 'Local directory path where app JSON or zip to be downloaded. Default set to current directory',
      default: process.cwd()
    }),
  }

  static examples = [
    '$ tibco tci:flogo:export-app --app-id=1234556789101112 --file-name=MyApp --output-dir=/local/path/app',
    '$ tibco tci:flogo:export-app --app-id=1234556789101112 --file-name=MyAppArtifacts  --tci-manifest --output-dir=/local/path/app',
  ]



  async run() {
    const {flags} = this.parse(TciFlogoExportApp)
    let appId = flags["app-id"];
    let dest = flags["output-dir"];
    let manifest = flags["tci-manifest"];
    let fileName = flags["file-name"];
    let req = this.getTCRequest();
    const startTime = Date.now();
    if (manifest && manifest === true) {
      this.log("Downloading app JSON and manifest files....")
      let filePath = dest+`/${fileName}.zip`;
      let success = false;
      try {
         success = await req.download(`/tci/v1/subscriptions/0/apps/${appId}/export?manifest=true`, filePath, {method: "GET", timeout: 120000}, false);
      } catch (err) {
        if(err instanceof HTTPError) {
          let httpErr = err as HTTPError;
          throw new CLIBaseError(`Failed to download App and manifest JSON filess due to problem with TCI API invocation. Response received - [Code:${httpErr.httpCode}, Body: ${JSON.stringify(httpErr.httpResponse)}]`);
        }
        throw err;
      }
      if (success) {
        const stopTime = Date.now();
        this.log(`Zip file [${fileName}.zip] that includes App and manifest JSON is successfully downloaded in directory [${dest}] in ${(stopTime - startTime) / 1000} seconds.`)
      } else {
        throw new CLIBaseError("Failed to download app and manifest JSON files");
      }
    } else {
      this.log("Downloading app JSON file....")
      let filePath = dest+`/${fileName}.json`;
      let resp = {} as HTTPResponse;
      try {
         resp = await req.doRequest(`/tci/v1/subscriptions/0/apps/${appId}/export`, {method: "GET", timeout: 120000}, {});
      } catch (err) {
        if(err instanceof HTTPError) {
         let httpErr = err as HTTPError;
          throw new CLIBaseError(`Failed to download app JSON file due to problem with TCI API invocation. Response received - [Code:${httpErr.httpCode}, Body: ${JSON.stringify(httpErr.httpResponse)}]`);
        }
        throw err;
      }
      if(resp.statusCode && resp.statusCode === 200) {
        const fs = require('fs');
        try {
          const stopTime = Date.now();
          fs.writeFileSync(filePath, JSON.stringify(resp.body))
          this.log(`App JSON [${fileName}.json] is successfully downloaded in directory [${dest}] in ${(stopTime - startTime) / 1000} seconds.`)
        } catch (err) {
          throw new CLIBaseError(`Failed to download app JSON file in directory ${dest} due to error ${err.message}`);
        }
      } else {
        throw new CLIBaseError(`Failed to download app JSON file due to problem with TCI API invocation. Response received - [Code:${resp.statusCode}, Body: ${JSON.stringify(resp.body)}]`);
      }
    }
  }
}
