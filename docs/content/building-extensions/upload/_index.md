---
date: 2016-04-09T16:50:16+02:00
title: Upload to TCI or FE
weight: 58
pre: "<i class=\"fa fa-upload\" aria-hidden=\"true\"></i> "
---

Once contribution is ready, you can upload it to TIBCO Cloud<sup>&trade;</sup> Integration Flogo<sup>&reg;</sup> or TIBCO Flogo<sup>&trade;</sup> Enterprise apps.

* On the TIBCO<sup>&reg;</sup> Cloud Integration page or TIBCO Flogo<sup>&trade;</sup> Enterprise web UI, click **Extensions**.
* If this is the first extension, click the **Upload an extension** button, if there are existing extensions that were previously uploaded, click the **Upload** button on the upper right corner.
* Click the browse to upload link and navigate to your extension .zip file. Alternatively, drag and drop the .zip file from your local machine to the area defined by a dotted line in the **Upload an extension** dialog.
* Click Upload and compile. TIBCO Cloud Integration or TIBCO Flogo Enterprise validates the contents in the .zip file. If the .zip file contains a valid folder structure, it compiles the extension code. Once the code is compiled successfully, it uploads the extension to the cloud. You can view the progress of the upload or any errors that occur in the logs. You will see a Complete message after the extension is successfully uploaded. If there were any compilation errors during the upload, you see an error message and the upload exits. You can copy-paste the error message if need be.
* Click **Done** to close the dialog.

Check out the [TCI Flogo Apps](https://integration.cloud.tibco.com/docs/index.html) or [TIBCO Flogo Enterprise](https://docs.tibco.com/products/tibco-flogo-enterprise) documentation for more details.

{{% notice info %}}
Upload is not incremental. When same category is uploaded again, any existing contributions for given category would be deleted from the backend storage.
{{% /notice %}}
