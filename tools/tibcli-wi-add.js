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
const templates = require('./tibcli-wi-templates');
const fs = require('fs-extra');
const config = require('./config/config');

/**
 * Properties
 */
let location = '';
let category = '';
let name = '';
let author = '';
let version = '';

/**
 * Add command
 */
cli
  .option(config.commands.add.parameters.location.name,
  config.commands.add.parameters.location.description)
  .option(config.commands.add.parameters.category.name,
  config.commands.add.parameters.category.description)
  .option(config.commands.add.parameters.name.name,
  config.commands.add.parameters.name.description)
  .option(config.commands.add.parameters.author.name,
  config.commands.add.parameters.name.description)
  .option(config.commands.add.parameters.version.name,
  config.commands.add.parameters.version.description)
  .option(config.commands.add.parameters.typescript.name,
  config.commands.add.parameters.typescript.description)
  .description(config.commands.add.description);

/**
 * Add connector command
 */
cli
  .command(config.commands.add.connector.name)
  .description(config.commands.add.connector.description)
  .action(function(options) {
    if (cli.location == undefined) {
      location = process.cwd();
    } else {
      location = cli.location;
    }
    if (cli.category == undefined) {
      let elements = process.cwd().split(path.sep);
      category = elements[elements.length - 1];
    } else {
      category = cli.category;
    }
    if (cli.ver == undefined) {
      version = '0.0.1';
    } else {
      version = cli.version;
    }
    if (cli.name == undefined || cli.author == undefined) {
      console.log(' ');
      console.log(chalk.red('To be able to add a connector to your extension, the --name and --author parameters must be defined for tibcli-wi add connector')); // eslint-disable-line max-len
      console.log(chalk.red('  for example tibcli-wi add connector --name ifttt --author someone')); // eslint-disable-line max-len
      console.log(' ');
      process.exit();
    } else {
      name = cli.name;
      author = cli.author;
      if (fs.existsSync(path.join(location, category, 'connector', name))) {
        console.log(' ');
        console.log(chalk.red('A connector with this name already exists...'));
        console.log(' ');
        process.exit();
      }

      fs.ensureDirSync(path.join(location, category, 'connector', name));

      let templateContent = templates.connectorTemplate;
      templateContent.name = name;
      templateContent.title = 'Connector for ' + name;
      templateContent.author = author;
      templateContent.version = version;
      templateContent.display.description = 'Connector for ' + name;
      templateContent.display.category = category;
      templateContent.ref = category + '/connector/' + name;
      fs.writeFileSync(path.join(location, category, 'connector', name,
        'connector.json'), JSON.stringify(templateContent), 'utf-8');

      templateContent = templates.connectorTypeScriptTemplate;
      templateContent = templateContent.replace(/TemplateConnectorContribution/g, name + 'ConnectorContribution'); // eslint-disable-line max-len
      fs.writeFileSync(path.join(location, category, 'connector', name,
        'connector.ts'), templateContent, 'utf-8');

      templateContent = templates.connectorTypeScriptModuleTemplate;
      templateContent = templateContent.replace(/TemplateConnectorContribution/g, name + 'ConnectorContribution'); // eslint-disable-line max-len
      templateContent = templateContent.replace(/TemplateConnectorModule/g, name + 'ConnectorModule'); // eslint-disable-line max-len
      fs.writeFileSync(path.join(location, category, 'connector', name,
        'connector.module.ts'), templateContent, 'utf-8');

      console.log(' ');
      console.log(chalk.dim('The connector templates for the connector ' + name + ' have been created')); // eslint-disable-line max-len
      console.log(' ');
    }
  });

/**
 * Add activity command
 */
cli
  .command(config.commands.add.activity.name)
  .description(config.commands.add.activity.description)
  .action(function(options) {
    if (cli.location == undefined) {
      location = process.cwd();
    } else {
      location = cli.location;
    }
    if (cli.category == undefined) {
      let elements = process.cwd().split(path.sep);
      category = elements[elements.length - 1];
    } else {
      category = cli.category;
    }
    if (cli.ver == undefined) {
      version = '0.0.1';
    } else {
      version = cli.version;
    }
    if (cli.name == undefined || cli.author == undefined) {
      console.log(' ');
      console.log(chalk.red('To be able to add an activity to your extension, the --name and --author parameters must be defined for tibcli-wi add activity')); // eslint-disable-line max-len
      console.log(chalk.red('  for example tibcli-wi add activity --name ifttt --author someone')); // eslint-disable-line max-len
      console.log(' ');
      process.exit();
    } else {
      name = cli.name;
      author = cli.author;
      if (fs.existsSync(path.join(location, category, 'activity', name))) {
        console.log(' ');
        console.log(chalk.red('An activity with this name already exists...'));
        console.log(' ');
        process.exit();
      }

      fs.ensureDirSync(path.join(location, category, 'activity', name));

      let templateContent = templates.activityTemplate;
      templateContent.name = name;
      templateContent.title = 'Activity for ' + name;
      templateContent.author = author;
      templateContent.version = version;
      templateContent.display.description = 'Activity for ' + name;
      templateContent.display.category = category;
      templateContent.ref = category + '/activity/' + name;
      fs.writeFileSync(path.join(location, category, 'activity', name,
        'activity.json'), JSON.stringify(templateContent), 'utf-8');

      templateContent = templates.activityGoTemplate;
      templateContent = templateContent.replace(/%%name%%/g, name);
      fs.writeFileSync(path.join(location, category, 'activity', name,
        'activity.go'), templateContent, 'utf-8');

      templateContent = templates.activityTestGoTemplate;
      templateContent = templateContent.replace(/%%name%%/g, name);
      fs.writeFileSync(path.join(location, category, 'activity', name,
        'activity_test.go'), templateContent, 'utf-8');

      if (cli.activityTypescript) {
        templateContent = templates.activityTypeScriptTemplate;
        templateContent = templateContent.replace(/TemplateActivityContribution/g, name + 'ActivityContribution'); // eslint-disable-line max-len
        fs.writeFileSync(path.join(location, category, 'activity', name,
          'activity.ts'), templateContent, 'utf-8');

        templateContent = templates.activityTypeScriptModuleTemplate;
        templateContent = templateContent.replace(/TemplateActivityContribution/g, name + 'ActivityContribution'); // eslint-disable-line max-len
        templateContent = templateContent.replace(/TemplateActivityModule/g, name + 'ActivityModule'); // eslint-disable-line max-len
        fs.writeFileSync(path.join(location, category, 'activity', name,
          'activity.module.ts'), templateContent, 'utf-8');
      }

      console.log(' ');
      console.log(chalk.dim('The activity templates for the activity ' + name + ' have been created')); // eslint-disable-line max-len
      console.log(' ');
    }
  });

cli.parse(process.argv);

/**
 * If none of the commands match, display the help
 */
if ((process.argv.indexOf(config.commands.add.activity.name) == -1) &&
  (process.argv.indexOf(config.commands.add.connector.name) == -1)) {
  cli.help();
  process.exit();
}
