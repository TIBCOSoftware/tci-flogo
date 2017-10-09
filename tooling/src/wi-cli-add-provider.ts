#!/usr/bin/env node --harmony
import * as fs from "fs-extra";
import * as path from "path";
import * as program from "commander";
import * as ProgressBar from "progress";
import {
    GENERATOR_TYPE, WI_CLI_JSON, IContribModuleMetaData, WI_SERVICE_CONTRIBUTION,
    IContribProviderMetadata, IProviderMetaData, FIELD_PROVIDER_TYPE, TEMPLATE_TYPE_SUFFIX, TEMPLATE_TYPE
    , NG_IMPORTS, IContribServiceMetaData, IContribCategoryMetaData
} from "wi-studio/app/cli/template";
import {GenStartup} from "./wi-cli-generate";

function collectServiceTypes(val, memo) {
    // console.log(val);
    // console.log(memo);
    if (/^(value|valid|action)$/.test(val)) {
        memo.push(val);
    } else {
        throw Error("Invalid Service Type specified. Must be one of value | valid | action");
    }
    if (Array.isArray(memo) && Array.from(memo).length === 0) {
        memo.push("value");
        memo.push("valid");
    }
    return memo;
}

/**
 * Created by pdhar on 7/30/17.
 */
class AddProviderStartup {
    public static main(): number {
        program
            .option("-n, --name [contributionName]", "<required> Contribution Name")
            .option("-f, --field <FieldName>", "<required> Field Name")
            .option("-t, --type [ReturnType]", "<optional> Return Type", "string")
            .option("-s, --service [ServiceType] ",
                "<optional> Repeatable Service types value | valid | action, default types are valid and value",
                collectServiceTypes, [])
            .option("-y, --yes", "<optional> Overwrite Yes/No");

        program.on("--help", function () {
            console.log("  Examples:");
            console.log("");
            console.log("    $ wi-cli add handler");
            console.log("    $ wi-cli add provider -f <field name> -n <contribution name> [-t <return type>] [ -s value|valid|action ] ");
            console.log("");
        });
        program.parse(process.argv);
        let bar = AddProviderStartup.createProgressBar();

        if (!program.output) {
            program.output = process.cwd();
            console.log("Using current directory for output");
        } else {
            console.log("Using Folder:" + program.output + " for output");
        }

        if (!program.name) {
            console.error("Contribution name not found");
            process.exit(-1);
        }

        if (!program.field) {
            console.error("Field names not found");
            process.exit(-1);
        }

        let wicliJsonPath = path.resolve(program.output, WI_CLI_JSON);
        if (!fs.existsSync(wicliJsonPath)) {
            console.error("File wi-cli.json not found at:" + program.output);
            console.error("\"wi-cli init\" must be run before using \"wi-cli add\"");
            process.exit(-1);
        }
        let wicliCategoryConfig: IContribCategoryMetaData = fs.readJSONSync(wicliJsonPath);
        if (wicliCategoryConfig.contributions[<any>program.name]) {
            let wicliConfig = wicliCategoryConfig.contributions[<any>program.name];

            wicliConfig.services.forEach(service => {
                if (service.hasOwnProperty(WI_SERVICE_CONTRIBUTION)) {
                    let ctype = service[WI_SERVICE_CONTRIBUTION].type;
                    if (ctype === GENERATOR_TYPE.provider) {
                        console.log("Found Existing Contribution Module Type:" + ctype + "  reusing previous configuration.");
                    } else {
                        console.log("Found Existing Contribution Module Type:" + ctype);
                        if (program.yes) {
                            console.log("Resetting Contribution Module Type to: " + GENERATOR_TYPE.provider);
                            wicliConfig.services = [];
                        } else {
                            console.error("Use -y | --y to overwrite Contribution Module Type:" + ctype);
                            process.exit(-1);
                        }
                    }

                }
            });
            bar.tick(25);
            if (wicliConfig.services.length === 0) {
                let serviceMetaData: IContribProviderMetadata = {
                    name: wicliConfig.name,
                    type: GENERATOR_TYPE.provider,
                    values: [],
                    validation: [],
                    action: []
                };
                wicliConfig.services[0] = <{ string: IContribServiceMetaData }>{};
                wicliConfig.services[0][WI_SERVICE_CONTRIBUTION] = serviceMetaData;
            }

            // value
            if (program.service.indexOf(FIELD_PROVIDER_TYPE.value) > -1) {
                let fieldName = program.field;
                let fieldType = program.type;
                let fieldMetaData: IProviderMetaData = {
                    name: `${fieldName}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Value)}`,
                    returnType: fieldType,
                    imports: []
                };
                NG_IMPORTS.forEach((val, key) => {
                    let obj: { string: string[] } = <{ string: string[] }>{};
                    obj[key] = val;
                    fieldMetaData.imports.push(obj);
                });
                let fieldObj: { string: IProviderMetaData } = <{ string: IProviderMetaData }>{};
                fieldObj[fieldName] = fieldMetaData;
                wicliConfig.services[0][WI_SERVICE_CONTRIBUTION].values.push(fieldObj);
            }
            bar.tick(25);
            // validation
            if (program.service.indexOf(FIELD_PROVIDER_TYPE.valid) > -1) {
                let fieldName = program.field;
                let fieldType = program.type;
                let fieldMetaData: IProviderMetaData = {
                    name: `${fieldName}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Validation)}`,
                    returnType: fieldType,
                    imports: []
                };
                NG_IMPORTS.forEach((val, key) => {
                    let obj: { string: string[] } = <{ string: string[] }>{};
                    obj[key] = val;
                    fieldMetaData.imports.push(obj);
                });
                let fieldObj: { string: IProviderMetaData } = <{ string: IProviderMetaData }>{};
                fieldObj[fieldName] = fieldMetaData;
                wicliConfig.services[0][WI_SERVICE_CONTRIBUTION].validation.push(fieldObj);
            }
            bar.tick(25);
            // action
            if (program.service.indexOf(FIELD_PROVIDER_TYPE.action) > -1) {
                let fieldName = program.field;
                let fieldType = program.type;
                let fieldMetaData: IProviderMetaData = {
                    name: `${fieldName}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Action)}`,
                    returnType: fieldType,
                    imports: []
                };
                NG_IMPORTS.forEach((val, key) => {
                    let obj: { string: string[] } = <{ string: string[] }>{};
                    obj[key] = val;
                    fieldMetaData.imports.push(obj);
                });
                let fieldObj: { string: IProviderMetaData } = <{ string: IProviderMetaData }>{};
                fieldObj[fieldName] = fieldMetaData;
                wicliConfig.services[0][WI_SERVICE_CONTRIBUTION].action.push(fieldObj);
            }
            wicliCategoryConfig.contributions[<any>program.name] = wicliConfig;
            bar.tick(25);

            fs.writeJsonSync(wicliJsonPath, wicliCategoryConfig, {spaces: 4});

            console.log("Generating the providers");
            GenStartup.main(program.output, <any>program.name, "provider");
        } else {
            console.error("Unable to find the activity/connector with name " + <any>program.name + ". Please add the activity or connector before adding provider");
            process.exit(-1);
        }

        return 0;
    }

    public static createProgressBar(): ProgressBar {
        return new ProgressBar("  Adding Provider Metadata [:bar] :percent :elapseds", {
            complete: "=",
            incomplete: " ",
            width: 20,
            total: 100
        });
    }
}

AddProviderStartup.main();

