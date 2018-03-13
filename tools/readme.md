# wi-cli
The commandline tool designed to help developers with the Web Integrator SDK. The SDK is bundled inside a docker image which can be run without downloading the SDK's separately.

## Pre-requisites
1. Docker - [download](https://www.docker.com/get-docker)

## Install
You can install tibcli-wi by downloading the wi-cli.tar.gz from the releases section 


### 1. Import the docker image from wi-cli.tar.gz to your docker machine installation or download the scripts from the `tools` folder of this github repository.
```
gzcat wi-cli.tar.gz | docker import - wi-cli:latest
```
### 2. Create a executable shell script in your shell $PATH  called `wi-cli` with the following contents or download the script from the `tools` folder of this github repository.
```
#!/bin/bash
docker exec --rm -ti -v $PWD:/src wi-cli:latest $@
```
### 3. Run the `wi-cli` shell command from your plugin project work folder
```
>cd <your project folder>
>wi-cli --help
```
### 4. Run a test container as shown below from your plugin project work folder or download the  scripts from the `tools` folder of this github repository.
```
>cd <your project folder> 
>docker run --rm -ti -v $PWD:/src --entrypoint bash wi-cli:latest
# cd /src
# wi-test
```
### 5. Packaging Steps - Create a file jszip.json in your project folder with the following contents or download json from the `tools` folder of this github repository.
  ```
  {
      "entities": [
          { "name": "./src/app/", "flatten": false, "root": true }
          
      ],
      "options": {
          "output": "./myContribution.zip"
      }
  }
  ```
  Edit the package.json on the line from
  ```
  "zip": "node ./node_modules/.bin/jszip ./<contribution-folder> -o ../contribution.zip",
  ```
  to
  ```
  "zip": "node ./node_modules/.bin/jszip --config ./jszip.json -o ../myContribution.zip",
  ```
  then run as per usage example below
  

## Command Line Help Documentation
### `wi-cli --help`
The wi-cli has three basic commands as follows in order of their execution.

  1. `init | initialize` -  This is the first step to initialize a wi-studio contribution project with the creation of the following files :-
      * `package.json` - Node Package Manager configuration
      * `wi-cli.json` - wi-studio command line interface configuration
      * `tsconfig.json` - Typescript compiler configuration
      * `tslint.json` - Typescript language and coding standard configuration.
      * `karma-test-shim.js` - Karma testing framework file.
      * `karma.conf.js` - Karma test framework configuration.
      * `test-setup.sh` - Karma pre-test script.
1. `add` -  This is the second step to add contribution service artifacts. The user can choose between `Handler` or a `Provider` contribution implementation styles and add their respective input parameters which are then stored in the wi-cli.json file. `Handler` contribution implementation style is the most easier style to use and is recommended. `Provider` contribution implementation style is recommended for advanced users who prefer better and smaller code management and readability. **It is recommended to use only one style for the whole plugin instead of mixing and matching and can lead to unpredictable results**.

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

## Example Usage
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
...

>docker run --rm -ti -v $PWD:/src --entrypoint bash tci-cli-wi:latest
bash-4.4# cd /src
bash-4.4# wi-test
yarn run v1.3.2
$ ./test-setup.sh && npm run build:test
 
> myCategory@1.0.0 build:test /src
> tsc -p src/
 
$ karma start karma.conf.js --single-run --browsers Chrome_custom
 
START:
##teamcity[blockOpened name='JavaScript Unit Tests' flowId='']
24 02 2018 01:27:48.444:WARN [watcher]: Pattern "/src/node_modules/babel-plugin-proxy/build/runtime.js" does not match any file.
24 02 2018 01:28:03.593:WARN [watcher]: Pattern "/src/node_modules/rxjs-extensions/**/*.js*" does not match any file.
24 02 2018 01:28:18.576:INFO [karma]: Karma v1.5.0 server started at http://0.0.0.0:9876/
24 02 2018 01:28:18.577:INFO [launcher]: Launching browser Chrome_custom with unlimited concurrency
24 02 2018 01:28:18.599:INFO [launcher]: Starting browser Chrome
24 02 2018 01:28:20.180:INFO [Chrome 61.0.3163 (Linux 0.0.0)]: Connected on socket Fyl3g-t4fzF_wY1LAAAA with id 46138733
  myActivityHandler tests
    myActivityHandler
      ✔ should return myActivityHandler
    connectionRefFieldProvider
      ✔ should return a field provider for :Connection Name
##teamcity[testSuiteStarted name='myActivityHandler tests myActivityHandler.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
 ##teamcity[testStarted name='should return myActivityHandler' flowId='karmaTC84570619846138733']
 ##teamcity[testFinished name='should return myActivityHandler' duration='74' flowId='karmaTC84570619846138733']
 ##teamcity[testSuiteFinished name='myActivityHandler tests myActivityHandler.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
  myConnectorHandler tests
    myConnectorHandler
      ✔ should return myConnectorHandler
##teamcity[testSuiteStarted name='myActivityHandler tests connectionRefFieldProvider.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
 ##teamcity[testStarted name='should return a field provider for :Connection Name' flowId='karmaTC84570619846138733']
 ##teamcity[testFinished name='should return a field provider for :Connection Name' duration='25' flowId='karmaTC84570619846138733']
 ##teamcity[testSuiteFinished name='myActivityHandler tests connectionRefFieldProvider.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
    connectionRefFieldProvider
      ✔ should return a field provider for :Connection Name
##teamcity[testSuiteStarted name='myConnectorHandler tests myConnectorHandler.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
 ##teamcity[testStarted name='should return myConnectorHandler' flowId='karmaTC84570619846138733']
 ##teamcity[testFinished name='should return myConnectorHandler' duration='12' flowId='karmaTC84570619846138733']
 ##teamcity[testSuiteFinished name='myConnectorHandler tests myConnectorHandler.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
  myTriggerHandler tests
    myTriggerHandler
      ✔ should return myTriggerHandler
##teamcity[testSuiteStarted name='myConnectorHandler tests connectionRefFieldProvider.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
 ##teamcity[testStarted name='should return a field provider for :Connection Name' flowId='karmaTC84570619846138733']
 ##teamcity[testFinished name='should return a field provider for :Connection Name' duration='13' flowId='karmaTC84570619846138733']
 ##teamcity[testSuiteFinished name='myConnectorHandler tests connectionRefFieldProvider.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
    connectionRefFieldProvider
      ✔ should return a field provider for :Connection Name
##teamcity[testSuiteStarted name='myTriggerHandler tests myTriggerHandler.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
 ##teamcity[testStarted name='should return myTriggerHandler' flowId='karmaTC84570619846138733']
 ##teamcity[testFinished name='should return myTriggerHandler' duration='11' flowId='karmaTC84570619846138733']
 ##teamcity[testSuiteFinished name='myTriggerHandler tests myTriggerHandler.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
 
Finished in 0.197 secs / 0.155 secs @ 01:28:23 GMT+0000 (UTC)
 
SUMMARY:
✔ 6 tests completed
##teamcity[testSuiteStarted name='myTriggerHandler tests connectionRefFieldProvider.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
 ##teamcity[testStarted name='should return a field provider for :Connection Name' flowId='karmaTC84570619846138733']
 ##teamcity[testFinished name='should return a field provider for :Connection Name' duration='20' flowId='karmaTC84570619846138733']
 ##teamcity[testSuiteFinished name='myTriggerHandler tests connectionRefFieldProvider.Chrome 61.0.3163 (Linux 0.0.0)' flowId='karmaTC84570619846138733']
##teamcity[blockClosed name='JavaScript Unit Tests' flowId='']
Done in 55.03s.
...


>npm run zip
 
> testc@1.0.0 zip /Users/yourname/temp/test
> node ./node_modules/.bin/jszip --config ./jszip.json -o ../myContribution.zip
 
  compressing [====================] 100% 0.0s
  done
 > unzip -v myContribution.zip
Archive:  myContribution.zip
 Length   Method    Size  Cmpr    Date    Time   CRC-32   Name
--------  ------  ------- ---- ---------- ----- --------  ----
       0  Stored        0   0% 02-22-2018 18:04 00000000  testc/
       0  Stored        0   0% 02-22-2018 18:04 00000000  testc/myActivity/
      42  Defl:N       42   0% 02-22-2018 18:04 30dcb4e1  testc/myActivity/myActivity.module.d.ts
    1437  Defl:N      589  59% 02-22-2018 18:04 25b06160  testc/myActivity/myActivity.module.js
     510  Defl:N      281  45% 02-22-2018 18:04 e6eb38ef  testc/myActivity/myActivity.module.js.map
     535  Defl:N      250  53% 02-22-2018 18:04 dbb62736  testc/myActivity/myActivity.module.ts
     681  Defl:N      286  58% 02-22-2018 18:04 422a5589  testc/myActivity/myActivityHandler.d.ts
    2820  Defl:N      946  67% 02-22-2018 18:04 afa5a365  testc/myActivity/myActivityHandler.js
    1050  Defl:N      412  61% 02-22-2018 18:04 7206bb3c  testc/myActivity/myActivityHandler.js.map
    1358  Defl:N      420  69% 02-22-2018 18:04 857aa42c  testc/myActivity/myActivityHandler.ts
       0  Stored        0   0% 02-22-2018 18:04 00000000  testc/myConnector/
      43  Defl:N       43   0% 02-22-2018 18:04 90346bee  testc/myConnector/myConnector.module.d.ts
    1449  Defl:N      589  59% 02-22-2018 18:04 a6293ec1  testc/myConnector/myConnector.module.js
     512  Defl:N      281  45% 02-22-2018 18:04 95a31393  testc/myConnector/myConnector.module.js.map
     539  Defl:N      249  54% 02-22-2018 18:04 b210cbd6  testc/myConnector/myConnector.module.ts
    2829  Defl:N      946  67% 02-22-2018 18:04 847fca77  testc/myConnector/myConnectorHandler.js
     682  Defl:N      286  58% 02-22-2018 18:04 24c7852a  testc/myConnector/myConnectorHandler.d.ts
    1052  Defl:N      408  61% 02-22-2018 18:04 b85bfb4a  testc/myConnector/myConnectorHandler.js.map
    1359  Defl:N      420  69% 02-22-2018 18:04 b13cc8fb  testc/myConnector/myConnectorHandler.ts
       0  Stored        0   0% 02-22-2018 18:04 00000000  testc/myTrigger/
      41  Defl:N       41   0% 02-22-2018 18:04 f38e282c  testc/myTrigger/myTrigger.module.d.ts
    1425  Defl:N      587  59% 02-22-2018 18:04 6f44bc1a  testc/myTrigger/myTrigger.module.js
     501  Defl:N      277  45% 02-22-2018 18:04 a48ec3a0  testc/myTrigger/myTrigger.module.js.map
     531  Defl:N      249  53% 02-22-2018 18:04 43703013  testc/myTrigger/myTrigger.module.ts
     747  Defl:N      302  60% 02-22-2018 18:04 e926cfb5  testc/myTrigger/myTriggerHandler.d.ts
    2889  Defl:N      960  67% 02-22-2018 18:04 1487c14e  testc/myTrigger/myTriggerHandler.js
    1085  Defl:N      429  61% 02-22-2018 18:04 f23d135b  testc/myTrigger/myTriggerHandler.js.map
    1422  Defl:N      430  70% 02-22-2018 18:04 1309b764  testc/myTrigger/myTriggerHandler.ts
--------          -------  ---                            -------
   25539             9723  62%                            28 files
  
```
