#!/usr/bin/env node

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
const config = require('./config/config');
const os = require('os');

/**
 * Welcome message
 */
let art = '';
art = `${art} __   __ __          __ __                  __ ${os.EOL}`; // eslint-disable-line max-len
art = `${art}|  |_|__|  |--.----.|  |__|______.--.--.--.|__|${os.EOL}`; // eslint-disable-line max-len
art = `${art}|   _|  |  _  |  __||  |  |______|  |  |  ||  |${os.EOL}`; // eslint-disable-line max-len
art = `${art}|____|__|_____|____||__|__|      |________||__|${os.EOL}`; // eslint-disable-line max-len
art = `${art}The tibcli for Web Integrator extensions, v${config.version}${os.EOL}`; // eslint-disable-line max-len

console.log(chalk.blue(art));

/**
 * Main command
 */
cli
    .version(config.version)
    .description(config.main.description)
    .command(config.commands.sdk.command,
        config.commands.sdk.description)
    .command(config.commands.init.command,
        config.commands.init.description)
    .command(config.commands.add.command,
        config.commands.add.description)
    .command(config.commands.package.command,
        config.commands.package.description)
    .parse(process.argv);


