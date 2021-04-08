---
title: Extension
weight: 3
chapter: true
pre: "<i class=\"fa fa-bolt\" aria-hidden=\"true\"></i> "
---

# Getting started


The extensions for TIBCO Cloud<sup>&trade;</sup> Integration Flogo<sup>&trade;</sup> or TIBCO Flogo<sup>&trade;</sup> Enterprise consist of several files that all have a very specific function. The files are either used for the model, the UI or the runtime. In the below tables you can see which files you need and which are optional when you're developing connectors and activities.


Before that, lets quickly look at files that you would be creating for your contribution.

|Component|Technology|Activity| Trigger| Connector |Description|
|---------|----------|-----------------|----------|-------|-------|
|Model|	JSON |	descriptor.json| descriptor.json|descriptor.json|`Every contribution must define the model in JSON format.`|
|UI(Optional)|	Angular 2.x TypeScript|`activity.ts` `activity.module.ts`|`trigger.ts` `trigger.module.ts`|`connector.ts` `connector.module.ts`|`In situations where the value or display of a field is dependent on values of preceding fields, the contribution should provide typescripts. It consists of *.module.ts (Angular Module) and *.ts (Angular Service)<br />We do not support third-party libraries in typescript code. Recommended using HTTP module wherever possible.`|
|Runtime|Golang|`activity.go` `activity_test.go`|`trigger.go` `*.test.go`|`connection.go` `*.test.go`|`Every contribution must write the runtime code in Go (activity.go).You can leverage Go testing framework for writing unit test cases(activity_test.go) for your contribution runtime`|

Now Let's take for more details

## Connector

| Component | Technology | Filename                             | Description
| --------- | ---------- | ------------------------------------ | -----------
| Model     | JSON       | [descriptor.json](./connection-model-runtime/#model)                       | The `connector.json ` file describes the model, the meta data, of the connector. It describes which fields are displayed and what kind of actions are supported in the connector UI.
| UI        | TypeScript | [connector.ts & connector.module.ts](./connection-model-runtime/#ui-contribution) | The `connector.ts` file handles the validation and actions for the fields described in the model. For example it validates that values have been entered in the text boxes or what to do when you click _connect_
| Runtime   | Go | [connection.go](./connection-model-runtime/#runtime) | The `connector.ts` file handles the validation and actions for the fields described in the model. For example it validates that values have been entered in the text boxes or what to do when you click _connect_

## Activity

| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [descriptor.json](./activity-model-runtime/#model)                    | The `activity.json` describes the model, the meta data, of the activity. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [activity.go & activity_test.go](./activity-model-runtime/#runtime)   | Every extension must write the runtime code in Go (`activity.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`activity_test.go`) for your extension.
| UI (_optional_) | TypeScript | [activity.ts & activity.module.ts](./activity-model-runtime/#ui-contribution) | The `activity.ts` file handles the validation and actions for the fields described in the model. For example it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. This part is optional and you can rely on the out of the box UI as well!

## Trigger

| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [descriptor.json](./trigger-model-runtime/#model)                    | The `trigger.json` file describes the model, the metadata, of the trigger. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [trigger.go & trigger_test.go](./trigger-model-runtime/#runtime)   | Every extension must write the runtime code in Go (`trigger.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`trigger_test.go`) for your extension.
| UI (_optional_) | TypeScript | [trigger.ts & trigger.module.ts](./trigger-model-runtime/#ui-contribution) | The `trigger.ts` file handles the validation and actions for the fields described in the model. For example it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. This part is optional and you can rely on the out of the box UI as well!

## Contribution.json

* The contributon.json place under category name and it contains `name` ,`version` and `description` of this contributions.

## Layout and Widgets
* Check out [Here](./layout-widgets) for extension Layout, supporting types and widgets