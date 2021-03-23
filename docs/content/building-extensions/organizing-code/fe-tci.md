    ---
date: 2016-04-09T16:50:16+02:00
title: Category Contribution
weight: 51
---

The extensions for TIBCO Cloud<sup>&trade;</sup> Integration Flogo<sup>&trade;</sup> or TIBCO Flogo<sup>&trade;</sup> Enterprise consist of several files that all have a very specific function. The files are either used for the model, the UI or the runtime. In the below tables you can see which files you need and which are optional when you're developing connectors and activities.


Before that, lets quickly look at files that you would be creating for your contribution.

|Component|Technology|Activity| Trigger| Connector |Description|
|---------|----------|-----------------|----------|-------|-------|
|Model|	JSON |	descriptor.json| descriptor.json|descriptor.json|Every contribution must define the model in JSON format.|
|UI(Optional)|	Angular 2.x TypeScript|activity.ts<br />activity.module.ts|trigger.ts<br />trigger.module.ts|connector.ts<br />connector.module.ts|In situations where the value or display of a field is dependent on values of preceding fields, the contribution should provide typescripts. It consists of *.module.ts (Angular Module) and *.ts (Angular Service)<br />We do not support third-party libraries in typescript code. Recommended using HTTP module wherever possible.|
|Runtime|Golang|activity.go</br>activity_test.go|trigger.go</br>*.test.go|connection.go</br>*.test.go|Every contribution must write the runtime code in Go (activity.go).<./br>You can leverage Go testing framework for writing unit test cases(activity_test.go) for your contribution runtime.</br>|

Now Let's take for more details

## Connector

| Component | Technology | Filename                             | Description
| --------- | ---------- | ------------------------------------ | -----------
| Model     | JSON       | [descriptor.json](../connector-json)                       | The `connector.json ` file describes the model, the meta data, of the connector. It describes which fields are displayed and what kind of actions are supported in the connector UI.
| UI        | TypeScript | [connector.ts<br/>connector.module.ts](../connector-ts) | The `connector.ts` file handles the validation and actions for the fields described in the model. For example it validates that values have been entered in the text boxes or what to do when you click _connect_ 
| Runtime   | Go | [connection.go](../connector-go) | The `connector.ts` file handles the validation and actions for the fields described in the model. For example it validates that values have been entered in the text boxes or what to do when you click _connect_

## Activity

| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [descriptor.json](../activity-json)                    | The `activity.json` describes the model, the meta data, of the activity. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [activity.go<br/>activity_test.go](../activity-go)   | Every extension must write the runtime code in Go (`activity.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`activity_test.go`) for your extension.
| UI (_optional_) | TypeScript | [activity.ts<br/>activity.module.ts](../activity-ts) | The `activity.ts` file handles the validation and actions for the fields described in the model. For example it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. This part is optional and you can rely on the out of the box UI as well! 

## Trigger

| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [descriptor.json](../trigger-json)                    | The `trigger.json` file describes the model, the metadata, of the trigger. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [trigger.go<br/>trigger_test.go](../trigger-go)   | Every extension must write the runtime code in Go (`trigger.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`trigger_test.go`) for your extension.
| UI (_optional_) | TypeScript | [trigger.ts<br/>trigger.module.ts](../trigger-ts) | The `trigger.ts` file handles the validation and actions for the fields described in the model. For example it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. This part is optional and you can rely on the out of the box UI as well! 

## Contribution.json
The contributon.json place under category name and it contains `name` and `version` of this contributions.


## Supporting types and widgets

For supporting types and wigfets in model, please refer to [here](../display-settings)

## Folder Layout 

The layout of your folder has to follow a specific structure.
```
<category>
├───activity
│   └───<activity name>
└───connector
│   └───<connector name>
└───trigger
|    └───<trigger name>
└───contribution.json
   
```
The category you want your activities to be in should be the name of your top level folder. Your activities will be in separate folders under the **activity** folder and your connectors will be subfolders of the **connector** folder and the triggers will be under the **trigger** folder. Please note that names of activities connectors and triggers should be in lowercase

```
Please note that names of activities, triggers and connectors should be in lowercase
```

****
So an example, where we create an [AWSSQS](https://aws.amazon.com/sqs/) category, with both an activity and a connector called **AWSSQS** would have a complete structure like below
```
AWSSQS
├───activity
│   └───sqssendmessage
│       ├───descriptor.json
│       |───activity.go
│       |───activity_test.go
│       |───activity.ts
│       |───activity.module.ts
│       └───sqssendmessage.png
│───connector
│    └───sqs
│        ├───descriptor.json
│        |───connector.ts
│        |───connector.module.ts
│        └───sqs.png
│        └───connector
│───trigger
│    └───sqsreceivemessage
│        ├───descriptor.json
│        |───trigger.ts
│        |───trigger.module.ts
│        └───sqsreceivemessage.png
│───contribution.json
```
The code in this section is available on [GitHub](https://github.com/TIBCOSoftware/tci-flogo/tree/master/samples/extensions/AWSSQS)!

***Note***

Please note here and be more careful about below items
* All category name in trigger, activity or connector must match
* All ref in decriptor.json must have the same prefix before category name: such as: `github.com/TIBCOSoftware/tci-flogo/samples/extensions`/AWSSQS
* For local Go code testing purpose, please create ref dir under your `${GOPATH}/src/${ref}`, such as: `github.com/TIBCOSoftware/tci-flogo/samples/extensions/AWSSQS/activity/sqssendmessage/`


## Upload

Compress category folder into zip and upload to [FLOGO Enterprise or TIBCO Cloud Integration](./../../upload)
