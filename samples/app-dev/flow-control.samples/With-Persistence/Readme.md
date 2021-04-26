# Flow-control with Persistence

## Prerequisites
- TIBCO Cloud™ Integration
- MySQL (database) - latest

## Overview
This application demonstrates the flow-controlling mechanism of a TCI (Flogo) flow - basically process the jobs sequentially (one job at a time) without any data loss. This application is an enhanced version of the app using only shared data feature. 

This application leverages a database to persist the incoming requests and process the inflight messages as the current jobs get executed successfully. This application demonstrates the Fire & Forget pattern where requests get processed without a certain order of priority or data loss concerns. 

Along with a database, Shared data feature is leveraged to store the job status information, be shared across the flow and to ensure new jobs are only triggered after the current job completes. All the inflight messages are stored in the database if a current job is under execution. Separate API is available to check the status of the requests to confirm whether the request is processed or still pending in the queue.

Timer based trigger monitors the database queue for stored requests. As soon as the current job completes, it fetches the next job for processing on a FIFO basis. Once the processing is successful, then the respective jobs will be removed from the database to avoid duplication or re-processing concerns. 

## Steps to use the Flogo application
1. Download the Flogo application (JSON file) from [here.](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/flow-control.samples/With-Persistence/MP_FlowController_WithPersistance.json)
2. Login to TIBCO Cloud™ Integration with a valid subscription.
3. Steps to import the Flogo application (from step #1) is listed [here.](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/readme.md)
4. Database (MySQL) structure used for the flow is as follows. 
    
     -- gtfscontroldb.flowcontroller definition
     CREATE TABLE `flowcontroller` (
     r_id` int(11) NOT NULL AUTO_INCREMENT, 
     request` varchar(5000) NOT NULL, 
     PRIMARY KEY (`r_id`)
     ) 
     ENGINE=InnoDB DEFAULT CHARSET=utf8;
      
5. Any other database can also be leveraged with this application. 
6. The imported Flogo app should look like shown below. ![flow](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/import-screenshots/flow-controller_withPersistence.png)
7. For any additional information, please raise your queries or issues via the Issues section.
