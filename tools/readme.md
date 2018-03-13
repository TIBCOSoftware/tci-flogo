# wi-cli
The commandline tool designed to help developers with the Web Integrator SDK. The SDK is bundled inside a docker image which can be run without downloading the SDK's separately.

## Pre-requisites
1. Docker - [download](https://www.docker.com/get-docker)

## Install
You can install tibcli-wi by downloading the wi-cli.tar.gz from the releases section 


### 1. Import the docker image from wi-cli.tar.gz to your docker machine installation
```
gzcat wi-cli.tar.gz | docker import - wi-cli:latest
```
### 2. Create a executable shell script in your shell $PATH  called `wi-cli` with the following contents
```
#!/bin/bash
docker exec --rm -ti -v $PWD:/src wi-cli:latest $@
```
### Run the `wi-cli` shell command from your plugin project work folder
```
>cd <your project folder>
>wi-cli --help
```
## Command Line Help Documentation
### `wi-cli --help`
The wi-cli has three basic commands as follows in order of their execution.

  1. `init | initialize` -  This is the first step to initialize a wi-studio contribution project with the creation of the following files :-
      * `package.json` - Node Package Manager configuration
      * `wi-studio.json` - wi-studio command line interface configuration
      * `tsconfig.json` - Typescript compiler configuration
      * `tslint.json` - Typescript language and coding standard configuration.
1. `add` -  This is the second step to add contribution service artifacts. The user can choose between `Handler` or a `Provider` contribution implementation styles and add their respective input parameters which are then stored in the wi-cli.json file

1. The third step is to add the triggers, activities,connector to the  `Handler` or `Provider`
1. `compile` -  This the fourth and the final step
```
>cd <your project folder>
>wi-cli --help
 
  Usage: wi-cli [options] [command]
 
  Welcome to wi-cli command line
 
 
  Options:
 
    -V, --version  output the version number
    -h, --help     output usage information
 
 
  Commands:
 
    initialize|init   Initialize wi-cli contribution project
    add|add           Add service artifacts
    compile|compile   Add service artifacts
    help [cmd]        display help for [cmd]
```
### `wi-cli init --help`
```
>cd <your project folder>
>wi-cli init --help
 
  Usage: wi-cli-initialize [options]
 
 
  Options:
 
    -c, --category [categoryName]  <required> Category Name
    -s, --sdkpath [sdkpath]        <optional> wi-cli.tar.gz file path OR wi-cli sdk folder path
    -h, --help                     output usage information
  Examples:
 
    $ wi-cli --help
    $ wi-cli -h
```
### `wi-cli add --help`
```
>cd <your project folder>
>wi-cli add --help
 
  Usage: wi-cli-add [options] [command]
 
 
  Options:
 
    -h, --help  output usage information
 
 
  Commands:
 
    activity    Add an Activity to your category
    connector   Add a Connector to your category
    trigger     Add a Trigger to your category
    handler     Add a Module Handler Contribution Type
    provider    Add a Module Provider Contribution Type
    help [cmd]  display help for [cmd]
```
### `wi-cli add activity --help`
```
>cd <your project folder>
>wi-cli add activity --help
 
  Usage: wi-cli-add-activity [options]
 
 
  Options:
 
    -n, --name [activityName]  <required> Activity Name
    -y, --yes                  <optional> Overwrite Yes/No
    -h, --help                 output usage information
  Examples:
 
    $ wi-cli add activity -n ACTIVITY_NAME
```
### `wi-cli add connector --help`
```
>cd <your project folder>
>wi-cli add connector --help
 
  Usage: wi-cli-add-connector [options]
 
 
  Options:
 
    -n, --name [connectorName]  <required> Connector Name
    -y, --yes                   <optional> Overwrite Yes/No
    -h, --help                  output usage information
  Examples:
 
    $ wi-cli add connector -n CONNECTOR_NAME
```
### `wi-cli add trigger --help`
```
>cd <your project folder>
>wi-cli add trigger --help
 
  Usage: wi-cli-add-trigger [options]
 
 
  Options:
 
    -n, --name [triggerName]  <required> Trigger Name
    -y, --yes                 <optional> Overwrite Yes/No
    -h, --help                output usage information
  Examples:
 
    $ wi-cli add trigger -n TRIGGER_NAME
```
### `wi-cli add handler --help`
```
>cd <your project folder>
>wi-cli add handler --help
 
  Usage: wi-cli-add-handler [options]
 
 
  Options:
 
    -n, --name [contributionName]  <required> Contribution Name
    -y, --yes                      <optional> Overwrite Yes/No
    -sa, --sample                  <optional> Generate sample tests
    -h, --help                     output usage information
  Examples:
 
    $ wi-cli add handler -n CONTRIBUTION_NAME --sample
```
### `wi-cli compile`
```
>cd <your project folder>
>wi-cli compile
```

## Example
```
>cd <your project folder> 
>wi-cli init -c myCategory
Using default SDK path:/usr/local/share/.config/yarn/global/node_modules/wi-cli/wi-studio
  Setting up metadata [==========          ] 50% 0.0syarn install v1.3.2
...

>wi-cli add activity -n myActivity
Using current directory for output
  Adding Activity [====================] 100% 0.0s
Generating the activity
  Generating Code [====================] 100% 9.2s
 
complete
...

>wi-cli add trigger -n myTrigger
Using current directory for output
  Adding Trigger [====================] 100% 0.0s
Generating the trigger
  Generating Code [====================] 100% 9.2s
 
complete
...

>wi-cli add connector -n myConnector
Using current directory for output
  Adding Connector [====================] 100% 0.0s
Generating the connector
  Generating Code [====================] 100% 9.2s
 
complete
...

>wi-cli add handler -n myActivity --sample
Using current directory for output
  Adding Handler [====================] 100% 0.0s
Generating the handlers
  Generating Code [====================] 100% 9.2s
 
complete
...

>wi-cli add handler -n myTrigger --sample
Using current directory for output
  Adding Handler [====================] 100% 0.0s
Generating the handlers
  Generating Code [====================] 100% 9.2s
 
complete
...

>wi-cli add handler -n myConnector --sample
Using current directory for output
  Adding Handler [====================] 100% 0.0s
Generating the handlers
  Generating Code [====================] 100% 9.2s
 
complete
...

>wi-cli compile
  Setting up metadata [===                 ] 13% 0.0syarn install v1.3.2
 
[1/4] Resolving packages...
 
success Already up-to-date.
 
Done in 1.34s.
 
Checking for yarn packages exited with code 0
  Setting up metadata [=====               ] 25% 1.7syarn run v1.3.2
 
$ tsc
 
Done in 6.39s.
 
Compilation exited with code 0 
```
## Testing
Run a test container as shown below from your plugin project work folder
```
>cd <your project folder> 
>docker run --rm -ti -v $PWD:/src --entrypoint bash wi-cli:latest
# cd /src
# wi-test
```