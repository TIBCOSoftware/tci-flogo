# Customer Order GraphQL API

## Prerequisites
TIBCO Cloud™ Integration, TIBCO Cloud™ Messaging - latest version. 

## Overview
This flow demonstrates a simplified Customer Order API implementation leveraging out-of-the-box GraphQL capabilities. The API has two methods implemented - GET to fetch the Order Information and POST - to create a new order request.

The flow also leverages the shared data feature to store the Order Information. The shared data feature is primarily useful to keep the incoming create order request in-memory rather than using any external persistence options. This shared data is available as long as the application is running.

## Steps to create a GraphQL API:

## Before you begin: 
- Ensure the GraphQL schema is available before the service implementation.  
- Many [tools](https://walmartlabs.github.io/json-to-simple-graphql-schema/) are available online to generate GraphQL schema from JSON.
- After generating the schema, add/update the schema with resolvers (Query & Mutation), so each verb/operation resolves the intended schema. 
- Sample GraphQL app (Flogo) is also available for quick reference at the end of the section. Users can import this sample app to get started. 

## Steps: 

1. This flow uses the GraphQL schema called [Order.gql](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/GraphQL/Customer-OrderAPI/Order.gql) for this use-case.
2. Create a new Flogo application and name it. (say GraphQL_CustomerOrderAPI)
3. Click on the Create button and that brings up the below window.
![G1](https://user-images.githubusercontent.com/17696107/114091332-2ec4ba00-98d6-11eb-8bb0-64953d2abde8.png)
4. Select the GraphQL Schema option from left hand side and navigate to the GraphQL schema (Order.gql) as shown below and click upload.
![G2](https://user-images.githubusercontent.com/17696107/114091463-5ca9fe80-98d6-11eb-8f6c-569bdbd6a6fe.png)
5. Once the upload is successful, the flow for each operation is automatically generated as shown below. 
![G3](https://user-images.githubusercontent.com/17696107/114091546-751a1900-98d6-11eb-837f-043dd5067ba1.png)
6. The service skeleton is now available for each verb/operation defined in the GraphQL schema. In this example, there’s one Query and one Mutation for the service and below are the auto-generated flows. 
![G4](https://user-images.githubusercontent.com/17696107/114091687-9844c880-98d6-11eb-8460-067a7806b1c2.png)
![G5](https://user-images.githubusercontent.com/17696107/114091711-9e3aa980-98d6-11eb-81f8-cb43314d7221.png)
7. Once the skeletons are ready, users can add the implementation logic per their business needs. In this example, the auto-generated flow from above steps is updated per the Customer Order use-case and looks as shown below. 
![G6](https://user-images.githubusercontent.com/17696107/114091754-b0b4e300-98d6-11eb-8389-7d88e7b08d9d.png)
8. Test the GraphQL service via any browser extensions or clients like Postman.
![G7](https://user-images.githubusercontent.com/17696107/114091798-be6a6880-98d6-11eb-8ff9-2c7b0d2c6128.png)

## Steps to use the Flogo application (Customer Order API): 
1. Download the Flogo application (JSON file) from [here.](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/GraphQL/Customer-OrderAPI/MP_GraphQL_CustomerOrderAPI.json) 
2. Login to TIBCO Cloud™ Integration with a valid subscription.
3. Steps to import the Flogo application (from step #1) is listed [here.](https://github.com/TIBCOSoftware/tci-flogo/blob/master/samples/app-dev/readme.md)
4. For any additional information, please raise your queries or issues via the Issues section.
