#!/usr/bin/env node --harmony
import fs from "fs";
import path from "path";
import * as program from "commander";
import * as ProgressBar from "progress";

class Startup {
    public static main(): number {
        program
            .version("1.0.0")
            .description("Welcome to wi-cli command line")
            .command("initialize", "Initialize wi-cli contribution project").alias("init")
            .command("add", "Add service artifacts").alias("add")
            .parse(process.argv);

        return 0;
    }
}

Startup.main();

