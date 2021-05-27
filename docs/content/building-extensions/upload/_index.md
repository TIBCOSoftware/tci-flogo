 ---
date: 2016-04-09T16:50:16+02:00
title: Upload to TCI or FE
weight: 58
pre: "<i class=\"fa fa-upload\" aria-hidden=\"true\"></i> "
---

Once contribution is ready, you can upload it to TIBCO Cloud<sup>&trade;</sup> Integration Flogo<sup>&reg;</sup> or TIBCO Flogo<sup>&trade;</sup> Enterprise apps.

### Upload to TCI

* On the TIBCO Cloud Integration web UI, click **Environment & Tools** and click **Extensions** under **Connector Management & Extensions**
* If this is the first extension, click the **Upload an extension** button, if there are existing extensions that were previously uploaded, click the **Upload** button on the upper right corner.
* Provide [ref URL](#prepare-a-ref) we prepared above and put it into `Git repository URL` and Click Import Button.
* If you want to upload from Zip, Click From a Zip file and Click the **browse to upload** link and navigate to your extension .zip file. Alternatively, drag and drop the .zip file from your local machine to the area defined by a dotted line in the **Upload an extension** dialog.
* Click **Upload and compile**. TCI validates the contents in the .zip file. If the .zip file contains a valid folder structure, it compiles the extension code. Once the code is compiled successfully, it uploads the extension to the cloud. You can view the progress of the upload or any errors that occur in the logs. You will see a Complete message after the extension is successfully uploaded. If there were any compilation errors during the upload, you see an error message and the upload exits. You can copy-paste the error message if need be.
* Click **Done** to close the dialog.

### Upload to Flogo Enterprise
* On the TIBCO Flogo<sup>&reg;</sup> Enterprise web UI, click **Extensions**.
* Rest part same as [Upload To TCI](#upload-to-tci).

When you're using activities built for Project Flogo, there are a few things to be aware of:

* All the activities built for Project Flogo will appear in the **default** category in TIBCO Cloud Integration 
