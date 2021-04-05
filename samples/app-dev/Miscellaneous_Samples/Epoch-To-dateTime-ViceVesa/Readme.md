# Epoch to datetime (and vice-versa) conversion.

## Prerequisites
TIBCO Cloud™ Integration - latest version. 

## Overview
This Flogo application demonstrates the usage of converting the timestamp or datetime from epoch format (unix time) into a valid datetime format and also the vice-versa conversion using the built-in functions. This is specifically useful in implementation of integration services. 

The application itself contains single flow to demonstrate both the conversions of datetime and epoch time. 

## Steps to use the Flogo application: 
1. Download the Flogo application (JSON file) from [here.](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/Miscellaneous_Samples/Epoch-To-dateTime-ViceVesa/flogo.json)
2. Login to TIBCO Cloud™ Integration with a valid subscription.
3. Steps to import the Flogo application (from step #1) is listed [here.](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/readme.md)
4. The imported Flogo app should look like shown below. 
5. The logic to generate Epoch is in the Mapper activity called GenerateEpoch and similarly to generate DateTime from Epoch logic is in the Mapper activity called DateTimeFromEpoch. 
6. For any additional information, please raise your queries or issues via the Issues section.
<img width="1680" alt="Epoch-DateTime-Conversion" src="https://user-images.githubusercontent.com/17696107/113614806-9974bc00-9670-11eb-9534-b39f8c93619d.png">

