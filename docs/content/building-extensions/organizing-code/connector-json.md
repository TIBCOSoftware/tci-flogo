---
date: 2016-04-09T16:50:16+02:00
title: Connector Model
weight: 52
---

The `descriptor.json` describes the model, the metadata of the connector's connection. It describes which fields are displayed and what kind of actions are supported in the connector UI. The below code explains which fields are in the JSON document as well as what kind of values are allowed. For more samples, check out the samples section!
```json
{
  "name": "tibco-sqs",
  "title": "AWS SQS Connector",
  "author": "TIBCO Software Inc.",
  "type": "flogo:connector",
  "version": "1.0.0",
  "display": {
    "description": "This is Amazon SQS connector",
    "category": "AWSSQS",
    "visible": true,
    "smallIcon": "sqs.png",
    "connectionsupport": true
  },
  "ref": "github.com/TIBCOSoftware/tci-flogo/samples/extensions/AWSSQS/connector/sqs",
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
      "name": "accessKeyId",
      "type": "string",
      "required": true,
      "display": {
        "name": "Access Key ID",
        "description": "AWS Access key ID for the user",
        "type": "password"
      }
    },
    {
      "name": "secretAccessKey",
      "type": "string",
      "required": true,
      "display": {
        "name": "Secret Access Key",
        "description": "AWS Secret Access Key for the user",
        "type": "password"
      }
    },
    {
      "name": "region",
      "type": "string",
      "required": true,
      "display": {
        "name": "Region",
        "description": "Name of the region where SQS service is running"
      }
    },
    {
      "name": "assumeRole",
      "type": "boolean",
      "required" : true,
      "display": {
        "name": "Use Assume Role",
        "description": "Use for AWS Assume role, default is false"
      },
      "value":false
    },
    {
      "name": "roleArn",
      "type": "string",
      "required" : true,
      "display": {
        "name": "Role ARN",
        "description": "The Amazon Resource Name (ARN) of the role to assume",
        "appPropertySupport": true
      }
    },
    {
      "name": "roleSessionName",
      "type": "string",
      "required" : true,
      "display": {
        "name": "Role Session Name",
        "description": "An identifier for the assumed role session",
        "appPropertySupport": true
      }
    },
    {
      "name": "externalId",
      "type": "string",
      "required" : false,
      "display": {
        "name": "External ID",
        "description": "A unique identifier that might be required when you assume a role in another account",
        "appPropertySupport": true
      }
    },
    {
      "name": "expirationDuration",
      "type": "integer",
      "required" : true,
      "display": {
        "name": "Expiration Duration(secs) ",
        "description": "The duration, in seconds, of the role session. The value can range from 900 seconds (15 minutes) up to the maximum session duration setting for the role",
        "appPropertySupport": true
      },
      "value": 900
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
When creating the `descriptor.json` file for connection, there are a few validation rules that you need take into account:

* **name**: The name cannot start with "tibco-" and should only contain alphanumeric chararcters and underscores
* **title**: The title of your connector (which also shows up on your activity) should only contain alphanumeric chararcters and spaces
* **version**: The version of your activity follows the semver notation (x.y.z), with numeric characters separated by dots
* **type**: The type must always be **flogo:connector**
* **ref**: The ref field must be in the form of `<category>/connector/<connectorName>` and the category and connector name must be the exact same case as the category and name specified above
* **type** _under inputs_: The [type](../display-settings) can be either one of the types in the [Types](../display-settings/#types) section if it is part of the input or the [Special types](../display-settings/#special-types) if it is part of the display section.
* **actions**: Each action will be rendered as a button on the screen and should be handled by the code in [connector.ts](../connector-ts),  in [connector.ts](../connector-ts) where we handle field
