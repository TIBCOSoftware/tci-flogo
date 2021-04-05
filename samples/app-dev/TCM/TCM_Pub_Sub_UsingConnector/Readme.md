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
3. Steps to import the Flogo application (from step #1) is listed [here](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/readme.md)
4. The imported Flogo app should look like shown below. 
5. Publisher flow leverages TCMMessagePublisher activity to publish messages to a destination called "sub".
6. Subscriber flow leverages MessageSubscriber trigger to subscribe to messages on the destination called "sub".
7. Users need a valid subscription to TIBCO Cloud Messaging to configure the TIBCO Cloud Messaging Connector appropriately as shown below. 
8. For any additional information, please raise your queries or issues via the Issues section. 
<img width="1680" alt="TCM-Pub-Sub-Connector" src="https://user-images.githubusercontent.com/17696107/113564618-4cb8c300-9627-11eb-8df5-aad897d87418.png">
<img width="557" alt="TCMConnector" src="https://user-images.githubusercontent.com/17696107/113564638-56dac180-9627-11eb-824b-98199cd388a8.png">
