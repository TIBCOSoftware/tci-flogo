# Integrate TCI & TCM via Connector

## Prerequisites
TIBCO Cloud™ Integration, TIBCO Cloud™ Messaging - latest version. 

## Overview
This application demonstrates an easy way to integrate TCI (Flogo) and TCM (eFTL) using the OOTB connector for any publisher and subscriber messaging patterns. 

The application has two flows - Publisher and Subscriber. 

Publisher flow uses the Timer trigger for publishing events and the Subscriber flow uses the TCM Subscriber trigger to create events for incoming TCM messages from specific durable(s) or destination(s). These flows are easily extendable and customizable as per the business requirements. 

## Steps to use the Flogo application: 
1. Download the Flogo application (JSON file) from [here](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/TCM/TCM_Pub_Sub_UsingConnector/TCM_PubSub_UsingConnector.json)
2. Login to TIBCO Cloud™ Integration with a valid subscription.
3. Create a new Flogo app as shown in the snapshot below. 
4. On the app details page, select Import app option. 
5. Upload the JSON file of the app to be imported (from step #1) and Click Upload. 
6. Once the app is imported, some generic errors and warnings pertaining to the app are listed. This step validates whether all the activities and triggers used in the app are available in the Extensions tab.
7. Either selectively import flows or import all flows using the options and move forward to import the flow. 
