# Google Sheets Example


## Description

This example demonstrate how we can create and use Google Sheets activities.
Google Sheets bascially contains 4 activities. The main purpose of these activities are:

a) Clear Google Sheet Data : It is going to clear contents of the excel sheet.

b) Get Google Sheet Data : Get the data and make it available in the output(You can get data from a particular group or coloumn)

c) Update Google Sheet Data : To update the data in the excel sheet.

d) Copy Sheet: To copy the content of one sheet to the other.

In this sample we will first clear contents of the excel sheet, get the data, update the data , get the updated data, copy the content of one sheet to the other, update the coloumn without defining a schema.

## Prerequisites

1. TIBCO Cloud™ Integration 
2. If you run any of these samples locally using TIBCO Flogo® Enterprise -Ensure that connector is installed.

## Import the sample

1. Download the sample json file i.e., Google_sheets.json.

2. Create a new empty app

![Create an app](../../../import-screenshots/google_sheets_screenshots/1.png)

3. On the app details page, select import app option.

![Select import](../../../import-screenshots/google_sheets_screenshots/2.png)

4. Now click on ‘browse to upload’ button and select the app.json from your machine that you want to import.

![Import your sample](../../../import-screenshots/sqlserver_screenshot/3.png)

5. Click on Upload Button. The Import app dialog displays some generic errors and warnings as well as any specific errors or warnings pertaining to the app you are importing.

![The Import app dialog](../../../import-screenshots/google_sheets_screenshots/4.png)

6. In Import App dialog, there are 2 options to import:

* Selective Import – If you are choosing this option then select trigger, flow and connection and click Next.

* Import all – If you are choosing this option then it will import all flows from the source app.

7. After importing app is done, in connection tab make sure to provide the Service Account Key and click on save button to establish the connection.

## Understanding the configuration

### The Connection

When you import the app you need to provide the Service Account Key and click on save button to establish the connection.

![The connection](../../../import-screenshots/google_sheets_screenshots/5.png)


### The Flow

If you go inside the app, you can see in flow we have 5 activities (Copy,Create,Get,Delete and Update) that perform some operations.
Also in flow we have Log Message and Return Activity for getting the output.

![Sample Response](../../../import-screenshots/google_sheets_screenshots/6.png)
![Sample Response](../../../import-screenshots/google_sheets_screenshots/7.png)
![Sample Response](../../../import-screenshots/google_sheets_screenshots/8.png)
![Sample Response](../../../import-screenshots/google_sheets_screenshots/9.png)

### Run the application
For running the application, first you have to push the app and then scale up the app.
Then after sometime you can see your app in running status.

![Sample Response](../../../import-screenshots/google_sheets_screenshots/10.png)
![Sample Response](../../../import-screenshots/google_sheets_screenshots/11.png)
![Sample Response](../../../import-screenshots/google_sheets_screenshots/12.png)
Once your app reaches to Running state, go to Endpoints and for GET/tasks, select 'Try it Out’ option and then click on execute.

Another option, If you want to test the sample in the Flow tester then follow below instructions:
 
in flow, click on Test Button -> create Launch configuration -> click Next button -> click on Run

![sample Response](../../../import-screenshots/google_sheets_screenshots/13.png)
![Sample Response](../../../import-screenshots/google_sheets_screenshots/14.png)
![Sample Response](../../../import-screenshots/google_sheets_screenshots/15.png)

## Outputs

1. Flow Tester

![Sample Response](../../../import-screenshots/google_sheets_screenshots/16.png)

2. When hit endpoints

![Sample Response](../../../import-screenshots/google_sheets_screenshots/17.png)


## Troubleshooting

* If you do not see the Endpoint enabled, make sure your apps is in Running status.

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

