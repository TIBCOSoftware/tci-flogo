#!/usr/bin/env node --harmony
import * as program from "commander";
/**
 * Created by pdhar on 7/30/17.
 */
class AddStartup {
    public static main(): number {

        program
            .command("activity", "Add an Activity to your category")
            .command("connector", "Add a Connector to your category")
            .command("handler", "Add a Module Handler Contribution Type")
            .command("provider", "Add a Module Provider Contribution Type")
            .parse(process.argv);


        program.on("--help", function () {
            console.log("  Examples:");
            console.log("");
            console.log("    $ wi-cli add activity [ -n <ACTIVITY_NAME> ] ");
            console.log("    $ wi-cli add connector [ -n <CONNECTOR_NAME> ] ");
            console.log("    $ wi-cli add provider [ -f field1 ] [ -n <ACTIVITY/CONNECTOR_NAME> ] [ -r string ] [ -t value|valid|action ] ");
            console.log("    $ wi-cli add handler [ -n <ACTIVITY/CONNECTOR_NAME> ] ");
            console.log("");
        });
        return 0;
    }

}

AddStartup.main();

