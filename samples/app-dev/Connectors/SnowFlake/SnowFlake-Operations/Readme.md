# Integration with Snowflake

## Prerequisites
TIBCO Cloud™ Integration, TIBCO Flogo® Connector for Snowflake - latest version. 

## Overview
This Flogo application leverages OOTB TIBCO Flogo® Connector for Snowflake to easily integrate with Snowflake to demonstrate query and insert operations. This is primarily useful in any integration with Snowflake scenarios within an Enterprise. 

The flow demonstrates querying and retrieving records from Snowflake. 

## Steps to use the Flogo application: 
1. Download the Flogo application (JSON file) from [here.](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/Connectors/SnowFlake/SnowFlake-Operations/MP_IntegrationWithSnowFlake.json)
2. Login to TIBCO Cloud™ Integration with a valid subscription.
3. Separate connectivity add-on subscription for TIBCO Flogo® Connector for Snowflake is also needed. 
4. Steps to import the Flogo application (from step #1) is listed [here.](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/readme.md) Snowflake connection (under Connections menu option) details will need to be updated with appropriate configurations. 
5. The imported Flogo app should look like shown below. 
<img width="1679" alt="Screen Shot 2021-04-09 at 8 42 40 PM" src="https://user-images.githubusercontent.com/17696107/114202127-874a9480-9974-11eb-8c3f-65d178ff84d1.png">
6. Snowflake schema/table used in this Flogo application from step #1 is also shown below.
