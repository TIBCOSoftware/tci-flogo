# SFTP Example


## Description

This example demonstrates how we can create a SFTP connection using SFTP connector and use file transfer activities.The SFTP connector provides the connection for SFTP Server. Secure File Transfer Protocol (SFTP) denotes security and encrypts data before sending it across the network. Flogo® Connector for SFTP allows you to perform the Put, Get, List, Make Remote Directory, Rename, and Delete operations on the SFTP server.

We have 6 SFTP activities as follows;

a) Get Activity

b) Put Activity 

c) Rename Activity 

d) Make Remote Directory Activity

e) List Activity

f) Delete Activity

## Prerequisites

1. Ensure that you have a SFTP Server configured.

## Import the sample

1. Download the sample json file i.e., SFTP_Sample.json.

2. Click on Create/Import from the UI.

![Create an app](../../import-screenshots/sftp_screenshot/1.png)

3. From the same page, select import a Flogo app option.

![Select import](../../import-screenshots/sftp_screenshot/2.png)

4. Now click on ‘browse to upload’ button and select the app.json from your machine that you want to import.

![Import your sample](../../import-screenshots/sftp_screenshot/3.png)

5. After importing app is done, in connection tab make sure to enter the client secret and authorization code and click on generate access token button to establish the connection.

## Understanding the configuration

### The Connection

When you import the app you need to enter the client secret and the authorization code and click on generate access token button to establish the connection.

![The connection](../../import-screenshots/sftp_screenshot/4.png)

In the connection, note that: 
1. Name: Unique name for the SFTP connector.
2. Description: Brief description of the SFTP connection.
3. Host: The host name or IP address of the SFTP server.
4. Port: The port number of the SFTP server. For SFTP connections, '22' is the default, when no value is specified in this field.
5. Username: Username for connecting to your SFTP server.
6. Password: Password for connecting to your SFTP server. This field is visible when Public Key Authentication is set to false .
7. Public Key Authentication: Set this field to true to specify the private key, when using private key supported authentication. When you set this field to true, it displays the Private Key and Private Key Password fields.
8. Private key: The private key to authenticate your login.
9. Private key password: The password of the private key.
10. Strict Hostkey Check: When you set this field to true , it connects only to known hosts with valid host keys that are stored in the known host file.

### The Flow

If you go inside the app, you can see in flow where we have the combination of Amazon S3 and SFTP activities. 
1. We have first used the SFTP get activity to get the file from SFTP server.
2. Next we have passed the files received from the SFTP get activity to the Amazon S3 put activity.
3. Check if the file is uploaded to the S3 bucket using the Amazon S3 get activity.
4. Create the Blank directory with SFTP Make remote directory activity.
5. Insert the data received from Amazon S3 put activity in a newly created directory with SFTP put activity
6. Now we can list the files and folders in the directory using the SFTP List activity.
7. Rename the inserted file with some other name that does not exist in the directory.
8. Delete the renamed file with SFTP delete activity.
9. Since the directory is now empty, we can delete the empty directory with SFTP Delete activity.


![Sample Response](../../import-screenshots/sftp_screenshot/5.png)

### Run the application
For running the application, first you have to push the app and then scale up the app.
Then after sometime you can see your app in running status.

![Sample Response](../../import-screenshots/sftp_screenshot/6.png)
![Sample Response](../../import-screenshots/sftp_screenshot/6.1.png)

Another option, If you want to test the sample in the Flow tester then follow below instructions:
 
In flow, click on Test Button -> create Launch configuration -> click Next button -> click on Run

![sample Response](../../import-screenshots/sftp_screenshot/7.png)
![Sample Response](../../import-screenshots/sftp_screenshot/8.png)
![Sample Response](../../import-screenshots/sftp_screenshot/9.png)

## Outputs

1. Flow Tester

![Sample Response](../../import-screenshots/sftp_screenshot/10.png)

2. Runtime Deployment

![Sample Response](../../import-screenshots/sftp_screenshot/11.png)


## Troubleshooting

* If you see test connection failed in connection tab, then check if your authorization code is recently generated.

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

