# Publishing and Recieving message using TIBCO Cloud Messaging connector.


## Description

This example demonstrate how we can send message using the TCM publisher activity and recieve the same message using TCM subscriber triger.

The Publisher flow publishes a message on the mentioned destination, whenever the rest enpoint is triggered.
The Subscriber flow has the subscriber trigger which is listening to the mentioned destination and recieves the message whenever it is sent. Further, the TCMMessageAck activity notifies the TCM Message Subscriber trigger to acknowledge the message received and lastly the 'Log' activity is printing the recieved message. 


## Prerequisites

* Ensure that Tibco Cloud Messaging Connector is already installed being an OOTB connector.
* Ensure that you have an active Tibco Cloud Messaging server.

## Import the sample

1. Download the sample's .json file 'TCMAppSample.json'

2. Create a new empty app.
![Create an app](../../../import-screenshots/2.png)

3. On the app details page, select Import app.
![Select import](../../../import-screenshots/3.png)

4. Browse on your machine or drag and drop the .json file for the app that you want to import.
![Import your sample](../../../import-screenshots/TCM/ImportApp.png)

5. Click Upload. The Import app dialog displays some generic errors and warnings as well as any specific errors or warnings pertaining to the app you are importing. It validates whether all the activities and triggers used in the app are available in the Extensions tab.
![The Import app dialog](../../../import-screenshots/TCM/ImportWarn.png)

6. You have the option to import all flows from the source app or selectively import flows.

7. If you choose selective import, select the trigger, flow and connection. Click Next.

8. Make sure you re-configure the connection as mentioned in 'Understanding the configuration' section

## Understanding the configuration

### The Connection
When you import this app, you need to configure the 'TCMsample' connection in Connections page. It has pre-filled values. You need to change 'Connection url' and 'authentication key' with yours.

![The connection](../../../import-screenshots/TCM/Connection.png)

### The Flows and TCMMessageAck activity
If you open the app, you will see there are two flows in the TCMAppSample app. The flow 'publisher' and second flow 'subscriber'.
![The Flows](../../../import-screenshots/TCM/FlowList.png)

The Publisher flow publishes a message on the mentioned destination, whenever the rest enpoint is triggered. REST trigger has method GET with path parameter 'pub'.
![The Publisher flow](../../../import-screenshots/TCM/Publisher.png)

The Subscriber flow has the subscriber trigger which is listening to the mentioned destination and recieves the message whenever it is sent. Further, the TCMMessageAck activity notifies the TCM Message Subscriber trigger to acknowledge the message received and lastly the 'Log' activity is printing the recieved message.
Note: If 'TCMMessageAck' activity is not used, the subscriber acknowledges the message revieved at the end of the flow.
![The Subscriber flow](../../../import-screenshots/TCM/Subscriber.png)

### Run the application
For running the application, first you have to push the app and then scale up the app. Then after sometime you can see your app in running status.
![Before Push App](../../../import-screenshots/TCM/AppNotDeployed.png)
![Scale App](../../../import-screenshots/TCM/AppScale.png)
![After Push App](../../../import-screenshots/TCM/AppRunning.png)

Once it reaches to Running state, go to Endpoints, click on Test under Actions and for GET//pub, select 'Try it out'
YNow click Execute button.
![Runtime Execution](../../../import-screenshots/TCM/EndPoint.png)

If you want to test the sample in the Flow tester then follow below instructions:
Click on the MainFlowWithSFCreateCheckStatusJob flow, click on Test Button -> create Launch configuration -> click Next button -> click on Run
![FlowTester](../../../import-screenshots/TCM/LaunchConfig.png)

## Outputs

1. Sample Response when hit the endpoints
![Sample Response](../../../import-screenshots/TCM/Response.png)

2. Sample Logs
![Sample Logs](../../../import-screenshots/TCM/AppLogs.png)

3. Flow Tester Logs
![FlowTester Logs](../../../import-screenshots/TCM/FlowTesterLogs.png)


## Troubleshooting

* If you do not see the Endpoint enabled, make sure your apps is in Running status.
* If you do not see user content screen, check if your browser is blocking pop-ups.
* if you see 401 Unauthorized error or token refresh error, re-configure the connection.

## Contributing
If you want to build your own activities for Flogo please read the docs here, [Flogo-docs](https://tibcosoftware.github.io/flogo/)

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
