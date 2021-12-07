# Slack sample for demonstrating use of slack Operation activity for various features.


## Description

This example demonstrate how we can create channel, post message to a channel, list channels and how to leave a channel using Slack Operation activity.
Slack app bascially contains 1 activity. There are mainly two APIs used by slack connector to perform various activities. These two APIs are "Chat" and "Conversations". Using these, we will implement scenarios mentioned above.

## Prerequisites

1. You need to have an active slack account to perform these activities. 
2. Create and open a Slack workspace.
3. Build a Slack app. For more information, see "Building Slack Apps" in Slack documentation.
4. In your Slack app, in Settings > Features > OAuth and Permissions section, add a Redirect URL. For more information, see "OAuth and Permissions" in Slack documentation.
5. To perform actions using your slack account you need to have Client ID and Client Secret, which you can find in your slack account details.
6. Before configuring connection user should have knowledge on Slack features, Please refer this TCI documentation - [Link](https://integration.connectors-qa-aws.tcie.pro/docs/#Subsystems/flogo-slack/users-guide/creating-a-slack-connection-for-the-first-time.html?TocPath=TIBCO%2520Flogo%25C2%25AE%2520Connectors%257CTIBCO%2520Flogo%25C2%25AE%2520Connector%2520for%2520Slack%257CCreating%2520a%2520Slack%2520Connection%257C_____1)

## Import the sample

1. Download the sample json file i.e., slack_sample.json.

2. Create a new empty app

![Create an app](../../../import-screenshots/slack_ss/2.png)

3. On the app details page, select import app option.

![Select import](../../../import-screenshots/slack_ss/3.png)

4. Now click on ‘browse to upload’ button and select the app.json from your machine that you want to import.

![Import your sample](../../../import-screenshots/slack_ss/4.png)

5. Click on Upload Button. The Import app dialog displays some generic errors and warnings as well as any specific errors or warnings pertaining to the app you are importing.

6. In Import App dialog, there are 2 options to import:

* Selective Import – If you are choosing this option then select trigger, flow and connection and click Next.

* Import all – If you are choosing this option then it will import all flows from the source app.

![The Import app dialog](../../../import-screenshots/slack_ss/importall.png)


7. After importing app is done, in connection tab make sure to re-enter the Client Secret and click on Login button to establish the connection.

## Understanding the configuration

### The Connection

When you import the app client id will be preserved but you need to re-enter the Client Secret and establish the connection.

![The connection](../../../import-screenshots/slack_ss/conn1.png)
![The connection](../../../import-screenshots/slack_ss/conn2.png)

After clicking on Login button you will be asked to enter your slack workspace.

![The connection](../../../import-screenshots/slack_ss/conn3.png)

After entering the workspace, you need to enter your slack credentials.

![The connection](../../../import-screenshots/slack_ss/conn4.png)

After that, a pop-up will ask for permission to access the workspace. You have to click on Allow button.
![The connection](../../../import-screenshots/slack_ss/conn5.png)

In the connection, note that,
1. NAME : Name for the Slack connection that you are creating.
2. DESCRIPTION : A short description of the connection.
3. CLIENT ID :	The Client ID is available in the App Credentials on the Slack API Applications page. For more information, see Slack Documentation. The client ID and the client secret enable the connector to securely access the Slack API.
4. CLIENT SECRET: The Client Secret is available in the App Credentials on the Slack API Applications page. For more information, see Slack Documentation. The client ID and the client secret enable the connector to access the Slack API. This is confidential and should not be shared with anybody.

### The Flow

If you go inside the app, you can see in flow we have 4 activities to create/leave channel, Post message and List channels. Basically, slack connector only have Slack Operation activity. Which uses Chat and Conversations APIs to perform various slack functions.
Also in flow we have Log Message and Return Activity for getting the output.

Note:- Slack connector have only one activity. i.e. Slack Operation. Further you need to select Object and Methods from the dropdown.

![Sample Response](../../../import-screenshots/slack_ss/flow.png)

### Creating a Channel

To create a channel, set the connection and  select 'conversations' object and 'create' method from the dropdown
![Sample Response](../../../import-screenshots/slack_ss/createchannel1.png)

In input tab, provide the channel name.
![Sample Response](../../../import-screenshots/slack_ss/createchannel2.png)

### Posting a Message

To post a message to a channel, select the slack connection and 'Chat' object from the dropdown.Then select 'postMessage' method.
![Sample Response](../../../import-screenshots/slack_ss/postmessage1.png)

In input tab, provide the channel name in which you want to send the message.
![Sample Response](../../../import-screenshots/slack_ss/postmessage2.png)

And provide the message body into 'text' input mapper.
![Sample Response](../../import-screenshots/slack_ss/postmessage3.png)

### Getting a lIst of channels

To get the List of channels, set the connection and select 'conversations' object. Then select 'list' method from the dropdown.
![Sample Response](../../../import-screenshots/slack_ss/listchannel1.png)

In input mapper, provide the criteria on which you want to list the channels. 
Limit will decide the number of channels retrieved. You can choose if you want to list archived channel also.
![Sample Response](../../../import-screenshots/slack_ss/listchannel2.png)

### Leaving a channel

To leave a channel, set the connection and select 'conversations' object. Then choose 'leave' method from the dropdown.
![Sample Response](../../../import-screenshots/slack_ss/leavechannel1.png)

In input mapper, provide the channel id of the channel you want to leave.
![Sample Response](../../../import-screenshots/slack_ss/leavechannel1.png)


### Run the application
For running the application, first you have to push the app and then scale up the app.
Then after sometime you can see your app in running status.

![Sample Response](../../../import-screenshots/slack_ss/push1.png)
![Sample Response](../../../import-screenshots/slack_ss/push2.png)
![Sample Response](../../../import-screenshots/slack_ss/push3.png)

Once your app reaches to Running state, go to Endpoints and for GET/tasks, select 'Try it Out’ option and then click on execute.

![Sample Response](../../../import-screenshots/slack_ss/007.png)


Another option, If you want to test the sample in the Flow tester then follow below instructions:
 
In flow, click on Test Button -> create Launch configuration -> click Next button -> click on Run

![Sample Response](../../../import-screenshots/slack_ss/14.png)
![Sample Response](../../../import-screenshots/slack_ss/flowtester.png)

## Outputs

1. Flow Tester Sample Response.

![Sample Response](../../../import-screenshots/slack_ss/flowresponse.png)

2. Response after hitting endpoint.

![Sample Response](../../../import-screenshots/slack_ss/endpointresponse.png)


## Troubleshooting

* If you do not see the Endpoint enabled, make sure your apps is in Running status.
* If you see "Invalid client_id parameter" in pop-up window, check client id of your slack app.
* If you see "This connection is invalid as failed to get the required tokens from the credentials provided", then check client secret of your slack app.

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

