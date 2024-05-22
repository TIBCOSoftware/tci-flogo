# TDV Example


## Description

This example demonstrate how we can create and run a TDV app. With TIBCO Flogo® Connector for TIBCO® Data Virtualization, you can run TDV queries by using a Query activity and invoke a stored procedure by using a Call Procedure activity. TDV app contains 2 activities TDV Query and TDV CallProcedure.

TDV Query : Use this activity to run a simple or a complex TDV query on a database. The TDV Query activity returns information in the form of rows.

TDV CallProcedure : Use this activity to run a TDV script procedure.

## Prerequisites

1. You need to make sure that your public ip is whitelisted (If you are using database hosted on AWS EC2 instance).
2. In order to use on-prem database server in TCI, you will either have to attach VPN Connection to your app or attach Access Key to use Hybrid Connectivity.
   For more details on how to use Hybrid Connectivity/tibtunnel/Proxy Agent, please refer this TCI documentation - [Link](https://integration.cloud.tibco.com/docs/#tci/using/hybrid-agent/installing-configuring-running-agent.html%3FTocPath%3DUsing%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%7CUsing%2520the%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520-%2520Hybrid%2520Agent%7C_____4)

## Import the sample

1. Download the sample json file i.e., TDV.json.

2. Create a new empty app

![Create an app](../../../import-screenshots/tdv_screenshots/1.png)

3. On the app details page, select import app option.

![Select import](../../../import-screenshots/tdv_screenshots/2.png)

4. Now click on ‘browse to upload’ button and select the app.json from your machine that you want to import.

![Import your sample](../../../import-screenshots/tdv_screenshots/3.png)

5. Click on Upload Button. The Import app dialog displays the trigger used, flowname, connector name, some generic errors and warnings as well as any specific errors or warnings pertaining to the app you are importing.

![The Import app dialog](../../../import-screenshots/tdv_screenshots/3-.png)
![The Import app dialog](../../../import-screenshots/tdv_screenshots/4.png)

6. In Import App dialog, there are 2 options to import:

* Selective Import – If you are choosing this option then select trigger, flow and connection and click Next.

* Import all – If you are choosing this option then it will import all flows from the source app.

7. After importing app is done, in connection tab make sure to re-enter the password and click on connect button to establish the connection.

## Understanding the configuration

### The Connection

When you import the app you need to re-enter the password and establish the connection.

![The connection](../../../import-screenshots/tdv_screenshots/5.png)
![The connection](../../../import-screenshots/tdv_screenshots/6.png)
![The connection](../../../import-screenshots/tdv_screenshots/7.png)

In the connection, note that,
1. Server - Data Virtualization server host name.
2. Port - The port number to which the connector database is configured to listen on.
3. Domain - The Data Virtualization domain to which the DataSource belongs.
4. Datasource Name - Name of the TDV published data source.
5. Maximum Connection Retry Attempts - Maximum number of attempts the connector tries to connect to a database server in case of connection failure. Default value is 3 sec.
6. Connection Retry Delay - The time interval between the connection retry attempts. Default value is 5 sec.
7. Connection Timeout - Wait time for establishing the connection. Default value is 20 sec.
8. Session Timeout - Session inactivity timeout, in seconds. Set to zero for an infinite timeout.
9. Request Timeout - Timeout for query commands and other requests. A value of zero disables the timeout.

### The Flow

If you go inside the app, you can see in flow we have 2 activities (Query and Procedure) that perform some operations.
Also in flow we have Log Message and Return Activity for getting the output.

![Sample Response](../../../import-screenshots/tdv_screenshots/8.png)
![Sample Response](../../../import-screenshots/tdv_screenshots/8-.png)
![Sample Response](../../../import-screenshots/tdv_screenshots/8--.png)

### Run the application
For running the application, first you have to push the app and then scale up the app.
Then after sometime you can see your app in running status.

![Sample Response](../../../import-screenshots/tdv_screenshots/9.png)
![Sample Response](../../../import-screenshots/tdv_screenshots/10.png)
![Sample Response](../../../import-screenshots/tdv_screenshots/11.png)
Once your app reaches to Running state, go to Endpoints and for GET/tasks, select 'Try it Out’ option and then click on execute.

Another option, If you want to test the sample in the Flow tester then follow below instructions:
 
in flow, click on Test Button -> create Launch configuration -> click Next button -> click on Run

![sample Response](../../../import-screenshots/tdv_screenshots/12.png)
![Sample Response](../../../import-screenshots/tdv_screenshots/13.png)

## Outputs

1. Flow Tester

![Sample Response](../../../import-screenshots/tdv_screenshots/14.png)

2. When hit endpoints

![Sample Response](../../../import-screenshots/tdv_screenshots/15.png)


## Troubleshooting

* If you do not see the Endpoint enabled, make sure your apps is in Running status.
* If you see test connection failed in connection tab, then check your public ip if it is whitelisted or not.

## Contributing
If you want to build your own activities for Flogo please read the docs here.

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

