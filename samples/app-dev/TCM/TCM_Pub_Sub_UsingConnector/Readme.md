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
3. Steps to import the Flogo application is listed [here](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/readme.md)
4. The imported Flogo app should look like shown below. 
