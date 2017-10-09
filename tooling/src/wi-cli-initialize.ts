#!/usr/bin/env node --harmony
import * as fs from "fs-extra";
import * as path from "path";
import * as program from "commander";
import * as ProgressBar from "progress";
import {ContribInitGenerator} from "./generator";
import {IContribCategoryMetaData, IContribModuleMetaData, WI_CLI_JSON, IContribInitMetaData} from "wi-studio/app/cli/template"
import { GenStartup } from "./wi-cli-generate";
/**
 * Created by pdhar on 7/30/17.
 */
class InitStartup {
    public static main(): number {
        program
            .option("-c, --category [categoryName]", "<required> Category Name")
            .option("-s, --sdkpath [sdkpath]", "<optional> wi-cli.tar.gz file path OR wi-cli sdk folder path");
        program.on("--help", function () {
            console.log("  Examples:");
            console.log("");
            console.log("    $ wi-cli --help");
            console.log("    $ wi-cli -h");
            console.log("");
        });

        program.parse(process.argv);
        let progressBar = InitStartup.createProgressBar();

        if (!program.category) {
            console.error("Category name is missing.");
            process.exit(-1);
        }

        program.output = process.cwd();

        progressBar.tick(10);
        if (!program.sdkpath) {
            program.sdkpath = path.resolve(__dirname, "wi-studio");
            console.log("Using default SDK path:" + program.sdkpath);
        } else {
            console.log("Using wi-cli SDK path:" + program.sdkpath);
        }
        progressBar.tick(10);
        if (!fs.existsSync(program.output)) {
            fs.mkdirSync(program.output);
        } else {
            let stats = fs.statSync(program.output);
            if (!stats.isDirectory()) {
                console.error("Invalid folder: " + program.output);
                process.exit(-1);
            }
        }

        let wicliJsonPath = path.resolve(program.output, WI_CLI_JSON);
        if (fs.existsSync(wicliJsonPath)) {
            let stats = fs.statSync(wicliJsonPath);
            if (!stats.isFile()) {
                console.error("Already initialized a category");
                process.exit(-1);
            }
        }

        // Category shouldn't be wi-cli or node_modules
        let categoryPath = path.resolve(program.output, program.category);
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath);
        } else {
            let stats = fs.statSync(categoryPath);
            if (!stats.isDirectory()) {
                console.error("Invalid folder: " + categoryPath);
                process.exit(-1);
            }
        }
        progressBar.tick(10);
        let contribInitGenerator = new ContribInitGenerator(program.output, progressBar);
        let metadata: IContribInitMetaData = {
            name: <any> program.category,
            sdkpath: <any> program.sdkpath
        };
        contribInitGenerator.generate(metadata);
        progressBar.tick(10);
        return 0;
    }

    public static createProgressBar(): ProgressBar {
        return new ProgressBar("  Setting up metadata [:bar] :percent :elapseds", {
            complete: "=",
            incomplete: " ",
            width: 20,
            total: 80
        });
    }
}

InitStartup.main();

