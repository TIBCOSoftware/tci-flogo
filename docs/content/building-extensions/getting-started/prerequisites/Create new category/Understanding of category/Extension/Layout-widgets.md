---
date: 2016-04-09T16:50:16+02:00
title: Layout and Widgets
weight: 1
---

## Layout 

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


##Supporting types and widgets

## Types
Each display element has a type associated with it. The below table displays the types you can use and the **Go type** column shows how that translates into Go data types you can use in your `activity.go` file

| Type           | Go type                  | Description
| -------------- | ------------------------ | ----------- 
| string         | string                   | A string
| integer        | int64                    | A 64-bit integer
| boolean        | bool                     | A boolean
| number         | float64                  | A 64-bit float
| array          | []interface | A JSON array value like `'[{"a":"1", "b":"2"},{"a":"2", "b":"3"},{"a":"4", "b":"5"}]'` can be set to array field.
| object         | map[string]interface{}   | A JSON object
| connection         | connection   | Flogo Connection Object

## Special types
There are a few special types that you can use in your `activity.json` and `connector.json` files to enhance the user experience even further. These special types drive the user interface and are "translated" to the type you selected for it during runtime.


UI supported widgets

| Widget | Description | Model Configuration | Example(s)|
|-----|-----|-----|-----|
|Text|Render as text box field|x|{<br>"name":"host",<br>"type":"string"<br>}|
|Integer|Render as number field|x|{<br>"name":"host",<br>"type":"integer"<br>}|
|Dropdown|Render field as a dropdown list.<br>The field type must be a string.|{<br>"display": {<br>"name": <DISPLAY LABEL>,<br>"description":<DESCRIPTION>,<br>"type": "dropdown"<br>},<br>"allowed":["one or more items"]<br>}|{<br>"name":"method",<br>"type":"string",<br>"required":true,<br>"display":{<br>"name":"Method",<br>"description":"The REST method used for the requests",<br>"type":"dropdown",<br>"selection":"single"<br>},<br>"allowed":[<br>"GET",<br>"POST",<br>"PUT",<br>"DELETE"<br>],<br>"value":"GET"<br>}|
|File Selector|Render field as a file selector.<br>The field type must be a string.|{<br>"display": {<br>"name": <DISPLAY LABEL>,<br>"description":<DESCRIPTION>,<br>"type": "fileselector", "fileExtensions":[<ONE OR MORE FILE EXTENSIONS>]<br>}|{<br>"name": "certificate",<br>"type": "string",<br>"required": true,<br>"display": {<br>"name": "Server Certificate",<br>"description": "Self-signed PEM certificate for secure connection",<br>"type": "fileselector",<br>"selection": "single",<br>"fileExtensions": [<br>".pem",<br>".cert",<br>".cer",<br>".crt"<br>]<br>}<br>}|
|Table|Render field as a table.<br>The field type must be array or param or object.|{<br>"display": {<br>"name": <DISPLAY LABEL>,<br>"description":<DESCRIPTION>,<br>"type": "table", "schema":<tableSchema>, "value":<DEFAULT Values for Table><br>}|{<br>"name": "headers",<br>"type": "param",<br>"display": {<br>"name": "Request Headers",<br>"description": "The headers you want to send",<br>"type": "params",<br>"schema": "{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"parameterName\":{\"type\":\"string\"},\"type\":{\"type\":{\"enum\":[\"string\",\"number\",\"boolean\"]}},\"repeating\":{\"type\":{\"enum\":[\"true\",\"false\"]}},\"required\":{\"type\":{\"enum\":[\"true\",\"false\"]}}}}}",<br>"mappable": true<br>},<br>"value": "[{\"parameterName\":\"Accept\",\"type\":\"string\",\"repeating\":\"false\",\"required\":\"false\",\"visible\":false},{\"parameterName\":\"Accept-Charset\",\"type\":\"string\",\"repeating\":\"false\",\"required\":\"false\",\"visible\":false},{\"parameterName\":\"Accept-Encoding\",\"type\":\"string\",\"repeating\":\"false\",\"required\":\"false\",\"visible\":false},{\"parameterName\":\"Content-Type\",\"type\":\"string\",\"repeating\":\"false\",\"required\":\"false\",\"visible\":false},{\"parameterName\":\"Content-Length\",\"type\":\"string\",\"repeating\":\"false\",\"required\":\"false\",\"visible\":false},{\"parameterName\":\"Connection\",\"type\":\"string\",\"repeating\":\"false\",\"required\":\"false\",\"visible\":false},{\"parameterName\":\"Cookie\",\"type\":\"string\",\"repeating\":\"false\",\"required\":\"false\",\"visible\":false},{\"parameterName\":\"Pragma\",\"type\":\"string\",\"repeating\":\"false\",\"required\":\"false\",\"visible\":false}]"<br>}|
|Password|Render field as a password type.<br>The field type must be a string.|{<br>"display": {<br>"name": <DISPLAY LABEL>,<br>"description":<DESCRIPTION>,<br>"type": "password",<br>}|{<br>"name": "password",<br>"type": "string",<br>"required": true,<br>"display": {<br>"name": "Password",<br>"description": "Password for xxxxx",<br>"type": "password"<br>}<br>}|
|Text Editor|Render field as a text editor with given syntax.<br>The field type must be object |{<br>"display": {<br>"name": <DISPLAY LABEL>,<br>"description":<DESCRIPTION>,<br>"type": "texteditor", "syntax":"json"<br>}|{<br>"name": "body",<br>"type": "object",<br>"required": true,<br>"display": {<br>"name": "Schema",<br>"description": "An example JSON data or schema",<br>"type": "texteditor",<br>"syntax": "json"<br>}<br>}|
|Checkbox|Render field as a checkbox field.<br>The field type must be string.<br>Update: The field value will be a stringified array, with each value enclosed by escaped double-quotes.|{<br>"display": {<br>"name": <DISPLAY LABEL>,<br>"description":<DESCRIPTION>,<br>"type": "checkbox"}|{<br>"name": "ssl",<br>"type": "boolean",<br>"required": true,<br>"display": {<br>"name": "Enable SSL",<br>"description": "Enable SSL xxxxxxx",<br>}<br>}|

**Note**
All fields value can be overwritten or set through TypeScript UI contribution code base on UI logic.

For each field it has display section to set visibility/Readability etc

| AttributeName | Description | Model Configuration | Example(s)|
|-----|-----|-----|-----|
|visibility|Setting visibility in UI|<code>"display": { </br>&nbsp;&nbsp;&nbsp;"visible": false</br>}</code>|<code>{<br>"name":"method",<br>"type":"string",<br>"required":true,<br>"display":{<br>&nbsp;&nbsp;&nbsp;"visible":false<br>}, <br>"value":"GET"<br>}</code>|
|Readonly|Make field readonly in UI|<code>"display": { </br>&nbsp;&nbsp;&nbsp;"readonly": true</br>}</code>|<code>{<br>"name":"method",<br>"type":"string",<br>"required":true,<br>"display":{<br>&nbsp;&nbsp;&nbsp;"readonly”:true<br>}, <br>"value":"GET"<br>}</code>|
|Exportable|Make field exportable in UI.<br> This flag is to determine if this field can be exported to flogo.json and app.json.<br> Mainly the fields which are also not visible i.e. Access Tokens.|<code>"display": { </br>&nbsp;&nbsp;&nbsp;"exportable": true</br>}</code>|<code>{<br>"name":"method",<br>"type":"string",<br>"required":true,<br>"display":{<br>&nbsp;&nbsp;&nbsp;"exportable”:true<br>}, <br>"value":"GET"<br>}</code>|
|Encryptable|Make field encrypt able in UI.<br> This flag is to determine if a field needs to be encrypted.<br> Mostly fields which are of type password are encrypted by default,<br> however invisible fields which are text fields holding access token data needs to be protected also.|<code>"display": { </br>&nbsp;&nbsp;&nbsp;"encryptable": true</br>}</code>|<code>{<br>"name":"method",<br>"type":"string",<br>"required":true,<br>"display":{<br>&nbsp;&nbsp;&nbsp;"encryptable”:true<br>}, <br>"value":"GET"<br>}</code>|


**Note**
All field's visibility, readability can be set through UI contribution TypeScript code.