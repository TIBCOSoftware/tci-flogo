---
date: 2016-04-09T16:50:16+02:00
title: Code organization
weight: 10
---

## The files

Every extension contains a bunch of files that have a very specific function and that are split between Model, UI and Runtime. The Model and the Runtime pieces are required to let your activity do something, the UI is optional. The UI being optional doesn't mean that you won't have a UI if you don't have these files, it simply means Web Integrator will generate a UI for you based on your model

<table class="wrapped"><colgroup><col><col><col><col><col></colgroup>

<tbody>

<tr>

<th rowspan="2">

Component

</th>

<th rowspan="2">Technology</th>

<th colspan="2">Contribution Type</th>

<th rowspan="2">Description</th>

</tr>

<tr>

<th colspan="1"><span>Activity</span></th>

<th colspan="1"><span>Connector</span></th>

</tr>

<tr>

<td>Model</td>

<td colspan="1">JSON</td>

<td>activity.json</td>

<td>connector.json</td>

<td colspan="1">Every contribution must define the model in JSON format.</td>

</tr>

<tr>

<td>UI(Optional)</td>

<td colspan="1">Angular 2.x TypeScript</td>

<td>

activity.ts

activity.module.ts

</td>

<td>

connector.ts

connector.module.ts

</td>

<td colspan="1">

<div class="content-wrapper">

In situations where the value or display of a field is dependent on values of preceding fields, the extension should provide typescripts. It consists of _\*.module.ts_ ([Angular Module](https://angular.io/guide/ngmodule)) and _\*.ts_ ([Angular Service](https://angular.io/guide/architecture#services))

> Currently we don't support third-party libraries in typescript code and we recommended using the HTTP module wherever possible.

</td>

</tr>

<tr>

<td colspan="1">Runtime</td>

<td colspan="1">Golang</td>

<td colspan="1">

activity.go

activity_test.go

</td>

<td colspan="1">NA</td>

<td colspan="1">

<div class="content-wrapper">

Every extension must write the runtime code in **Go** (_activity.go_). You can, and really should, leverage the Go testing framework for writing unit test cases(_activity_test.go_) for your extension.

> Connectors don't have a specific runtime, but they rather provide configuration values to the activity that uses the connector.
</td>
</tr>
</tbody>
</table>

## Folder Layout 
Your contributions must follow below folder layout.
![layout.png](https://raw.githubusercontent.com/TIBCOSoftware/tci-webintegrator/master/images/layout.png)

where,

\<Category\> - Name of category defined in the model

\<ActivityX\> - Lower case activity name (In accordance with Golang package naming convention)

\<ConnectorX\> - Lower case connector name