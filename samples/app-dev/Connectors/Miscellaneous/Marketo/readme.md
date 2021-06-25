# Marketo Sample demonstrating how to implement the CRUD activities on Marketo Leads object.


## Description

This sample demonstrate how we can create and use Marketo CRUD activities on Leads object such as Upsert, Retrieve and Delete.
Marketo app bascially contains 3 activities. The main purpose of these activitie are to  perform CRUD activities on various Marketo objects like Leads, companies, opportunity etc.

## Prerequisites

1. You need to make sure that you have a active Marketo account and basic understanding of Marketo features and activities.
2. To perform actions using your Marketo account you need to have Marketo connection details such as Identity service URL to generate token, REST endoint, Client ID and Client Secret.
3. You can find Client ID and Client secret from your Marketo account, for more details on how to create Connection and other Marketo features, please refer this TCI documentation - [Link](https://integration.connectors-qa-aws.tcie.pro/docs/#Subsystems/flogo-marketo/users-guide/marketo-connection-details.html?TocPath=TIBCO%2520Flogo%25C2%25AE%2520Connectors%257CTIBCO%2520Flogo%25C2%25AE%2520Connector%2520for%2520Marketo%257CCreating%2520a%2520%2520%2520%2520Marketo%2520Connection%257C_____1)

## Import the sample

1. Download the sample json file i.e., marketo_sample.json.

2. Create a new empty app

![Create an app](../../../import-screenshots/marketo_ss/2.png)

3. On the app details page, select import app option.

![Select import](../../../import-screenshots/marketo_ss/3.png)

4. Now click on ‘browse to upload’ button and select the app.json from your machine that you want to import.

![Import your sample](../../../import-screenshots/marketo_ss/4.png)

5. Click on Upload Button. The Import app dialog displays some generic errors and warnings as well as any specific errors or warnings pertaining to the app you are importing.

6. In Import App dialog, there are 2 options to import:

* Selective Import – If you are choosing this option then select trigger, flow and connection and click Next.

* Import all – If you are choosing this option then it will import all flows from the source app.

![The Import app dialog](../../../import-screenshots/marketo_ss/5.png)

7. After importing app is done, in connection tab make sure to re-enter the client id and client secret and click on Save Connection button to establish the connection.

## Understanding the configuration

### The Connection

When you import the app you need to re-enter the client id and client secret and establish the connection.

![The connection](../../../import-screenshots/marketo_ss/marketoconn.png)

In the connection, note that,
1. Name - 	Enter a name for this Marketo connection
2. Description(Optional) - Enter a short description for the connection
3. Identity URL -	The identity service URL used to generate an access token
4. Endpoint URL - 	The REST endpoint used to connect to Marketo REST API
5. Client ID -	The client ID used to connect to Marketo REST API, will be available in your Marketo account.
6. Client Secret -	The client secret used to generate an access token, will be available in your Marketo account.

### The Flow

If you go inside the app, you can see in flow we have 3 activities (Upsert, Retrieve and Delete)  that perform some operations on various Marketo objects like Leads, Companies, Campaigns etc.
In this sample we are using Leads object to perform CRUD operation.
Also in flow we have Log Message and Return Activity for getting the output.

![Sample Response](../../../import-screenshots/marketo_ss/marketoflow.png)


### Marketo Upsert

You can use this activity to create or update leads, opportunity, opportunity role, company, and custom objects, add or remove leads from a list, and request or schedule campaigns.

In Settings tab, after selecting the connection, select Marketo object and the action to be performed.(For example: using Lead object in this sample)
![Sample Response](../../../import-screenshots/marketo_ss/marketoupsert1.png)

In input tab, it takes the data in form of an array. Provide the details like email, firstname and postalCode.
![Sample Response](../../../import-screenshots/marketo_ss/marketoupsert2.png)


### Marketo Retrieve

You can use this activity to retrieve resources, such as leads, list, campaigns, opportunity, opportunity role, company, and custom objects.

In Settings tab, after selecting the connection, select Marketo object and the action to be performed.
![Sample Response](../../../import-screenshots/marketo_ss/marketoretrieve1.png)

In Input tab, provide the id of the Lead to retrieve data, you can also use the previous activity output to provide the object ID.
![Sample Response](../../../import-screenshots/marketo_ss/marketoretrieve2.png)


### Marketo Delete

You can use this activity to delete leads, opportunity, opportunity role, company, and custom objects in Marketo.

In Settings tab, after selecting the connection, select Marketo object and the action to be performed.
![Sample Response](../../../import-screenshots/marketo_ss/marketodelete1.png)

In input tab, provide the object id to be deleted, you can also use the previous activity output to provide the object ID.
![Sample Response](../../../import-screenshots/marketo_ss/marketodelete2.png)


### Run the application
For running the application, first you have to push the app and then scale up the app.
Then after sometime you can see your app in running status.

![Sample Response](../../../import-screenshots/marketo_ss/push1.png)
![Sample Response](../../../import-screenshots/marketo_ss/push2.png)
![Sample Response](../../../import-screenshots/marketo_ss/push3.png)


Once your app reaches to Running state, go to Endpoints and for GET/tasks, select 'Try it Out’ option and then click on execute.

![Sample Response](../../../import-screenshots/marketo_ss/marketoendpoints.png)

Another option, If you want to test the sample in the Flow tester then follow below instructions:
 
in flow, click on Test Button -> create Launch configuration -> click Next button -> click on Run

![Sample Response](../../../import-screenshots/marketo_ss/flowtester1.png)
![Sample Response](../../../import-screenshots/marketo_ss/flowtester2.png)
![Sample Response](../../../import-screenshots/marketo_ss/flowtester3.png)

## Outputs

1. Flow Tester

![Sample Response](../../../import-screenshots/marketo_ss/flowresponse.png)

2. When hit endpoints

![Sample Response](../../../import-screenshots/marketo_ss/endpointresponse.png)


## Troubleshooting

* If you do not see the Endpoint enabled, make sure your apps is in Running status.
* If you see test connection failed in connection setup, then check REST endpoint and Identity URL.
* If you see invalid credentials, then check client ID and client secret.

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

