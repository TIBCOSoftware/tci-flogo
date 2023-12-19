# Oracle Database Example


## Description

This example demonstrates how we can create and use Oracle Database Call stored procedure and CRUD activities.
Oracle Database app bascially contain 5 activities. The main purpose of these activities are:
a) To fetch data using Query activity.
b) To insert data using Insert activity.
c) To Update the data using Update activity.
d) To Delete the data using Delete activity.
e) To Perform specific task using stored procedures from Oracle database.

## Prerequisites

1. Ensure that Oracle database must be install either on local computer or on AWS EC2 instance.
2. You need to make sure that your public ip is whitelisted (If you are using database hosted on AWS EC2 instance).
3. In order to use on-prem database server in TCI, you will have to attach Access Key to use Hybrid Connectivity.
   For more details on how to use Hybrid Connectivity/tibtunnel/Proxy Agent, please refer this TCI documentation - [Link](https://integration.cloud.tibco.com/docs/#tci/using/hybrid-agent/installing-configuring-running-agent.html%3FTocPath%3DUsing%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%7CUsing%2520the%2520TIBCO%2520Cloud%25E2%2584%25A2%2520Integration%2520-%2520Hybrid%2520Agent%7C_____4)
4. Oracle client libaries are required to execute application from end to end. This can be done by uploading a supplement

## Creating and Uploading Connector Supplement

1. Go to Oracle Website > Instant Client for Linux x86-64 (64-bit) > Version 21.11.0.0.0 and download the Basic Package compressed folder.
2. Similarly, go to Oracle Website > Instant Client for Linux x86-64 (64-bit) > Version 21.11.0.0.0 and download the ODBC Package compressed folder.
3. Extract the downloaded Basic Package and ODBC Package compressed folders.
4. Merge the extracted ODBC Package folder with the instantclient_21_11 folder extracted from Basic Package.
  Note: TIBCO recommends extracting the folders on a Linux system to preserve the symbolic links.
5. Rename the merged instantclient_21_11 folder to oracle.
6. Compress the oracle folder.
  Note: Use the command to preserve the symbolic links: zip --symlinks -r oracle.zip oracle
7. Upload supplement from Web UI for Flogo > Oracle Database connector.
8. Disable Flogo DB Services.
9. Enable Flogo DB Services.
  Note: Disable and enable of Flogo DB services is required to pick the uploaded supplement.
![Upload supplement](../../../import-screenshots/OracleDatabase/26.png) 
![Upload supplement](../../../import-screenshots/OracleDatabase/27.png)
![Upload supplement](../../../import-screenshots/OracleDatabase/28.png)
![Upload supplement](../../../import-screenshots/OracleDatabase/29.png)
![Upload supplement](../../../import-screenshots/OracleDatabase/30.png) 

![Enable Hybrid cnnection](../../../import-screenshots/OracleDatabase/31.png)
![Enable Hybrid cnnection](../../../import-screenshots/OracleDatabase/32.png)
  

## Import the sample

1. Download the sample json file i.e., OracleDatabase.json.

2. Create a new empty app

![Create an app](../../../import-screenshots/OracleDatabase/1.png)

3. On the app details page, select import app option.

![Select import](../../../import-screenshots/OracleDatabase/2.png)

4. Now click on ‘browse to upload’ button and select the app.json from your machine that you want to import.

![Import your sample](../../../import-screenshots/OracleDatabase/3.png)

5. Click on Upload Button. The Import app dialog displays some generic errors and warnings as well as any specific errors or warnings pertaining to the app you are importing.

![The Import app dialog](../../../import-screenshots/OracleDatabase/4.png)

6. In Import App dialog, there are 2 options for connection:

* Create new connection – If you are choosing this option then it will create new connection.

* Existing connections – If you are choosing this option then it will use existing connections from the environment.

7. After importing app is done, in connection tab make sure to re-enter the password and click on connect button to establish the connection.

## Understanding the configuration

### The Connection

When you import the app you need to re-enter the password and establish the connection.

![The connection](../../../import-screenshots/OracleDatabase/5.png)
![The connection](../../../import-screenshots/OracleDatabase/6.png)

In the connection, note that,
1. Host - In this field we give public ip/public DNS of EC2 instance on which database is hosted or the ip of VM where the oracle database is hosted in tibco premies.
2. Port - Port number on the server. 
   Note: By default, a Flogo Connector for Oracle Database cluster is configured with port 1521.
3. User - Username to connect to Oracle Database.
4. Password - Password to connect to Oracle Database.
5. Database Instance - Select type of database instances as SID or Service Name.
6. Database Instance Value - Specify the value for SID or Service Name.
 

### The Flow

If you go inside the app, you can see in flow we have 5 activities (Query,Insert, Update, Delete and Call Procedure) that perform CRUD operations like: query fetching, inserting data, updating data and deleting data and perform call operation for stored procedures from Oracle Database.
Using OracleDatabaseQuery activity we are fetching EMPLOYEE table data, using OracleDatabaseInsert activity we are inserting data into EMPLOYEE table, using OracleDatabaseUpdate activity we are updating EMPLOYEE data for specified EMPLOYEE ID, using OracleDatabaseDelete activity we are deleting updated data and using OracleDatabaseCallProcedure activity we are calling stored procedures for specified ID.
For CRUD activities (OracleDatabaseQuery, OracleDatabaseInsert, OracleDatabaseUpdate, OracleDatabaseDelete) the auto complete feature is avaliable. At designtime user can search for a table name or its available coloumns using auto complete feature. For this feature to be work user need to mention the schema name in setting tab of CRUD activities.
Also in flow we have Log Message for every activity output and in last Return Activity for getting OracleDatabaseCallProcedure activity output.

![Sample Response](../../../import-screenshots/OracleDatabase/7.png)
![Sample Response](../../../import-screenshots/OracleDatabase/8.png)
![Sample Response](../../../import-screenshots/OracleDatabase/9.png)

### Run the application
For running the application, first you have to push the app and then scale up the app.
Then after sometime you can see your app in running status.

![Sample Response](../../../import-screenshots/OracleDatabase/10.png)
![Sample Response](../../../import-screenshots/OracleDatabase/11.png)
![Sample Response](../../../import-screenshots/OracleDatabase/12.png)
Once your app reaches to Running state, go to Endpoints and for GET/allactivity, select 'Try it Out’ option and then click on execute.

Another option, If you want to test the sample in the Flow tester then follow below instructions:
 
in flow, click on Test Button -> create Launch configuration -> click Next button -> click on Run

If you are executing application for On-Premise connection from flow tester then you have to select 'Using On-premise services' check box

![sample Response](../../../import-screenshots/OracleDatabase/13.png)
![Sample Response](../../../import-screenshots/OracleDatabase/14.png)
![Sample Response](../../../import-screenshots/OracleDatabase/15.png)
![Sample Response](../../../import-screenshots/OracleDatabase/16.png)

## Outputs

1. Flow Tester

![Sample Response](../../../import-screenshots/OracleDatabase/17.png)
![Sample Response](../../../import-screenshots/OracleDatabase/18.png)
![Sample Response](../../../import-screenshots/OracleDatabase/19.png)
![Sample Response](../../../import-screenshots/OracleDatabase/20.png)
![Sample Response](../../../import-screenshots/OracleDatabase/21.png)
![Sample Response](../../../import-screenshots/OracleDatabase/22.png)
![Sample Response](../../../import-screenshots/OracleDatabase/23.png)

2. When hit endpoints

![Sample Response](../../../import-screenshots/OracleDatabase/24.png)
![Sample Response](../../../import-screenshots/OracleDatabase/25.png)


## Troubleshooting

* If you do not see the Endpoint enabled, make sure your apps is in Running status.
* If you see test connection failed for On-cloud connection in connection tab, then check Flogo DB Services is enabled or not and your public ip and TCI environment NAT ips are whitelisted or not.
* If you see test connection failed for On-premies connection in connection tab, then check Flogo DB Services is enabled or not and tibagent is started for oracle database server or not.
* If you are not able to fech the tables or table coloumns while typing a query, then make sure your connection should be establish successfully.
* While executing on-premise connection app from endpoint, make sure that accesskey should be selected in Hybride connectivity option from Environment controls tab and executing from flow tester make sure you have to select 'Using On-premise services' check box from flow launch configuration pop up.

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

