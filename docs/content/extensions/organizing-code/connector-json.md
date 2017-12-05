---
date: 2016-04-09T16:50:16+02:00
title: connector.json
weight: 52
---

The connector.json describes the model, the meta data, of the connector. It describes which fields are displayed and what kind of actions are supported in the connector UI. The below code explains which fields are in the JSON document as well as what kind of values are allowed. For more samples, check out the samples section!
```json
{
    "name": "wi-ext-ifttt",
    "title": "IFTTT WebHooks Connector",
    "author": "retgits",
    "type": "flogo:connector",
    "version": "0.1.0",
    "display": {
      "description": "The IFTTT WebHooks Connector",
      "category": "IFTTT",
      "visible": true,
      "smallIcon": "ifttt.png"
    },
    "ref": "IFTTT/connector/wi-ext-ifttt",
    "keyfield": "name",
    "settings": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "display": {
          "name": "Connection Name",
          "description": "Name of the connection"
        }
      },
      {
        "name": "description",
        "type": "string",
        "display": {
          "name": "Description",
          "description": "Connection description"
        }
      },
      {
        "name": "webhookKey",
        "type": "string",
        "required": true,
        "display": {
          "name": "Key",
          "description": "The Key for the WebHook",
          "type": "password"
        }
      },
      {
        "name": "eventName",
        "type": "string",
        "required": true,
        "display": {
          "name": "Event",
          "description": "The Event for the WebHook"
        }
      }
    ],
    "actions": [
      {
        "name": "Connect",
        "display": {
          "readonly": true
        }
      }
    ]
  }
```
## Validation
When creating the connector.json file, there are a few validation rules that you need take into account:

* **name**: The name cannot start with "tibco-" and should only contain alphanumeric chararcters and underscores
* **title**: The title of your connector (which also shows up on your activity) should only contain alphanumeric chararcters and spaces
* **version**: The version of your activity follows the semver notation (x.y.z), with numeric characters separated by dots
* **type**: The type must always be **flogo:connector**
* **ref**: The ref field must be in the form of `<category>/activity/<activityname>` and the category and activity name must be the exact same case as the category and name specified above
* **type** _under inputs_: The [type](../display-settings) can be either one of the types in the [Types](../display-settings/#types) section if it is part of the input or the [Special types](../display-settings/#special-types) if it is part of the display section.
* **actions**: Each action will be rendered as a button on the screen and should be handled by the code in [connector.ts](../connector-ts)