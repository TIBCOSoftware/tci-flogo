# Flow-Control using Shared Data 

## Prerequisites
- TIBCO Cloud™ Integration

## Overview
This application demonstrates the flow-controlling mechanism of a TCI (Flogo) flow - basically process the jobs sequentially. (one job at a time) 

Shared data feature is leveraged to store the job status information, be shared across the flows (within application) and to ensure new jobs are only triggered after the current job completes. 

The limitation with this approach is while the current job is in execution, the subsequent incoming requests will be rejected and lost. There’s a separate and enhanced version of  this app with [data persistence option](https://github.com/TIBCOSoftware/tci-flogo/tree/master/samples/app-dev/flow-control.samples/Flogo_App-FLowController-WithPersistence) to store the incoming requests in a database. 

The Shared Data design is useful for Timer based triggers where users want one job at a time to be executed without any data loss concerns. It also helps when a user has multiple triggers within an app and specific triggers need to be executed sequentially.

## Steps to use the Flogo application
1. Download the Flogo application (JSON file) from [here.](https://github.com/TIBCOSoftware/tci-flogo/tree/master/samples/app-dev/flow-control.samples/Flogo_App-FlowControl_Mechnism_UsingSharedData)
2. Login to TIBCO Cloud™ Integration with a valid subscription.
3. Steps to import the Flogo application (from step #1) is listed [here](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/readme.md).
4. The imported Flogo app should look like shown below. ![](https://github.com/TIBCOSoftware/tci-flogo/tree/master/samples/app-dev/import-screenshots/flow-controller_sharedData.png)
6. For any additional information, please raise your queries or issues via the Issues section.
