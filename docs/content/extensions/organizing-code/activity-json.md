---
date: 2016-04-09T16:50:16+02:00
title: activity.json
weight: 54
---

The activity.json describes the model, the meta data, of the activity. It describes, among other things, what the input and outputs are, who built it and which version you're using. The below code explains which fields are in the JSON document as well as what kind of values are allowed. For more samples, check out the samples section!
```json
{
    "name": "webhook",
    "title": "Send IFTTT WebHook",
    "version": "0.1.0",
    "type": "flogo:activity",
    "author": "retgits",
    "display": {
        "category": "IFTTT",
        "visible": true,
        "smallIcon": "ifttt.png",
        "description": "This activity sends a message to an IFTTT WebHook"
    },
    "ref": "IFTTT/activity/ifttt",
    "inputs": [
        {
            "name": "iftttConnection",
            "type": "object",
            "required": true,
            "display":{
              "name": "IFTTT Connection",
              "description": "Select your IFTTT Connection",
              "type": "connection"
            },
            "allowed":[]
        },
        {
            "name": "value1",
            "type": "string",
            "required": true
        },
        {
            "name": "value2",
            "type": "string",
            "required": true
        },
        {
            "name": "value3",
            "type": "string",
            "required": true
        }
    ],
    "outputs": [
        {
            "name": "result",
            "type": "string"
        }
    ]
}
```
## Validation
When creating the activity.json file, there are a few validation rules that you need take into account:

* **name**: The name cannot start with "tibco-" and should only contain alphanumeric chararcters and underscores
* **title**: The title of your activity (which also shows up on your activity) should only contain alphanumeric chararcters and spaces
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
Any element in the **inputs** section of your activity.json that has a **display** element associated with it will be shown in the configuration section:
```json
{
    "name": "iftttConnection",
    "type": "object",
    "required": true,
    "display":{
        "name": "IFTTT Connection",
        "description": "Select your IFTTT Connection",
        "type": "connection"
    },
    "allowed":[]
}
```

### Input
Any element in the **inputs** section of your activity.json that doesn't have a **display** element associated with it will be shown in the input section so you can still use it in the mapper.
```json
{
    "name": "value1",
    "type": "string",
    "required": true
}
```

### Input settings
Any element in the **inputs** section of your activity.json that has a **display** element associated with it and has a schema associated with it will be shown in the Input settings section. Note that you also need to set the **mappable** element to true.
```json

```

### Output
Any element in the **outputs** section of your activity.json that doesn't have a **display** element associated with it will be shown in the output section so you use it in the inputs for activities in the rest of your flow.
```json
{
    "name": "result",
    "type": "string"
}
```

### Output settings
Any element in the **outputs** section of your activity.json that has a **display** element associated with it and has a schema associated with it will be shown in the Output settings section. Note that you also need to set the **mappable** element to true.
```json

```