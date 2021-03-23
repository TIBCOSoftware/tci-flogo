---
date: 2016-04-09T16:50:16+02:00
title: Use Project Flogo activities
weight: 4
---

Leveraging the already existing activities built by the Project Flogo community is really easy! Simply zip them up and upload them to TIBCO Cloud<sup>&trade;</sup> Integration. Let's say that you want to use the [Counter activity](https://github.com/TIBCOSoftware/flogo-contrib/tree/master/activity/counter) from the [flogo-contrib](https://github.com/TIBCOSoftware/flogo-contrib) repository on GitHub. We'll walk you through the steps to use that activity

There are 2 options available for you
* Create a Zip of Counter activity
* Install contribution using Counter activity ref URL

### Prepare a zip
First you'll need to download or clone the repository
```
git clone https://github.com/project-flogo/contrib
```

Now, create a zip file of the **counter** activity in the **activity** folder
```
zip -r counter.zip counter/
```
```
You can obviously do this with Finder or Windows Explorer too
```
### Prepare a ref
The ref for Project Flogo contribution is the go.mod name.   Open go.mod and copy module name, for counter activity
```
github.com/project-flogo/contrib/activity/counter
```

The last step is to upload the zip file to TIBCO<sup>&reg;</sup> Cloud Integration or TIBCO Flogo<sup>&reg;</sup> Enterprise:

### Upload to TCI

* On the TIBCO Cloud Integration web UI, click **Environment & Tools** and click **Extensions** under **Connector Management & Extensions**
* If this is the first extension, click the **Upload an extension** button, if there are existing extensions that were previously uploaded, click the **Upload** button on the upper right corner.
* Provide [ref URL](#prepare-a-ref) we prepared above and put it into `Git repository URL` and Click Import Button.
* If you wantto upload from Zip, Click From a Zip file and Click the **browse to upload** link and navigate to your extension .zip file. Alternatively, drag and drop the .zip file from your local machine to the area defined by a dotted line in the **Upload an extension** dialog.
* Click **Upload and compile**. Flogo Enterprise validates the contents in the .zip file. If the .zip file contains a valid folder structure, it compiles the extension code. Once the code is compiled successfully, it uploads the extension to the cloud. You can view the progress of the upload or any errors that occur in the logs. You will see a Complete message after the extension is successfully uploaded. If there were any compilation errors during the upload, you see an error message and the upload exits. You can copy-paste the error message if need be.
* Click **Done** to close the dialog.

### Upload to Flogo Enterprise
* On the TIBCO Flogo<sup>&reg;</sup> Enterprise web UI, click **Extensions**.
* Rest part same as [Upload To TCI](#upload-to-tci).

When you're using activities built for Project Flogo, there are a few things to be aware of:

* All the activities built for Project Flogo will appear in the **default** category in TIBCO Cloud Integration
* You cannot have the **any** type as input or output in your **activity.json** file
