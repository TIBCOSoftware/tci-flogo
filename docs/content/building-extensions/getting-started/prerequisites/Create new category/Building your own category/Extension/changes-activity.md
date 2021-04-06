---
date: 2016-04-09T16:50:16+02:00
title: Edit Activity
weight: 4
---


## Activity

Now let's go to activity folder ${GOPATH}/src/github.com/tibco/Template/src/app/Template/activity/act1

* descriptor.json   -> Model file which has all fields
* activity.go   -> Activity runtime code
* metadata.go   -> Activity runtime module code,which has all field in activity.json. You can keep this file or move all code into activity.go. it's upto you.
* activity_test.go   -> Activity runtime testing code
* act1.module.ts -> UI module code
* act1Handler.ts -> UI contribution handle code

## Edit

* Add/Edit/Delete fields in activity.json to show on activity ui page.
* If #1 fields requires for runtime, you have to added them in metadata.go for runtime.
* If you need add validation or new added field, please add into `activity.handle.ts`
