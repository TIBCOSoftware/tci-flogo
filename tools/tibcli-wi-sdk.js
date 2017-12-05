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
const fs = require('fs-extra');
const targz = require('targz');
const got = require('got');
const path = require('path');
const config = require('./config/config');

/**
 * Properties
 */
let location = '';
let release = '';

/**
 * sdk command
 */
cli
  .option(config.commands.sdk.parameters.location.name,
    config.commands.sdk.parameters.location.description)
  .option(config.commands.sdk.parameters.clean.name,
    config.commands.sdk.parameters.clean.description)
  .description(config.commands.sdk.description);

/**
 * sdk get command
 */
cli
  .command(config.commands.sdk.get.name)
  .description(config.commands.sdk.get.description)
  .action(function(options) {
    if (cli.location == undefined) {
      console.log(' ');
      console.log(chalk.red('To be able to get the SDK from GitHub, the -l or --location parameter must be defined for tibcli-wi sdk get')); // eslint-disable-line max-len
      console.log(chalk.red('  for example tibcli-wi sdk get --location c:/temp')); // eslint-disable-line max-len
      console.log(' ');
      process.exit();
    } else {
      location = cli.location;
      got('https://api.github.com/repos/TIBCOSoftware/tci-webintegrator/releases/latest').then((response) => {
        if (response.statusCode != 200) {
          console.log(' ');
          console.log(chalk.red('Unable to get the latest release from GitHub')); // eslint-disable-line max-len
          console.log(' ');
          process.exit();
        } else {
          let res = JSON.parse(response.body);
          console.log(chalk.dim('The latest release found is: ' + res.tag_name)); // eslint-disable-line max-len
          release = res.tag_name;
          fs.ensureDirSync(location);
          downloadAndExtractStudioSDK();
        }
      });
    }
  });

cli.parse(process.argv);

/**
 * This function downloads the latest version of the Web Integrator Studio
 * SDK and extracts it to the given location
 */
function downloadAndExtractStudioSDK() {
  console.log(chalk.dim('Downloading and extracting the TIBCO Web Integrator Studio SDK... (this might take a while)')); // eslint-disable-line max-len
  got.stream(`https://github.com/TIBCOSoftware/tci-webintegrator/releases/download/${release}/wi-studio.tar.gz`).pipe(fs.createWriteStream(path.join(location, 'wi-studio.tar.gz')).on('close', function() {
      targz.decompress({
          src: path.join(location, 'wi-studio.tar.gz'),
          dest: path.join(location, 'studio'),
      }, function(err) {
          if (err) {
              console.log(chalk.red(err));
          } else {
              console.log(chalk.dim('Download and extraction completed!'));
              downloadAndExtractRuntimeSDK();
          }
      });
  }));
}

/**
 * This function downloads the latest version of the Web Integrator Runtime
 * SDK and extracts it to the given location
 */
function downloadAndExtractRuntimeSDK() {
  console.log(chalk.dim('Downloading and extracting the TIBCO Web Integrator Runtime SDK... (this might take a while)')); // eslint-disable-line max-len
  got.stream(`https://github.com/TIBCOSoftware/tci-webintegrator/releases/download/${release}/wi-runtime.tar.gz`).pipe(fs.createWriteStream(path.join(location, 'wi-runtime.tar.gz')).on('close', function() {
      targz.decompress({
          src: path.join(location, 'wi-runtime.tar.gz'),
          dest: path.join(location, 'runtime'),
      }, function(err) {
          if (err) {
              console.log(chalk.red(err));
          } else {
              console.log(chalk.red('Download and extraction completed!'));
              removeDownloadedFiles();
          }
      });
  }));
}

/**
 * This function removes the downloaded files if needed
 */
function removeDownloadedFiles() {
  if (cli.clean) {
    console.log(chalk.dim('Removing the files that were downloaded...'));
    fs.removeSync(path.join(location, 'wi-studio.tar.gz'));
    fs.removeSync(path.join(location, 'wi-runtime.tar.gz'));
  }
  console.log(' ');
  console.log(chalk.dim('The latest version of the Web Integrator SDK has been successfully downloaded')); // eslint-disable-line max-len
  console.log(' ');
}
