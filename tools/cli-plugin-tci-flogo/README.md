TIBCO Cloud™ CLI Plugin for TIBCO Cloud™ Integration - Develop(Flogo®)
====================================================================
TIBCO Cloud™ CLI will help you to quickly interact with TIBCO Cloud™ capabilities and manage its resources from your machine. It will also help you to automate your tasks, manage local dev environments or can be a part of CI/CD pipeline. This plug-in will help you perform Flogo® specific tasks.


# Table of Contents
1. [Prerequisites](#Prerequisite)
2. [Installation](#Installation)
3. [Commands](#Commands)
4. [License](#License)

# Prerequisite
1. You must install TIBCO Cloud™ CLI before installing this plug-in. Refer [`TIBCO Cloud™ CLI Installation`](https://github.com/TIBCOSoftware/cic-cli-main/blob/master/README.md#installation).
2. You must create a profile which has access to `Integration` domain. To create such profile, follow below steps:
   1. Run `tibco profiles:add`
   2. Give appropriate name to the profile. For easy remembering, follow <region_name>_<org_name> naming pattern.
   3. Select appropriate region
   4. Make sure you select at-least `Integration` domain. Use space bar for selection.
   5. Follow browser login, select desired organization and authorize CLI tool to access your org details.
   
# Installation   
Install this plug-in on the top of TIBCO Cloud™ CLI.
```
tibco plugins:install @tibco-software/cli-plugin-tci-flogo
```
Run `tibco tci:flogo --help` to ensure plug-in is successfully installed.

# Commands
<!-- commands -->
* [`tibco tci:flogo:export-app`](#tibco-tciflogoexport-app)
* [`tibco tci:flogo:build-app`](#tibco-tciflogobuild-app)
* [`tibco tci:flogo:upload-extn`](#tibco-tciflogoupload-extn)
* [`tibco tci:flogo:encrypt`](#tibco-tciflogoencrypt)

## `tibco tci:flogo:export-app`
This command helps you export the application JSON or application JSON and deployment manifest JSON from TIBCO Cloud™ Integration. 

**Usage**
```
tibco tci:flogo:export-app --help

# Export only Flogo® application. 
# In below example, app will be exported as OrderProcessingApp.json into /opt/source/orderprocessing/app

tibco tci:flogo:export-app --app-id=<app-id> --file-name=OrderProcessingApp --output-dir=/opt/source/orderprocessing/app --profile=US_DevOrg

# Export both application and TCI manifest JSON files. 
# In below example, both files will be bundled together and exported as OrderProcessingApp.zip into /opt/source/orderprocessing/app

tibco tci:flogo:export-app --app-id=<app-id> --file-name=OrderProcessingApp --output-dir=/opt/source/orderprocessing/app --profile=US_DevOrg --tci-manifest
```
## `tibco tci:flogo:build-app`
This command helps you build and download an app executable either for the existing app in your TIBCO Cloud™ Integration organization or for the application JSON you exported from TIBCO Cloud™ Integration organization. It also provides convenient options for building docker image. To use docker related options, [Docker](https://www.docker.com/) must be installed on the machine.

**Usage**
```
tibco tci:flogo:build-app --help

# Build app executable for exported Flogo® application JSON. 
# In below example, the Linux executable will be downloaded as OrderProcessingApp into /opt/source/orderprocessing/cicd

tibco tci:flogo:build-app --app-file=/opt/source/orderprocessing/app/OrderProcessingApp.json --exe-name=OrderProcessingApp --output-dir=/opt/source/orderprocessing/cicd --exe-arch=amd64 --exe-os=linux --profile=US_DevOrg

# Build app executable for TIBCO Cloud™ Integration Flogo® application. 
# In below example, the Linux executable will be downloaded as 'OrderProcessingApp' into /opt/source/orderprocessing/cicd

tibco tci:flogo:build-app --app-id=<tci-app-id> --exe-name=OrderProcessingApp --output-dir=/opt/source/orderprocessing/cicd --exe-arch=amd64 --exe-os=linux --profile=US_DevOrg

# Build docker image for TIBCO Cloud™ Integration Flogo® application. 
# In below example, the Linux executable would be downloaded as 'OrderProcessingApp' into /opt/source/orderprocessing/cicd and the docker image 'tibco.com/apps/OrderProcessingApp:1.0.0' would be created in local Docker registry

tibco tci:flogo:build-app --app-id=<tci-app-id> --exe-name=OrderProcessingApp --output-dir=/opt/source/orderprocessing/cicd --build-docker-image --docker-file=/opt/source/orderprocessing/cicd/Dockerfile --docker-image=tibco.com/apps/OrderProcessingApp:1.0.0 --profile=US_DevOrg
```
## `tibco tci:flogo:upload-extn`
This command helps you upload one or more custom extensions for yourself or for your organization.

**Usage**
```
tibco tci:flogo:upload-extn --help

# Upload multiple extensions for current user

tibco tci:flogo:upload-extn --extn-file=/opt/source/extensions/ParseXMLActivity.zip --extn-file=/opt/source/extensions/CustomFunctions.zip --scope=user --profile=US_DevOrg

# Upload multiple extensions to organization

tibco tci:flogo:upload-extn --extn-file=/opt/source/extensions/ParseXMLActivity.zip --extn-file=/opt/source/extensions/CustomFunctions.zip --scope=org --profile=US_StagingOrg
```

## `tibco tci:flogo:encrypt`
This command helps yor encrypt confidential data. This is helpful in protecting confidential data like password,key etc. while deploying Flogo® applications to TIBCO Cloud™ Integration or on-premise platforms.

**Usage**
```
 tibco tci:flogo:encrypt --help
 
 tibco tci:flogo:encrypt --value=MySecretKeyValue
 
 export AccessKeyVar=my_access_key
 tibco tci:flogo:encrypt --value=$AccessKeyVar
```
# License
**BSD**

