---
date: 2016-04-09T16:50:16+02:00
title: Trigger Model
weight: 57
---

The `trigger.json` file describes the model, the metadata, of the trigger. It describes, among other things, what the input and outputs are, who built it and which version you're using. 
Every trigger contribution must define its model in `trigger.json` file.This model is shared by both UI and runtime. The trigger model contains following parts:
#### Trigger JSON sections
1. `settings` - Zero or more fields that contribute to the trigger configuration. * It is the common configuration for all handlers of same trigger type.
1. `handler` - A trigger must define a handler. It contains zero or more fields that contribute to the handler configuration. All handlers of the same type are grouped together in the WI application.
1. `outputs` - Zero or more fields that contribute to trigger output
1. `contrib: display/sections` - A UI grouping which defines the Tabs(Names) in a property sheet view of a Trigger/Activity
1. `contrib: display/wizard`- A UI grouping which defines the Step(Names) in a Wizard dialog step view of Trigger
```json
{
  "name": "sqsreceivemessage",
  "title": "Receive SQS Message",
  "version": "1.0.0",
  "author": "TIBCO Software Inc.",
  "type": "flogo:trigger",
  "display": {
    "category": "AWSSQS",
    "visible": true,
    "smallIcon": "sqsreceivemessage.png",
    "description": "This trigger receives a message from the standard queue",
    "wizard": ["Choose Connection"]
  },
  "ref": "github.com/TIBCOSoftware/tci-flogo/samples/extensions/AWSSQS/trigger/sqsreceivemessage",
  "settings": [
    {
      "name": "sqsConnection",
      "type": "connection",
      "required": true,
      "display": {
        "name": "SQS Connection",
        "description": "Select SQS Connection",
        "type": "connection"
      },
      "wizard": {
        "type": "dropdown",
        "selection": "single",
        "step": "Choose Connection"
      },
      "allowed": []
    }
  ],
  "handler": {
    "settings": [
      {
        "name": "queueUrl",
        "type": "string",
        "required": true,
        "display": {
          "name": "Queue URL",
          "description": "Select Queue URL"
        },
        "allowed": []
      },
      {
        "name": "MaxNumberOfMessages",
        "type": "integer",
        "required": false,
        "display": {
          "name": "Max Number of Messages",
          "description": "Max Number of Messages Description"
        },
        "value": 1
      },
      {
        "name": "VisibilityTimeout",
        "type": "integer",
        "required": false,
        "display": {
          "name": "Visibility Timeout",
          "description": "Visibility Timeout Description"
        },
        "value": 0
      },
      {
        "name": "WaitTimeSeconds",
        "type": "integer",
        "required": false,
        "display": {
          "name": "WaitTime(Seconds)",
          "description": "Wait time Description"
        },
        "value": 0
      },
      {
        "name": "deleteMessage",
        "type": "boolean",
        "required": false,
        "display": {
          "name": "Delete Received Message",
          "description": "Delete received message(s)"
        },
        "value": false
      },
      {
        "name": "AttributeNames",
        "type": "array",
        "required": false,
        "display": {
          "name": "Attribute Names",
          "description": "Name and type of attributes that you wish to receive",
          "type": "table",
          "schema": "{\r\n    \"$schema\": \"http:\/\/json-schema.org\/draft-04\/schema#\",\r\n    \"definitions\": {},\r\n    \"id\": \"http:\/\/example.com\/example.json\",\r\n    \"items\": {\r\n        \"id\": \"\/items\",\r\n        \"properties\": {\r\n            \"Name\": {\r\n                \"id\": \"\/items\/properties\/Name\",\r\n                \"type\": \"string\"\r\n            },\r\n            \"Type\": {\r\n                \"id\": \"\/items\/properties\/Type\",\r\n                \"type\": {\"enum\":[\"String\", \"Integer\"]}\r\n            }\r\n        },\r\n        \"type\": \"object\"\r\n    },\r\n    \"type\": \"array\"\r\n}",
          "inputSettingsOnly":true
        }
      },
      {
        "name": "MessageAttributeNames",
        "type": "array",
        "required": false,
        "display": {
          "name": "Message Attributes",
          "description": "Name and type of message attributes that you wish to receive",
          "type": "table",
          "schema": "{\r\n    \"$schema\": \"http:\/\/json-schema.org\/draft-04\/schema#\",\r\n    \"definitions\": {},\r\n    \"id\": \"http:\/\/example.com\/example.json\",\r\n    \"items\": {\r\n        \"id\": \"\/items\",\r\n        \"properties\": {\r\n            \"Name\": {\r\n                \"id\": \"\/items\/properties\/Name\",\r\n                \"type\": \"string\"\r\n            },\r\n            \"Type\": {\r\n                \"id\": \"\/items\/properties\/Type\",\r\n                \"type\": {\"enum\":[\"String\", \"Number\"]}\r\n            }\r\n        },\r\n        \"type\": \"object\"\r\n    },\r\n    \"type\": \"array\"\r\n}",
          "inputSettingsOnly":true
        }
      }
    ]
  },
  "outputs": [
    {
      "name": "Message",
      "type": "object"
    }
  ],
  "actions": [{
    "name": "Finish"
  }]
}

```
## Validation
When creating the `trigger.json` file, there are a few validation rules that you need take into account:

