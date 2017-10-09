# Web integrator contribution CLI

Web integrator has the capability to let you to build your own activities, you can get the more information from [docs](https://tibcosoftware.github.io/tci-webintegrator/).

This CLI is aimed to provide the easy way to set up the environment and to provide the boilerplate code for the contribution.

## Steps to build wi-cli project

* After checking out this project run `npm run sdk` -- Which will get the sdk dependencies required by the cli
* Once the sdk's are available run `npm install` -- Which gets the all the other dependencies required by the cli
* Once the all the dependencies are available run `gulp` -- Generates the dist for the cli

## Installing wi-cli

* Once the wi-cli project is built copy the dist to the desired location where you want to generate your contribution boilerplate code
* Run `npm install -g file:./dist` -- Requires admin privileges to install based on your operating system
* Once above step is done you should be able to run wi-cli in your command prompt to see the welcome message from wi-cli. Now you are all set to use wi-cli to generate the contribution.

## Commands

* Once wi-cli is installed first you need to initialize the boilerplate code from the directory where you want to generate the code using `wi-cli init -c <CATEGORY_NAME>` -- This will generate a directory with the <CATEGORY_NAME> and the other required files for build and compiling.
* Now you can use the `add` command to add activity or connector as `wi-cli add activity -n <ACTIVITY_NAME>` or `wi-cli add connector -n <CONNECTOR_NAME>`
* Once the activity or connector is added you can use add handler or provider style contributions as `wi-cli add handler -n <ACTIVTY_NAME/CONNECTOR_NAME>` or `wi-cli add provider -n <ACTIVTY_NAME/CONNECTOR_NAME> -f <FIELD_NAME>`
* `add provider` provides another option `-s` to provide the type of providers for the field, default it created validation and value providers. You can `-s` as `wi-cli add provider -n <ACTIVTY_NAME/CONNECTOR_NAME> -f <FIELD_NAME> -s value -s valid -s action` which will create all three types of providers
* Each command provides it's own help information

* Examples:
    ```
    wi-cli -h
    wi-cli init -h
    wi-cli add -h
    wi-cli add activity -h
    wi-cli add connector -h
    wi-cli add handler -h
    wi-cli add provider -h
    ```

* Once the contribution generation is done you can run `npm run build` to perform the compilation of the typescript code

## License

This project is licensed under a BSD-type license. See license.txt.