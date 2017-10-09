#!/usr/bin/env node --harmony
import * as fs from "fs-extra";
import * as path from "path";
import * as program from "commander";
import * as ProgressBar from "progress";
import {
    GENERATOR_TYPE, WI_CLI_JSON, IContribModuleMetaData, WI_SERVICE_CONTRIBUTION,
    IContribProviderMetadata, IProviderMetaData, FIELD_PROVIDER_TYPE, TEMPLATE_TYPE_SUFFIX, TEMPLATE_TYPE
    , NG_IMPORTS, IContribHandlerMetaData, IContribServiceMetaData, IContribCategoryMetaData, NG_MODULE_IMPORTS
} from "wi-studio/app/cli/template";
import {GenStartup} from "./wi-cli-generate";


/**
 * Created by sayinala on 10/02/17.
 */
class AddConnectorStartup {
    public static main(): number {
        program
            .option("-n, --name [connectorName]", "<required> Connector Name")
            .option("-y, --yes", "<optional> Overwrite Yes/No");

        program.on("--help", function () {
            console.log("  Examples:");
            console.log("");
            console.log("    $ wi-cli add connector -n CONNECTOR_NAME");
            console.log("");
        });
        program.parse(process.argv);
        let bar = AddConnectorStartup.createProgressBar();
        if (!program.output) {
            program.output = process.cwd();
            console.log("Using current directory for output");
        } else {
            console.log("Using Folder:" + program.output + " for output");
        }

        let wicliJsonPath = path.resolve(program.output, WI_CLI_JSON);
        if (!fs.existsSync(wicliJsonPath)) {
            console.error("File wi-cli.json not found at:" + program.output);
            console.error("\"wi-cli init\" must be run before using \"wi-cli add\"");
            process.exit(-1);
        }
        let wicliConfig: IContribCategoryMetaData = fs.readJSONSync(wicliJsonPath);
        wicliConfig.contributions[<any>program.name] = {};

        let wis: IContribModuleMetaData = {
            name: <any>program.name,
            imports: [],
            services: []
        };
        NG_MODULE_IMPORTS.forEach((val, key) => {
            let obj: { string: string[] } = <{ string: string[] }>{};
            obj[key] = val;
            wis.imports.push(obj);
        });

        wicliConfig.contributions[<any>program.name] = wis;

        fs.writeJsonSync(wicliJsonPath, wicliConfig, {spaces: 4});
        bar.tick(100);

        console.log("Generating the connector");
        let connectorPath = path.resolve(program.output, wicliConfig.name, program.name);
        if (!fs.existsSync(connectorPath)) {
            fs.mkdirSync(connectorPath);
        } else {
            let stats = fs.statSync(connectorPath);
            if (!stats.isDirectory()) {
                console.error("Invalid folder: " + connectorPath);
                process.exit(-1);
            }
        }
        GenStartup.main(program.output, <any>program.name, "connector");
        return 0;
    }

    public static createProgressBar(): ProgressBar {
        return new ProgressBar("  Adding Connector [:bar] :percent :elapseds", {
            complete: "=",
            incomplete: " ",
            width: 20,
            total: 100
        });
    }
}

AddConnectorStartup.main();

