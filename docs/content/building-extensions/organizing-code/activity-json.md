---
date: 2016-04-09T16:50:16+02:00
title: Activity Model
weight: 54
---

The `descriptor.json` describes the model, the metadata, of the activity. It describes, among other things, what the input and outputs are, who built it and which version you're using. The below code explains which fields are in the JSON document as well as what kind of values are allowed. For more samples, check out the samples section!
```json
{
  "name": "sqssendmessage",
  "version": "1.0.0",
  "author": "TIBCO Software Inc.",
  "type": "flogo:activity",
  "title": "Send SQS Message",

  "display": {
    "category": "AWSSQS",
    "visible": true,
    "smallIcon": "sqssendmessage.png",
    "description": "This activity sends a message to the standard queue"
  },

  "ref": "github.com/TIBCOSoftware/tci-flogo/samples/extensions/AWSSQS/activity/sqssendmessage",
  "settings": [
    {
      "name": "sqsConnection",
      "type": "connection",
      "required": true,
      "display":{
        "name": "SQS Connection",
        "description": "Select SQS Connection",
        "type": "connection"
      },
      "allowed":[]
    },
    {
      "name": "queueUrl",
      "type": "string",
      "required": true,
      "display":{
        "name": "Queue URL",
        "description": "Select Queue URL"
      },
      "allowed":[]
    },
    {
      "name": "DelaySeconds",
      "type": "integer",
      "display":{
        "name":"Delay",
        "description":"Delay Description"
      },
      "value" : 0
    }
  ],
  "inputs": [
    {
      "name": "MessageAttributeNames",
      "type": "array",
      "required": false,
      "display": {
        "name": "Message Attributes",
        "description": "Set message attributes",
        "type": "table",
        "schema": "{\r\n    \"$schema\": \"http:\/\/json-schema.org\/draft-04\/schema#\",\r\n    \"definitions\": {},\r\n    \"id\": \"http:\/\/example.com\/example.json\",\r\n    \"items\": {\r\n        \"id\": \"\/items\",\r\n        \"properties\": {\r\n            \"Name\": {\r\n                \"id\": \"\/items\/properties\/Name\",\r\n                \"type\": \"string\"\r\n            },\r\n            \"Type\": {\r\n                \"id\": \"\/items\/properties\/Type\",\r\n                \"type\": {\"enum\":[\"String\", \"Number\"]}\r\n            }\r\n        },\r\n        \"type\": \"object\"\r\n    },\r\n    \"type\": \"array\"\r\n}",
        "inputSettingsOnly":true
      }
    },
    {
      "name": "MessageAttributes",
      "type": "object",
      "required": false
    },
    {
      "name": "MessageBody",
      "type": "string",
      "required": true
    }
  ],

  "outputs": [
    {
      "name": "MessageId",
      "type": "string"
    }
  ]
}
```
## Validation
When creating the `descriptor.json` file, there are a few validation rules that you need take into account:

* **name**: The name cannot start with "tibco-" and should only contain alphanumeric chararcters and underscores
* **title**: The title of your activity (which also shows up on your activity) should only contain alphanumeric characters and spaces
* **version**: The version of your activity follows the semver notation (x.y.z), with numeric characters separated by dots
* **type**: The type must always be **flogo:activity**
* **ref**: The ref field must be in the form of `<category>/activity/<activityname>` and the category and activity name must be the exact same case as the category and name specified above
* **type** _under inputs_: The [type](../display-settings) can be either one of the types in the [Types](../display-settings/#types) section if it is part of the input or the [Special types](../display-settings/#special-types) if it is part of the display section.

## Configuring your user interface
The user interface is divided into five main sections and these sections are populated based on the configuration you create above. The five main sections are:

* Configuration
* Input
* Input settings
* Output
* Output settings

### Configuration
Any element in the **settings** or **Input**section of your activity `descriptor.json` that has a **display** element associated with it will be shown in the configuration section:
```json
{
  "name": "sqsConnection",
  "type": "connection",
  "required": true,
  "display":{
    "name": "SQS Connection",
    "description": "Select SQS Connection",
    "type": "connection"
  },
  "allowed":[]
}
```

### Input
Any element in the **inputs** section of your `activity.json` that doesn't have a **display** element associated with it will be shown in the input section so you can still use it in the mapper.
```json
{
    "name": "value1",
    "type": "string",
    "required": true
}
```

### Input settings
Any element in the **inputs** section of your `activity.json` that has a **display** element associated with it and has a schema associated with it will be shown in the Input settings section. Note that you also need to set the **mappable** element to true.
```json
    {
      "name": "MessageAttributeNames",
      "type": "array",
      "required": false,
      "display": {
        "name": "Message Attributes",
        "description": "Set message attributes",
        "type": "table",
        "schema": "{\r\n    \"$schema\": \"http:\/\/json-schema.org\/draft-04\/schema#\",\r\n    \"definitions\": {},\r\n    \"id\": \"http:\/\/example.com\/example.json\",\r\n    \"items\": {\r\n        \"id\": \"\/items\",\r\n        \"properties\": {\r\n            \"Name\": {\r\n                \"id\": \"\/items\/properties\/Name\",\r\n                \"type\": \"string\"\r\n            },\r\n            \"Type\": {\r\n                \"id\": \"\/items\/properties\/Type\",\r\n                \"type\": {\"enum\":[\"String\", \"Number\"]}\r\n            }\r\n        },\r\n        \"type\": \"object\"\r\n    },\r\n    \"type\": \"array\"\r\n}",
        "inputSettingsOnly":true
      }
    }
```

### Output
Any element in the **outputs** section of your `activity.json` that doesn't have a **display** element associated with it will be shown in the output section so you use it in the inputs for activities in the rest of your flow.
```json
{
    "name": "result",
    "type": "string"
}
```

### Output settings
Any element in the **outputs** section of your `activity.json` that has a **display** element associated with it and has a schema associated with it will be shown in the Output settings section. Note that you also need to set the **mappable** element to true.
```json

```