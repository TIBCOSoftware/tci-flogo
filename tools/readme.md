# tibcli-wi
The commandline tool designed to help developers with the Web Integrator SDK

## Install
You can install tibcli-wi by downloading the tibcli-wi.tgz from the releases section and executing
```
npm install -g ./tibcli-wi-x.x.x.tgz
```

## Usage and commands
```
 __   __ __          __ __                  __
|  |_|__|  |--.----.|  |__|______.--.--.--.|__|
|   _|  |  _  |  __||  |  |______|  |  |  ||  |
|____|__|_____|____||__|__|      |________||__|
The tibcli for Web Integrator extensions, v0.0.1

  Usage: tibcli-wi [options] [command]

  Help developers with the Web Integrator SDK


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    sdk         Download, unpack or update the SDK
    init        Create a new extension for Web Integrator
    add         Add an activity or connector to your extension
    package     Create a zip file of your extension
    help [cmd]  display help for [cmd]
```

## sdk
```
  Usage: tibcli-wi sdk [options] [command]

  Download, unpack or update the SDK


  Options:

    --location <location>  The location where the Web Integrator SDK should be unpacked
    --clean                Clean up the downloaded files after unzipping
    -h, --help                 output usage information


  Commands:

    get   Download the latest SDK from GitHub
```

To get the latest SDK from GitHub and store it in `c:/temp`
```
tibcli-wi sdk get --location c:/temp
```

## init
```
  Usage: tibcli-wi init [options]

  Create a new extension for Web Integrator


  Options:

    --location <location>  The location where the extension will be created
    --category <category>  The category for the extension
    -h, --help                 output usage information
```

To initialize a new extension for `tools` in `c:/temp`
```
tibcli-wi init --location c:/temp --category tools
```

## add
```
  Usage: tibcli-wi add [options] [command]

  Add an activity or connector to your extension


  Options:

    --location [location]  The root location of the extension, will default to this folder if not set
    --category [category]  The category of the extension, will default to the name of this folder if not set
    --name <name>          The name of the connector or activity
    --author <author>      The author of the connector or activity
    --ver [version]        The version of the connector or activity, will default to 0.0.1 if not set
    --activityTypescript   Create the TypeScript templates for a new activity
    --help                 output usage information


  Commands:

    connector   Add a connector to your extension
    activity    Add an activity to your extension
```
### connector
To create the template code for an ifttt connector in the tools category
```
tibcli-wi add connector --location c:/temp --category tools --name ifttt --author someone --ver 0.0.1
```
### activity
To create the template code for an ifttt activity in the tools category
```
tibcli-wi add activity --location c:/temp --category tools --name ifttt --author someone --ver 0.0.1
```
To also create the TypeScript templates for the activity (which you can use to enhance the user experience)
To create the template code for an ifttt connector in the tools category
```
tibcli-wi add connector --location c:/temp --category tools --name ifttt --author someone --ver 0.0.1 --activityTypescript
```

## package
```
  Usage: tibcli-wi package [options]

  Create a zip file of your extension


  Options:

    --location [location]  The root location of the extension, will default to this folder if not set
    --target [target]      The target location for the zip file, will default to the name of this folder if not set
    -h, --help                 output usage information
```

To package up the extension in c:/temp and store it in the same folder
```
tibcli-wi package --location c:/temp --target c:/temp
```
