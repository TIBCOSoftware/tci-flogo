---
date: 2016-04-09T16:50:16+02:00
title: Edit Trigger
weight: 4
---

## Trigger

Now let's go to trigger folder ${GOPATH}/src/github.com/tibco/Template/src/app/Template/trigger/trigger1

* descriptor.json   -> Model file which has all fields for the trigger
* trigger.go   -> Activity runtime code
* metadata.go   -> Activity runtime module code,which has all field in activity.json. You can keep this file or move all code into activity.go. it's upto you.
* trigger_test.go   -> Activity runtime testing code
* trigger1.module.ts -> UI module code
* trigger1Handler.ts -> UI contribution handle code

## Edit

* Add/Edit/Delete fields in activity.json to show on activity ui page.
* If #1 fields requires for runtime, you have to added them in metadata.go for runtime.
* If you need add validation or new added field, please add into `trigger1Handle.ts`

## Trigger Wizard

The wizard defines at root display section,  and all fields need show on wizard need add wizard section by each fields. 
![img.png](../img.png)

Below code must be done in action code to copy all fields value from wizard to trigger. 
![img_1.png](../img_1.png)
## Auto Mapping

It also possible to do auto filled mapping from trigger to flow input or flow input to trigger by doing in ts code under action

![img_2.png](../img_2.png)