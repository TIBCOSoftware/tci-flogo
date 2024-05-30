# Sample demonstrating Flow Tester using on-premise DB services

## Description

This sample demonstrates how to use flow tester for the Flogo apps using on-premise PostgreSQL Database.

## Pre-requisites

1. Ensure that PostgreSQL DB is up and running on-premise.
2. User must have Admin access to enable/disable services via TCI Platform API.
3. Ensure that OAUTH Token is generated in order to use API. Please refer [here](https://integration.cloud.tibco.com/docs/#Subsystems/tci-api/getstarted/basics/enable-api-access.html?Highlight=OAUTH%20Token)
4. User must download the latest tibagent. Please refer [here](https://integration.cloud.tibco.com/docs/#tci/using/hybrid-agent/installing-configuring-running-agent.html?TocPath=Using%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%257CUsing%2520the%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520-%2520Hybrid%2520Agent%257C_____4)
5. Ensure that hybrid proxy must be enabled in your organization before (To enable the Hybrid proxy user just need to create agent in the current organization. This step should only perform when user see error message "Please enable hybrid proxy first" while enabling/disabling the serivce through Platform API. Please refer [here](https://integration.cloud.tibco.com/docs/#tci/using/hybrid-agent/installing-configuring-running-agent.html?TocPath=Using%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%257CUsing%2520the%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520-%2520Hybrid%2520Agent%257C_____4))

## Enable the dbservice

There are 2 ways to enable dbservice. One is from UI and another is from Platform API. When enable dbservice from any of the way it uses system access key.
In this sample we are enabling dbservice from Platfrom API.To know more,please refer [here](https://integration.cloud.tibco.com/docs/#Subsystems/tci-api/organization/enable-dbservice.html?TocPath=TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520API%257CManaging%2520an%2520Organization%2520with%2520the%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520API%257C_____4)

Below is the API that we should invoke to enable the db service. 

**/v1/subscriptions/{subscriptionLocator}/dbservice**

![Enable dbservice](../../../import-screenshots/Onpremise_Postgresql/enable_dbservice.jpg)
 
## Enable the Flogotester

In order to test on-premise services using flow tester user first need to enable the flogotester service TCI Platform API.To know more, please refer [here](https://integration.cloud.tibco.com/docs/#Subsystems/tci-api/organization/flogo-tester-access.html?TocPath=TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520API%257CManaging%2520an%2520Organization%2520with%2520the%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520API%257C_____11)

Hit below API to enable the flogotester.

**/v1/subscriptions/{subscriptionLocator}/flogotester**

![Enable flogotester](../../../import-screenshots/Onpremise_Postgresql/enable_flogotester.png)

**Note:-** To test Flogo apps using on-premise PostgreSQL Database via endpoints then please refer [this](https://github.com/TIBCOSoftware/tci-flogo/tree/master/samples/app-dev/Connectors/OnPremise/TestViaEndpoint) sample

## Create and Start the tibagent

Below are the steps to create and start an agent:

./tibagent configure agent <agent_name> 

./tibagent start agent --spec container_port:onpremise_host:onpremise_port <agent_name>

To know more about Hybrid agents. Please refer [here](https://integration.cloud.tibco.com/docs/#tci/using/hybrid-agent/agent-command-reference.html?TocPath=Using%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%257CUsing%2520the%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520-%2520Hybrid%2520Agent%257C_____5)

## Import the sample

1. Download the sample json file i.e., PostgreSQL-Onprem-Flogotester.json.

2. Create a new empty app

![Create an app](../../../import-screenshots/sqlserver_screenshot/1.png)

3. On the app details page, select import app option.

![Select import](../../../import-screenshots/sqlserver_screenshot/2.png)

4. Now click on ‘browse to upload’ button and select the app.json from your machine that you want to import.

![Import your sample](../../../import-screenshots/Onpremise_Postgresql/3.png)

5. Click on Upload Button. The Import app dialog displays shows what Triggers is using, Flow name, Connection and some generic errors and warnings as well as any specific errors or warnings pertaining to the app you are importing.

![The Import app dialog](../../../import-screenshots/Onpremise_Postgresql/4.jpg)

![The Import app dialog](../../../import-screenshots/Onpremise_Postgresql/5.jpg)

6. After importing app is done, in connection tab make sure to re-enter the password and click on connect button to establish the connection.

## Understanding the configuration

### The Connection

When you import the app you need to re-enter the password and establish the connection.

![The connection](../../../import-screenshots/Onpremise_Postgresql/6.png)
![The connection](../../../import-screenshots/Onpremise_Postgresql/7.png)
![The connection](../../../import-screenshots/Onpremise_Postgresql/8.png)

In the connection, note that,
1. Host - In this field we give private ip of the on-premise system on which database is hosted.
2. On-premise "True" means that it establishes connection to on-premise database.

### The Flow

If you go inside the app, you can see in flow we have 4 activities (Query,Insert, Update and Delete) that perform some operations.
Also in flow we have Log Message to log the output and Return activity for getting the output.

![Sample Response](../../../import-screenshots/Onpremise_Postgresql/9.jpg)

### Run the application

In order to test the on-premise DBConnector service in flow tester we need to select the "*Using on-premise services*" checkbox in Flogo Launch configuration.
 
In flow, click on Test Button -> create Launch configuration -> Select "Using on-premise services" checkbox -> click Next button -> click on Run

![sample Response](../../../import-screenshots/Onpremise_Postgresql/10.png)

![Sample Response](../../../import-screenshots/Onpremise_Postgresql/11.jpg)

![Sample Response](../../../import-screenshots/Onpremise_Postgresql/12.png)

## Outputs

Flow Tester

![Sample Response](../../../import-screenshots/Onpremise_Postgresql/13.jpg)

![Sample Response](../../../import-screenshots/Onpremise_Postgresql/14.jpg)


## Troubleshooting

* If PostgreSQL database is not up and running then we should see error "Connection timed out" while creating connection.
* If user don't have admin right and try to enable/disable service through Platform API then error "No permission to enable Flogo Tester" should appear.
* If there are no Hybrid Agents configured for the Organization before and you attempt to enable the service using the API, the following warning message is generated "Please enable hybrid proxy first". To solve this issue create Hybrid agent first.
* If flogotester service is not enabled using the API and we try to click "Using on-premise services" checkbox in flogo Launch Configuartion then we should see error "Flow tester service unreachable. To use this feature, Flow tester service must be enabled and running for your organization. Refer 'Flow Tester' documentation for more details."

## Contributing

If you want to build your own activities for Flogo please read the docs here. [Flogo-docs](https://tibcosoftware.github.io/flogo/)

If you want to showcase your project, check out [tci-awesome](https://github.com/TIBCOSoftware/tci-awesome)

You can also send an email to `tci@tibco.com`

## Feedback

If you have feedback, don't hesitate to talk to us!

* Submit feature requests on our [TCI Ideas](https://ideas.tibco.com/?project=TCI) or [FE Ideas](https://ideas.tibco.com/?project=FE) portal
* Ask questions on the [TIBCO Community](https://community.tibco.com/answers/product/344006)
* Send us a note at `tci@tibco.com`

## Help

Please visit our [TIBCO Cloud<sup>&trade;</sup> Integration documentation](https://integration.cloud.tibco.com/docs/) and TIBCO Flogo® Enterprise documentation on [docs.tibco.com](https://docs.tibco.com/) for additional information.

## License

This TCI Flogo SDK and Samples project is licensed under a BSD-type license. See [license.txt](license.txt).

