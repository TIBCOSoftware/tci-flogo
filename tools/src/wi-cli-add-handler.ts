#!/usr/bin/env node --harmony
import * as fs from "fs-extra";
import * as path from "path";
import * as program from "commander";
import * as ProgressBar from "progress";
import {
    GENERATOR_TYPE, WI_CLI_JSON, IContribModuleMetaData, WI_SERVICE_CONTRIBUTION,
    IContribProviderMetadata, IProviderMetaData, FIELD_PROVIDER_TYPE, TEMPLATE_TYPE_SUFFIX, TEMPLATE_TYPE
    , NG_IMPORTS, IContribHandlerMetaData, IContribServiceMetaData, IContribCategoryMetaData
} from "wi-studio/app/cli/template";
import {GenStartup} from "./wi-cli-generate";


/**
 * Created by pdhar on 7/30/17.
 */
class AddHandlerStartup {
    public static main(): number {
        program
            .option("-n, --name [contributionName]", "<required> Contribution Name")
            .option("-y, --yes", "<optional> Overwrite Yes/No");

        program.on("--help", function () {
            console.log("  Examples:");
            console.log("");
            console.log("    $ wi-cli add handler -n CONTRIBUTION_NAME");
            console.log("");
        });
        program.parse(process.argv);
        let bar = AddHandlerStartup.createProgressBar();
        if (!program.output) {
            program.output = process.cwd();
            console.log("Using current directory for output");
        } else {
            console.log("Using Folder:" + program.output + " for output");
        }

        if (!program.name) {
            console.error("contribution name not found");
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
                    if ( ctype === GENERATOR_TYPE.handler) {
                        console.log("Found Existing Contribution Module Type:" + ctype + "  same as \"add handler\" command, exiting.");
                        process.exit(0);
                    }
                    console.log("Found Existing Contribution Module Type:" + ctype);
                    if (program.yes) {
                        console.log("Resetting Contribution Module Type to: " + GENERATOR_TYPE.handler);
                        wicliConfig.services = [];
                    } else {
                        console.error("Use -y | --y to overwrite Contribution Module Type:" + ctype);
                        process.exit(-1);
                    }
                }
            });
            let serviceMetaData = <IContribHandlerMetaData> {
                name: wicliConfig.name,
                type: GENERATOR_TYPE.handler
            };
            let svc: { string: IContribServiceMetaData } = <{ string: IContribServiceMetaData }>{};
            svc[WI_SERVICE_CONTRIBUTION] = serviceMetaData;
            wicliConfig.services.push(svc);
            wicliCategoryConfig.contributions[<any>program.name] = wicliConfig;
            fs.writeJsonSync(wicliJsonPath, wicliCategoryConfig, {spaces: 4});
            bar.tick(100);

            console.log("Generating the handlers");
            GenStartup.main(program.output, <any>program.name, "handler");
        } else {
            console.error("Unable to find the activity/connector with name " + <any>program.name + ". Please add the activity or connector before adding handler");
            process.exit(-1);
        }
        return 0;
    }

    public static createProgressBar(): ProgressBar {
        return new ProgressBar("  Adding Handler [:bar] :percent :elapseds", {
            complete: "=",
            incomplete: " ",
            width: 20,
            total: 100
        });
    }
}

AddHandlerStartup.main();

