---
date: 2016-04-09T16:50:16+02:00
title: Organizing your code
weight: 51
---

The extensions for TIBCO Cloud<sup>&trade;</sup> Integration Flogo<sup>&trade;</sup> consist of several files that all have a very specific function. The files are either used for the model, the UI or the runtime. In the below tables you can see which files you need and which are optional when you're developing connectors and activities.

## Connector

| Component | Technology | Filename                             | Description
| --------- | ---------- | ------------------------------------ | -----------
| Model     | JSON       | [connector.json](./connector-json)                       | The `connector.json ` file describes the model, the meta data, of the connector. It describes which fields are displayed and what kind of actions are supported in the connector UI.
| UI        | TypeScript | [connector.ts<br/>connector.module.ts](./connector-ts) | The `connector.ts` file handles the validation and actions for the fields described in the model. For example it validates that values have been entered in the text boxes or what to do when you click _connect_ 

## Activity

| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [activity.json](./activity-json)                    | The `activity.json` describes the model, the meta data, of the activity. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [activity.go<br/>activity_test.go](./activity-go)   | Every extension must write the runtime code in Go (`activity.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`activity_test.go`) for your extension.
| UI (_optional_) | TypeScript | [activity.ts<br/>activity.module.ts](./activity-ts) | The `activity.ts` file handles the validation and actions for the fields described in the model. For example it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. This part is optional and you can rely on the out of the box UI as well! 

## Trigger

| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [trigger.json](./trigger-json)                    | The `trigger.json` file describes the model, the metadata, of the trigger. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [trigger.go<br/>trigger_test.go](./trigger-go)   | Every extension must write the runtime code in Go (`trigger.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`trigger_test.go`) for your extension.
| UI (_optional_) | TypeScript | [trigger.ts<br/>trigger.module.ts](./trigger-ts) | The `trigger.ts` file handles the validation and actions for the fields described in the model. For example it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. This part is optional and you can rely on the out of the box UI as well! 

## Folder Layout 

The layout of your folder has to follow a specific structure.
```
<category>
├───activity
│   └───<activity name>
└───connector
│   └───<connector name>
└───trigger
    └───<trigger name>
```
The category you want your activities to be in should be the name of your top level folder. Your activities will be in separate folders under the **activity** folder and your connectors will be subfolders of the **connector** folder and the triggers will be under the **trigger** folder. Please note that names of activities connectors and triggers should be in lowercase

{{% notice warning %}}
Please note that names of activities and connectors should be in lowercase
{{% /notice %}}

So an example, where we create an [IFTTT](https://www.ifttt.com) category, with both an activity and a connector called **ifttt** would have a complete structure like below
```
ifttt
├───activity
│   └───ifttt
│       ├───activity.json
│       |───activity.go
│       |───activity_test.go
│       |───activity.ts
│       |───activity.module.ts
│       └───ifttt.png
└───connector
    └───ifttt
        ├───connector.json
        |───connector.ts
        |───connector.module.ts
        └───ifttt.png
```
The code in this section is available on [GitHub](https://github.com/retgits/wi-ifttt-extension)!