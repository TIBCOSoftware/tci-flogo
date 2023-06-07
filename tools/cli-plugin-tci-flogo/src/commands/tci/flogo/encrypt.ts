import {flags} from '@oclif/command';
import {CLIBaseError, HTTPError, HTTPResponse, TCBaseCommand} from '@tibco-software/cic-cli-core';



export default class TciFlogoEncryptSecret extends TCBaseCommand {
  static description = 'Encrypt confidential data for Flogo® application configuration'
  static flags = {
    ...TCBaseCommand.flags,
    'value': flags.string({
      required: true,
      description: 'Value to be encrypted. Encrypted value will be printed in the terminal in the format: SECRET:<encrypted_value>. It is recommended to use encrypted value for confidential data like password, key etc. while running Flogo® apps on TIBCO Cloud™ or on-premise',
      parse: (input) => input.trim()
    }),
  }

  static examples = [
    '$ tibco tci:flogo:encrypt --value=MyAccessKey'
  ]

  async run() {
    const {flags} = this.parse(TciFlogoEncryptSecret)
    let req = this.getTCRequest();
    let resp = {} as HTTPResponse;
    let val = flags.value;
    this.log(val);
    try {
      resp = await req.doRequest(`/tci/v1/utils/encrypt?appType=flogo`, {method: "POST", timeout: 120000}, {"value": val});
    } catch (err) {
      if (err instanceof HTTPError) {
        let httpErr = err as HTTPError;
        throw new CLIBaseError(`Failed to encrypt value due to problem with TCI API invocation. Response received - [Code:${httpErr.httpCode}, Body: ${JSON.stringify(httpErr.httpResponse)}]`);
      }
      throw err;
    }
    if(resp && resp.statusCode == 200) {
      this.log(resp.body["encryptedValue"]);
    } else {
      throw new CLIBaseError(`Failed to encrypt value due to problem with TCI API invocation. Response received - [Code:${resp.statusCode}, Body: ${JSON.stringify(resp.body)}]`);
    }
  }
}


