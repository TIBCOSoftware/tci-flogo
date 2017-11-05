#!/usr/bin/env node --harmony
import * as fs from "fs-extra";
import * as path from "path";
import * as ProgressBar from "progress";
import {ContribCodeGenerator} from "./generator";
import {IContribCategoryMetaData, IContribModuleMetaData, WI_CLI_JSON} from "wi-studio/app/cli/template"

/**
 * Created by pdhar on 7/30/17.
 */
export class GenStartup {
    public static main(output: string, name: string, type: string): void {
        let bar = GenStartup.createProgressBar();

        let wicliJsonPath = path.resolve(output, WI_CLI_JSON);
        if (!fs.existsSync(wicliJsonPath)) {
            console.error("File wi-cli.json not found at:" + output);
            console.error("\"wi-cli init\" must be run before using \"wi-cli add\"");
            process.exit(-1);
        }
        let wicliConfig: IContribCategoryMetaData = fs.readJSONSync(wicliJsonPath);
        let generationPath = path.resolve(output, wicliConfig.name, name);
        let generator = new ContribCodeGenerator(generationPath, bar);
        generator.generate(wicliConfig.contributions[name]);

            // .subscribe(() => {
        let timer = setInterval(function () {
            bar.tick();
            if (bar.complete) {
                console.log("\ncomplete\n");
                clearInterval(timer);
            }
        }, 100);
            // });
    }

    public static createProgressBar(): ProgressBar {
        return new ProgressBar("  Generating Code [:bar] :percent :elapseds", {
            complete: "=",
            incomplete: " ",
            width: 20,
            total: 100
        });
    }
}
