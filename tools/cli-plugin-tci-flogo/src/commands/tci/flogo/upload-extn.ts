import {flags} from '@oclif/command';
import {CLIBaseError, HTTPError, HTTPResponse, TCBaseCommand} from '@tibco-software/cic-cli-core';



export default class TciFlogoUploadExtension extends TCBaseCommand {
  static description = 'Upload Flogo® extensions to TIBCO Cloud™ Integration'
  static flags = {
    ...TCBaseCommand.flags,
    'extn-file': flags.string({
      required: true,
      multiple: true,
      description: 'Path of the extension zip. Only zip file supported. Set this option multiple times to upload multiple extensions in single command.',
      parse: (input) => input.trim()
    }),
    'scope': flags.string({
      description: 'Choose whether extension(s) should be uploaded only for the current user or for the entire organization. Default is set to organization',
      default: 'org',
      options: ["user", "org"],
      parse: (input) => input.trim(),
    }),
    "override": flags.boolean({ description: 'Overwrite an existing extension with the same name and type. If this option is set and the extension is already uploaded, then existing extension will be replaced with new upload. By default this option is disabled', default: false}),
  }

  static examples = [
    '$ tibco tci:flogo:upload-extn --extn-file=/local/path/Extension1.zip --extn-file=/local/path/Extension2.zip --scope=user',
    '$ tibco tci:flogo:upload-extn --extn-file=/local/path/Extension1.zip --extn-file=/local/path/Extension2.zip --scope=org',
    '$ tibco tci:flogo:upload-extn --extn-file=/local/path/Extension1.zip --extn-file=/local/path/Extension2.zip --scope=org --override'
  ]

  async run() {
    const {flags} = this.parse(TciFlogoUploadExtension)
    let scope = flags.scope;
    let files = flags["extn-file"];
    let req = this.getTCRequest();
    let override = flags.override;

    for (const file of files) {
      let resp = {} as HTTPResponse;
      const startTime = Date.now();
      this.log(`Uploading extension [${file}]...`);
      let data = {
        'extensionZip': "file://" + file
      }
      try {
        resp = await req.upload(`/tci/v1/subscriptions/0/extensions/upload?override=${override}&scope=${scope}`, data, {timeout: 120000}, false);
      } catch (err) {
        if (err instanceof HTTPError) {
          let httpErr = err as HTTPError;
          throw new CLIBaseError(`Failed to upload extension [${file}] due to problem with TCI API invocation. Response received - [Code:${httpErr.httpCode}, Body: ${JSON.stringify(httpErr.httpResponse)}]`);
        }
        throw err;
      }
      const stopTime = Date.now();
      this.log(`Extension [${file}] successfully uploaded in ${(stopTime - startTime) / 1000} seconds`);
    }
  }
}