* **name**: The name cannot start with "tibco-" and should only contain alphanumeric chararcters and underscores
* **title**: The title of your trigger (which also shows up on your trigger palette) should only contain alphanumeric chararcters and spaces
* **version**: The version of your trigger follows the semver notation (x.y.z), with numeric characters separated by dots
* **type**: The type must always be **flogo:trigger**
* **ref**: The ref field must be in the form of `<category>/trigger/<triggername>` and the category and trigger name must be the exact same case as the category and name specified above
* **type** _under inputs_: The [type](../display-settings) can be either one of the types in the [Types](../display-settings/#types) section if it is part of the input or the [Special types](../display-settings/#special-types) if it is part of the display section.

## Configuring your user interface
The user interface is divided into five main sections and these sections are populated based on the configuration you create above. The five main sections are:

* Configuration
* Output
* Output settings

### Configuration
Any element in the **settings** section of your trigger.json that has a **display** element associated with it will be shown in the configuration section:
```json
{
    "name": "url",
    "type": "string",
    "required": true,
    “display”: {
        "name":"Service URL"
    }
    "value": "http://myservice.sample.com"
}
```

### Output
Any element in the **outputs** section of your `trigger.json` file that doesn't have a **display** element associated with it will be shown in the output section so you use it in the inputs for activities in the rest of your flow.
```json
{
    "name": "result",
    "type": "string"
}
```

### Output settings
Any element in the **outputs** section of your `trigger.json` file that has a **display** element associated with it and has a schema associated with it will be shown in the Output settings section. Note that you also need to set the **mappable** element to true.
```json
{
    "name": "body",
    "type": "complex_object",
    "required": true,
    “display”: {
        "name":"Response Schema",
        "type":"texteditor",
        "syntax":"json"
    }
}

```

### Model for simple Trigger
In this case, both inputs will be displayed in the Configuration section and values can only be statically configured.

```json
{
    "name": "Notification",
    "type": "flogo:trigger",
    "version": "1.0.0",
    "display": {
       "description": "This trigger generates a notification at given interval",
       "category": "Alert",
       "visible": true,
       "wizard" : ["step-1", "step-2" ]
       "smallIcon": "icons/trigger-small-icon.png",
       "largeIcon": "icons/trigger-large-icon.png"
    },
    "ref": "trigger/Alert/notification",
    "settings": [
    ],
    "handler": {
        "settings": [
            {
                "name": "interval",
                "type": "integer",
                "display": {
                    "description": "The time interval to send a notification",
                    "name": "Time Interval"
                },
                "value": 1,
                "required": true
            },
            {
                "name": "Interval Unit",
                "type": "string",
                "required": true,
                "display": {
                    "description": "The unit of time interval",
                    "name": "Interval Unit",
                    "type": "dropdown"
                },
                "value": "Second",
                "allowed": [
                    "Second",
                    "Minute",
                    "Hour",
                    "Day",
                    "Week"
                ]
            }
        ]
    },       
    "outputs": [
           {
            "name": "result",
            "type": "string"
          }
    ]
}
```

### Model for JSON schema based output
In this case, the output is defined by the JSON schema. A tree constructed from the JSON schema would be displayed in the Output section.

```json
{
    "name": "Notification",
    "version": "1.0.0",
    "type": "flogo:trigger",
    "display": {
       "description": "This trigger generates a notification at given interval",
       "category": "Alert",
       "visible": true,
       "smallIcon": "icons/trigger-small-icon.png",
       "largeIcon": "icons/trigger-large-icon.png"
    },
    "ref": "trigger/Alert/notification",
    "settings": [
    ],
    "handler": {
        "settings": [
        ]
    },       
    "outputs": [
           {
            "name": "output",
            "type": "complex_object",
            "value": "{\"$schema\":\"http:\/\/json-schema.org\/draft-04\/schema#\",\"definitions\":{},\"id\":\"http:\/\/example.com\/example.json\",\"items\":{\"id\":\"\/items\",\"properties\":{\"string\":{\"id\":\"\/items\/properties\/string\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}"
          }
    ]
}
```

### Model for user defined schema based output
In this case, users will input a JSON data in the Output Settings section. A tree constructed from the JSON would be displayed in the Output section.

```json
{
    "name": "Notification",
    "version": "1.0.0",
    "type": "flogo:trigger",
    "display": {
       "description": "This trigger generates a notification at given interval",
       "category": "Alert",
       "visible": true,
       "smallIcon": "icons/trigger-small-icon.png",
       "largeIcon": "icons/trigger-large-icon.png"
    },
    "ref": "trigger/Alert/notification",
    "settings": [
    ],
    "handler": {
        "settings": [
        ]
    },       
    "outputs": [
           {
            "name": "output",
            "type": "complex_object",
            "display": {
              "name":"Enter JSON Data/Schema",
              "type": "texteditor",
              "syntax": "json"
            }
          }
    ]
}
```

### Model for table
In this case, table will be displayed in the Input Setting and Output settings. Users can add one or more entries into the table which can be displayed in the Input section and Output section.

```json
{
    "name": "Notification",
    "version": "1.0.0",
    "type": "flogo:trigger",
    "display": {
       "description": "This trigger generates a notification at given interval",
       "category": "Alert",
       "visible": true,
       "smallIcon": "icons/trigger-small-icon.png",
       "largeIcon": "icons/trigger-large-icon.png"
    },
    "ref": "trigger/Alert/notification",
    "settings": [
    ],
    "handler": {
        "settings": [
        ]
    },       
    "outputs": [
           {
            "name": "output",
            "type": "complex_object",
            "display": {
              "name":"Add Numbers",
              "type": "table",
              "schema": "{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"Number\":{\"type\":\"string\"},\"Type\":{\"type\":\"number\"}}}}"
            }
      }
    ]
}
```

### Model for using connection
In this case, trigger refers to a JDBC connection. It is up to the trigger to fetch list of connections using Connector helper API.
```json
{
    "name": "Notification",
    "version": "1.0.0",
    "type": "flogo:trigger",
    "display": {
       "description": "This trigger generates a notification at given interval",
       "category": "Alert",
       "visible": true,
       "smallIcon": "icons/trigger-small-icon.png",
       "largeIcon": "icons/trigger-large-icon.png"
    },
    "ref": "trigger/Alert/notification",
    "settings": [
    ],
    "handler": {
        "settings": [
          {
            "name": "connection",
            "type": "complex_object",
            "required": true,
            "display": {
              "name":"Select JDBC Connection",
              "type": "connection"
            },
            "allowed":[]
          }
        ]
    },       
    "outputs": [
            
    ]
}
```
### Model for trigger with wizard steps
In this case the trigger json is setup to emulate a wizard where the user is navigating through a series of steps to configure the trigger and subsequent flows. This is powerful use case where the trigger can create a single or multiple flows based on the definition. A wizard mode consists of a number or steps where the user can navigate back and forth until the Finish stage is reached.
At the end of the finish the Trigger needs to send a `ICreateFlowActionResult` back to the studio. The `ICreateFlowActionResult` is created using the TCI Flogo Studio SDK.

```json
{
    "title": "Receive Message",
    "name": "tibco-trigger",
    "version": "1.0.0",
    "type": "flogo:trigger",
    "display": {
        "category": "Tibco",
        "visible": true,
        "description": "Tibco Trigger",
        "smallIcon": "icons/ic-tibco-trigger@2x.png",
        "largeIcon": "icons/ic-tibco-trigger@3x.png",
        "wizard": ["Choose Connection", "Choose Object"]
    },
    "ref": ".........",
    "handler": {
        "settings": [{
                "name": "Connection Name",
                "required": true,
                "type": "object",
                "display": {
                    "name": "Connection",
                    "description": "Select a connection",
                    "type": "connection",
                    "visible": true
                },
                "wizard": {
                    "type": "dropdown",
                    "selection": "single",
                    "step": "Choose Connection"
                },
                "allowed": []
            },
            {
                "name": "Object Name",
                "type": "string",
                "required": true,
                "allowed": [],
                "display": {
                    "name": "Object",
                    "description": "Business object name",
                    "type": "dropdown",
                    "selection": "single",
                    "visible": true
                },
                "wizard": {
                    "type": "dropdown",
                    "selection": "single",
                    "step": "Choose Object"
                }
            }
        ]
    },
    "outputs": [{
        "name": "output",
        "type": "complex_object"
    }]
}
```
### Using CSS to define custom styles in wizard 
The contribution developer can define custom styles for any UI component in wizard using the CSS property under wizard. The CSS uses the field name as the unique id for the UI component.

#### `Example1`: 
Consider that trigger model has a simple text box like
```json
{
    "name": "Path",
    "type": "string",
    "required": true,
    ........
    "wizard": {
        "name": "Resource path",
        "type": "string",
        "step": "Step 1"
    }
}
```

For the above Path field, you can apply styles using the standard CSS and _`pseudo-classes`_ like

```json
{
    "name": "Path",
    "type": "string",
    "required": true,
    ........
    "wizard": {
        "name": "Resource path",
        "type": "string",
        "step": "Step 1",
        "css": {
            "#Path:default": "{border: 1px solid #000, ......}", // Path is the field name and these styles for default case or ideal case
            "#Path:hover": "{border: 1px solid #FF0, .........}" // These styles are applied when hover on a element. For more pseudo-classes look at https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
        }
    }
},
```
#### `Example2`: 
For complex widgets like selectButtons there will be multiple options and in order to add CSS for each option the CSS selector will have option id after field name i.e
```json
{
    "name": "Method",
    "type": "string",
    "required": true,
    "allowed": [
        "GET",
        "POST",
        "PUT",
        "DELETE"
    ],
    .........
    "wizard": {
        "type": "selectButtons",
        "selection": "multiple",
        "step": "Step 1",
        "css": {
            // Field name Method followed by the option unique id(i.e value) and then pseudo class
            "#Method #GET:default": "{ border: dotted 4px #4dbdc7;color: #4dbdc7;}", // This is the style for GET button in default case
            "#Method #POST:default": "{ border: dotted 4px #89a857;color: #89a857;}", // This is the style for POST button in default case
            "#Method #PUT:default": "{ border: dotted 4px #efb416;color: #efb416;}",
            "#Method #DELETE:default": "{ border: dotted 4px #d3418c;color: #d3418c;}",
            "#Method #GET:checked": "{background-color: #0fbfc7;border: solid 4px #4dbdc7;}", // This is the style for GET button in mouseover case
            "#Method #POST:checked": "{background-color: #89a857;border: solid 4px #89a857;}", // This is the style for POST button in mouseover case
            "#Method #PUT:checked": "{background-color: #efb416;border: solid 4px #efb416;}",
            "#Method #DELETE:checked": "{background-color: #d3418c;border: solid 4px #d3418c;}"
        }
    }
}
```