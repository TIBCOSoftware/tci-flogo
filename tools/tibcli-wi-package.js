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
const path = require('path');
const fs = require('fs-extra');
const archiver = require('archiver');

/**
 * Package command
 */
cli
  .option(config.commands.package.parameters.location.name,
  config.commands.package.parameters.location.description)
  .option(config.commands.package.parameters.target.name,
  config.commands.package.parameters.target.description)
  .description(config.commands.package.description)
  .parse(process.argv);

let location = '';
let target = '';

if (cli.location == undefined) {
  location = process.cwd();
} else {
  location = cli.location;
}

if (cli.target == undefined) {
  target = path.join(process.cwd(), '..', 'deployment');
} else {
  target = cli.target;
}

let currentdir = location.substring(location.lastIndexOf(path.sep)+1);
let rootfolder = location.substring(0,location.indexOf(currentdir)-1)

/**
 * Create a folder for the deployment in the parent folder
 */
fs.mkdirsSync(target);

/**
 * Create a file to stream archive data to
 */
let output = fs.createWriteStream(path.join(target, currentdir + '.zip'));
let archive = archiver('zip', {
  zlib: {level: 9},
});

/**
 * Receive the 'close' event, meaning the zip file was created
 */
output.on('close', function() {
  console.log(chalk.dim('The zip file has been created'));
  console.log(chalk.dim(`The ${currentdir}.zip file is ${archive.pointer()} bytes.`)); // eslint-disable-line max-len
});

/**
 * Catch all errors, warnings and other events that are fired
 *
 * The 'end' event is fired when the data source is drained no matter what
 * was the data source. It is not part of this library but rather from the
 * NodeJS Stream API.
 * @see: https://nodejs.org/api/stream.html#stream_event_end
 */
output.on('end', function() {
    console.log(chalk.red('Data has been drained'));
});

archive.on('warning', function(err) {
    console.log(chalk.yellow(err));
});

archive.on('error', function(err) {
    console.log(chalk.red(err));
});

/**
 * Pipe archive data to the file and add all files
 * excluding the node_modules folder and as a last step finalize
 * the archive.
 */
archive.pipe(output);

archive.glob('**/*', {dot: true, cwd: rootfolder});

archive.finalize();
