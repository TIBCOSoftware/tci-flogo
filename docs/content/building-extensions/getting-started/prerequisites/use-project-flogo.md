---
date: 2016-04-09T16:50:16+02:00
title: Use Project Flogo Extension
weight: 1
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

Click [Here](../../../upload) to upload to Flogo Enterprise or TIBCO Cloud Integration