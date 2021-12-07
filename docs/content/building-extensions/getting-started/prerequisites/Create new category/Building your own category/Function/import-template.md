---
date: 2016-04-09T16:50:16+02:00
title: Import Template
weight: 2
---

## Import Template

We already have an working simple template which can guide you how to develop extensions

* Download Function [Template](../../../../../../../template)
* Copy the template.zip into your GOPATH dir that created at [Here](../Function)
* Unzip the folder
* Now you will see we have an sample function placed under your folder. the category of the connector is `math`
* All function related code under ${GOPATH}/src/github.com/tibco/function/math/

Now we need setting up runtime code

* Creating folder structure under your GOPATH directory, ${GOPATH}/src/github.com/project-flogo/
* Run git clone from command line
```bash
cd ${GOPATH}/src/github.com/project-flogo/
git clone https://github.com/project-flogo/core.git
```

Now you are ready to go with your development. Let's try to edit exist function [Here](./changes-function)

Or you can just follow [here]() to upload to Flogo Enterprise or TIBCO Cloud Integration to play.
