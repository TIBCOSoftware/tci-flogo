/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

/**
 * Requires
 */
const chalk = require('chalk');
const cli = require('commander');
const path = require('path');
const fs = require('fs-extra');
const config = require('./config/config');

/**
 * Init command
 */
cli
  .option(config.commands.init.parameters.location.name,
    config.commands.init.parameters.location.description)
  .option(config.commands.init.parameters.category.name,
    config.commands.init.parameters.category.description)
  .description(config.commands.init.description)
  .parse(process.argv);

if (cli.location == undefined || cli.category == undefined) {
  console.log(' ');
  console.log(chalk.red('To be able to initialize an extension you need to specify the location and category')); // eslint-disable-line max-len
  console.log(chalk.red('  for example tibcli-wi init --location ./temp --category tools')); // eslint-disable-line max-len
  console.log(' ');
  process.exit();
} else {
  fs.ensureDirSync(path.join(cli.location, cli.category));
  console.log(' ');
  console.log(chalk.dim('The folder for the extension category ' + cli.category + ' has been created in ' + cli.location)); // eslint-disable-line max-len
  console.log(' ');
}
