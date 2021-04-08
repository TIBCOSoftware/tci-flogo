---
date: 2016-04-09T16:50:16+02:00
title: Import Template
weight: 2
---

## Import Template

We already have an working simple template which can guide you how to develop extensions

* Download Extension [Template](../../../../../../../template)
* create dir under your gopath
  ```bash
  mkdir -p ${GOPATH}/src/github.com/tibco/
  ```
* Copy the template.zip into `{GOPATH}/src/github.com/tibco/`
* Unzip the folder
* Now you will see we have an sample connector placed under your folder. the category of the connector is `Template`
* All extension related code under ${GOPATH}/src/github.com/tibco/Template/src/app/Template

Now we need setting up runtime and design time SDK

* Creating folder structure under your GOPATH directory, ${GOPATH}/src/github.com/project-flogo/
* Run git clone from command line 
```bash
cd ${GOPATH}/src/github.com/project-flogo/
git clone https://github.com/project-flogo/core.git
```
* Download design time [SDK](../../../../../../../sdk)
* Extract the wi-studio.zip and put wi-studio folder under template directory(${GOPATH/src/github.com/tibco/Template/node_modules/})


Now you are ready to go with your development. Let's try to edit exist Connection/Activity/Trigger

* Connection [here](../changes-connection)
* Activity [here](../changes-activity)
* Trigger [here](../changes-trigger)

## Upload 
  * Compress Template folder under `${GOPATH/src/github.com/tibco/Template/src/app` to `Template.zip`
  * Follow [Here](../../../../../../upload) to upload to Flogo Enterprise or TIBCO Cloud Integration to play.

