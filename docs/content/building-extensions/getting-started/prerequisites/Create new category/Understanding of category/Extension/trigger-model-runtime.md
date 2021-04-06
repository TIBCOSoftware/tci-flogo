---
date: 2016-04-09T16:50:16+02:00
title: Trigger Model and Runtime
weight: 4
---

## Model

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
The user interface is divided into five main sections and these sections are populated based on the configuration you create above. The three main sections are:

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
    "display": {
        "name":"Service URL"
    },
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
    "type": "object",
    "required": true,
    "display": {
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

## Runtime

Every extension must write the runtime code in Go (`trigger.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`trigger_test.go`) for your extension. 
The code here give you an overview of what files are structured like, but for samples you should really check out the samples section!

* Trigger Interface [Here](https://github.com/project-flogo/core/blob/master/trigger/trigger.go#L10)

Note.

```
When we implement the start method of trigger, be awared that we cannot block the main goroutine, to wait or listen on event in another async goroutine. 
```

```go
package sqsreceivemessage

import (
	"context"
	"errors"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/sqs"
	"github.com/project-flogo/core/data/coerce"
	"github.com/project-flogo/core/data/metadata"
	"github.com/project-flogo/core/support/log"
	"github.com/project-flogo/core/trigger"
)

func init() {
	_ = trigger.Register(&Trigger{}, &Factory{})
}

var triggerLog = log.ChildLogger(log.RootLogger(), "aws-trigger-sqsreceivemessage")
var triggerMd = trigger.NewMetadata(&Settings{}, &HandlerSettings{}, &Output{})

type Factory struct {
}

func (*Factory) Metadata() *trigger.Metadata {
	return triggerMd
}

func (*Factory) New(config *trigger.Config) (trigger.Trigger, error) {
	s := &Settings{}
	err := metadata.MapToStruct(config.Settings, s, true)

	if err != nil {
		return nil, err
	}

	cm, err := coerce.ToConnection(s.SQSConnection)

	if err != nil {
		return nil, err
	}

	c, ok := cm.GetConnection().(*sqs.SQS)
	if !ok {
		triggerLog.Error("Connection Error")
		return nil, errors.New("Connection Error")
	}

	return &Trigger{name: config.Id, sqssvc: c}, nil
}

type Trigger struct {
	SQSHandlers map[string]*SQSHandler
	sqssvc      *sqs.SQS
	name        string
}

type SQSHandler struct {
	sqssvc              *sqs.SQS
	handler             trigger.Handler
	settings            *HandlerSettings
	shutdown            chan bool
	triggerName         string
	receiveMessageInput sqs.ReceiveMessageInput
}

func (t *Trigger) Initialize(ctx trigger.InitContext) error {

	var err error
	t.SQSHandlers = make(map[string]*SQSHandler)
	for _, handler := range ctx.GetHandlers() {
		handlerSetting := &HandlerSettings{}
		err := metadata.MapToStruct(handler.Settings(), handlerSetting, true)
		if err != nil {
			return err
		}
		if handlerSetting.QueueURL == "" {
			return errors.New("Empty Queue URL")
		}
		sqsHandler := &SQSHandler{}
		sqsHandler.settings = handlerSetting
		sqsHandler.handler = handler
		sqsHandler.shutdown = make(chan bool)
		sqsHandler.sqssvc = t.sqssvc
		sqsHandler.triggerName = t.name
		t.SQSHandlers[handlerSetting.QueueURL] = sqsHandler

		receiveMessageInput := &sqsHandler.receiveMessageInput
		receiveMessageInput.QueueUrl = aws.String(handlerSetting.QueueURL)

		attrsNames := handlerSetting.AttributeNames
		if attrsNames != nil && len(attrsNames) > 0 {
			//Add attribute names
			attrs := make([]*string, len(attrsNames))
			for i, v := range attrsNames {
				attrInfo, _ := coerce.ToObject(v)
				if attrInfo != nil && attrInfo["Name"] != nil {
					attrs[i] = aws.String(attrInfo["Name"].(string))
				}
			}
			receiveMessageInput.AttributeNames = attrs
		}

		attrsNames = handlerSetting.MessageAttributeNames
		if attrsNames != nil && len(attrsNames) > 0 {
			attrs := make([]*string, len(attrsNames))
			for i, v := range attrsNames {
				attrInfo, _ := coerce.ToObject(v)
				if attrInfo != nil && attrInfo["Name"] != nil {
					attrs[i] = aws.String(attrInfo["Name"].(string))
				}
			}
			receiveMessageInput.MessageAttributeNames = attrs
		}

		maxNumberOfMessages := handlerSetting.MaxNumberOfMessages
		if maxNumberOfMessages != 0 {
			receiveMessageInput.MaxNumberOfMessages = aws.Int64(int64(maxNumberOfMessages))
		}

		visibilityTimeout := handlerSetting.VisibilityTimeout
		if visibilityTimeout != 0 {
			receiveMessageInput.VisibilityTimeout = aws.Int64(int64(visibilityTimeout))
		}

		waitTimeSeconds := handlerSetting.WaitTimeSeconds
		if waitTimeSeconds != 0 {
			receiveMessageInput.WaitTimeSeconds = aws.Int64(int64(waitTimeSeconds))
		}
	}
	return err
}

func (t *Trigger) Start() error {
	for _, handler := range t.SQSHandlers {
		go handler.start()
	}
	return nil
}

func (t *Trigger) Stop() error {
	for _, handler := range t.SQSHandlers {
		handler.shutdown <- true
	}
	return nil
}

func (h *SQSHandler) start() {
	for {
		select {
		case <-h.shutdown:
			triggerLog.Debugf("Stopping receiver for Queue [%s] for trigger [%s]", h.settings.QueueURL, h.triggerName)
			return
		default:
			sqsSvc := h.sqssvc
			response, err := sqsSvc.ReceiveMessage(&h.receiveMessageInput)
			if err != nil {
				triggerLog.Errorf("Trigger [%s] failed to receive message for Queue [%s] due to error - {%v}", h.triggerName, h.settings.QueueURL, err)
			}

			deleteMsgs := h.settings.DeleteMessage

			//Set Message details in the output
			msgs := make([]map[string]interface{}, len(response.Messages))
			if len(response.Messages) > 0 {
				for i, msg := range response.Messages {
					if deleteMsgs {
						deleteMsgInput := &sqs.DeleteMessageInput{}
						deleteMsgInput.SetQueueUrl(h.settings.QueueURL)
						deleteMsgInput.SetReceiptHandle(*msg.ReceiptHandle)
						_, err := sqsSvc.DeleteMessage(deleteMsgInput)
						if err != nil {
							triggerLog.Errorf("Failed to delete received message from SQS due to error:%s", err)
						}
					}
					msgs[i] = make(map[string]interface{})
					//read attributes
					if len(msg.Attributes) > 0 {
						msgs[i]["Attribute"] = make(map[string]string, len(msg.Attributes))
						attrs := msgs[i]["Attribute"].(map[string]string)
						for k, v := range msg.Attributes {
							attrs[k] = *v
						}
					}
					//read message attributes
					if len(msg.MessageAttributes) > 0 {
						msgs[i]["MessageAttributes"] = make(map[string]string, len(msg.MessageAttributes))
						attrs := msgs[i]["MessageAttributes"].(map[string]string)
						for k, v := range msg.MessageAttributes {
							attrs[k] = *v.StringValue
						}
						msgs[i]["MD5OfMessageAttributes"] = *msg.MD5OfMessageAttributes
					}

					if msg.Body != nil {
						msgs[i]["Body"] = *msg.Body
						msgs[i]["MD5OfBody"] = *msg.MD5OfBody
					}
					if msg.MessageId != nil {
						msgs[i]["MessageId"] = *msg.MessageId
					}
					msgs[i]["ReceiptHandle"] = *msg.ReceiptHandle
				}
			}

			output := &Output{}
			output.Message = msgs
			triggerLog.Debugf("Message received for Queue [%s] by trigger [%s]", h.settings.QueueURL, h.triggerName)
			_, err1 := h.handler.Handle(context.Background(), output)
			if err1 != nil {
				triggerLog.Errorf("Trigger [%s] failed to execute action for Queue [%s] due to error - {%v}", h.triggerName, h.settings.QueueURL, err)
			}
		}
	}
}

```

## UI Contributions

The `trigger.ts` file handles the validation and actions for the fields described in the model.
For example, it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. 
This part is optional and you can rely on the out of the box UI as well! 
The `trigger.module.ts` file makes sure that Flogo knows about your extension and injects the validation rules into it. This isn't the full code, so if you want to see a sample check out the samples section!

```typescript
/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { Injectable, Injector, Inject } from "@angular/core";
import * as lodash from "lodash";
import {
    WiContrib,
    ActionResult,
    CreateFlowActionResult,
    ICreateFlowActionContext,
    WiServiceHandlerContribution,
    IValidationResult,
    ValidationResult,
    IFieldDefinition,
    ITriggerContribution,
    WiContribModelService,
    IConnectorContribution,
    IActionResult,
    WiContributionUtils
} from "wi-studio/app/contrib/wi-contrib";
import * as AWS from "aws-sdk";

@WiContrib({})
@Injectable()
export class RecvMsgTriggerContribution extends WiServiceHandlerContribution {

    constructor(private injector: Injector, private http: Http, private contribModelService: WiContribModelService) {
        super(injector, http, contribModelService);
    }

    value = (fieldName: string, context: ITriggerContribution): Observable<any> | any => {
        if (fieldName === "sqsConnection") {
            //Connector Type must match with the name defined in connector.json
            return Observable.create(observer => {
                let connectionRefs = [];
                WiContributionUtils.getConnections(this.http, "AWSSQS").subscribe((data: IConnectorContribution[]) => {
                    data.forEach(connection => {
                        for (let i = 0; i < connection.settings.length; i++) {
                            if (connection.settings[i].name === "name") {
                                connectionRefs.push({
                                    "unique_id": WiContributionUtils.getUniqueId(connection),
                                    "name": connection.settings[i].value
                                });
                                break;
                            }
                        }
                    });
                    observer.next(connectionRefs);
                });
            });
        } else if (fieldName === "Message") {
            var jsonSchema = {};
            jsonSchema["Attributes"] = {};
            jsonSchema["MessageAttributes"] = {};
            let attrNames: IFieldDefinition = context.getField("AttributeNames");
            if (attrNames.value) {
                var attrJsonSchema = {};
                // Convert string value into JSON object
                let data = JSON.parse(attrNames.value);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Type === "String") {
                        attrJsonSchema[data[i].Name] = "abc";
                    } else if (data[i].Type === "Integer") {
                        attrJsonSchema[data[i].Name] = 0;
                    }
                }
                jsonSchema["Attributes"] = attrJsonSchema;
            }

            let msgAttrNames: IFieldDefinition = context.getField("MessageAttributeNames");
            if (msgAttrNames.value) {
                // Read message attrbutes and construct JSON schema on the fly for the activity input
                var msgAttrJsonSchema = {};
                // Convert string value into JSON object
                let data = JSON.parse(msgAttrNames.value);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Type === "String") {
                        msgAttrJsonSchema[data[i].Name] = "abc";
                    } else if (data[i].Type === "Number") {
                        msgAttrJsonSchema[data[i].Name] = 0;
                    }
                }
                jsonSchema["MessageAttributes"] = msgAttrJsonSchema;
            }
            jsonSchema["Body"] = "";
            jsonSchema["MD5OfBody"] = "";
            jsonSchema["MD5OfMessageAttributes"] = "";
            jsonSchema["MessageId"] = "";
            jsonSchema["ReceiptHandle"] = "";
            return "[" + JSON.stringify(jsonSchema) + "]";
        } else if (fieldName === "queueUrl") {
            let connectionField: IFieldDefinition = context.getField("sqsConnection");
            if (connectionField.value) {
                return Observable.create(observer => {
                        //Read connection configuration
                        let queueUrls = [];
                        WiContributionUtils.getConnection(this.http, connectionField.value)
                            .map(data => data)
                            .subscribe(data => {
                                let keyId = "", secretKey = "", region = "";
                                let useAssumeRole = false
                                let roleArn = "", roleSessionName = "", externalId = "";
                                let duration = 60 * 60
                                for (let i = 0; i < data.settings.length; i++) {
                                    if (data.settings[i].name === "accessKeyId") {
                                        keyId = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "secretAccessKey") {
                                        secretKey = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "region") {
                                        region = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "assumeRole") {
                                        useAssumeRole = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "roleArn") {
                                        roleArn = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "roleSessionName") {
                                        roleSessionName = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "externalId") {
                                        externalId = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "expirationDuration") {
                                        duration = data.settings[i].value;
                                    }
                                }

                                let awsCredential = {
                                    accessKeyId: keyId,
                                    secretAccessKey: secretKey,
                                    region: region,
                                    sessionToken:""
                                };

                                if (useAssumeRole == true) {
                                    console.log("Assume role")
                                    const sts = new AWS.STS(awsCredential);
                                    const assumeRoleParam = {
                                        RoleArn: roleArn,
                                        RoleSessionName: roleSessionName,
                                        ExternalId: externalId,
                                        DurationSeconds: duration
                                    };
                                    if (externalId === "") {
                                        delete assumeRoleParam.ExternalId
                                    }
                                    sts.assumeRole(assumeRoleParam, (err, data) => {
                                        if (err) {
                                            console.log("error occured...........".concat(err.message))
                                            observer.next(queueUrls);
                                            observer.complete();
                                        }else {
                                            console.log("Assume role call observer next")
                                            awsCredential.accessKeyId = data.Credentials.AccessKeyId
                                            awsCredential.secretAccessKey = data.Credentials.SecretAccessKey
                                            awsCredential.sessionToken = data.Credentials.SessionToken

                                            var params = {};
                                            let sqs = new AWS.SQS(awsCredential)
                                            sqs.listQueues(params, (err, data) => {
                                                if (err) {
                                                    console.log("error occured...........".concat(err.message))
                                                    observer.next(queueUrls);
                                                }else {
                                                    observer.next(data.QueueUrls);
                                                }
                                                observer.complete();
                                            });
                                        }
                                    });
                                }else {
                                    var sqs = new AWS.SQS({
                                        credentials: new AWS.Credentials(keyId, secretKey), region: region
                                    });
                                    var params = {};
                                    sqs.listQueues(params, function (err, data) {
                                        if (err) {
                                            observer.next(queueUrls);
                                        } else {
                                            observer.next(data.QueueUrls);
                                        }
                                    });
                                }
                            });
                        // .subscribe(data => {
                        //     // let accessKeyId: IFieldDefinition;
                        //     // let secreteKey: IFieldDefinition;
                        //     // let region: IFieldDefinition;
                        //     // for (let configuration of data.settings) {
                        //     //     if (configuration.name === "accessKeyId") {
                        //     //         accessKeyId = configuration
                        //     //     } else if (configuration.name === "secretAccessKey") {
                        //     //         secreteKey = configuration
                        //     //     } else if (configuration.name === "region") {
                        //     //         region = configuration
                        //     //     }
                        //     // }
                        //     //
                        //     // var sqs = new AWS.SQS({
                        //     //     credentials: new AWS.Credentials(accessKeyId.value, secreteKey.value), region: region.value
                        //     // });
                        //     // var params = {};
                        //     // sqs.listQueues(params, function (err, data) {
                        //     //     if (err) {
                        //     //         observer.next(queueUrls);
                        //     //     } else {
                        //     //         observer.next(data.QueueUrls);
                        //     //     }
                        //     // });
                        //
                        // });
                    }
                );
            }
        }
        return null;
    }

    validate = (fieldName: string, context: ITriggerContribution): Observable<IValidationResult> | IValidationResult => {
        if (fieldName === "sqsConnection") {
            let connection: IFieldDefinition = context.getField("sqsConnection");
            if (connection.value === null) {
                return ValidationResult.newValidationResult().setError("AWS-RECV-MSG-1000", "SQS Connection must be configured");
            }
        } else if (fieldName === "queueUrl") {
            let queueUrl: IFieldDefinition = context.getField("queueUrl");
            if (queueUrl.value === null) {
                return ValidationResult.newValidationResult().setError("AWS-RECV-MSG-1001", "Queue URL must be configured");
            }
        }
        return null;
    }

    action = (fieldName: string, context: ICreateFlowActionContext): Observable<IActionResult> | IActionResult => {
        let modelService = this.getModelService();
        let result = CreateFlowActionResult.newActionResult();
        if (context.settings && context.settings.length > 0) {
            let connection = <IFieldDefinition>context.getField("sqsConnection");
            if (connection && connection.value) {
                let trigger = modelService.createTriggerElement("AWSSQS/sqsreceivemessage");
                if (trigger && trigger.settings  && trigger.settings.length > 0) {
                    for (let j = 0; j < trigger.settings.length; j++) {
                        if (trigger.settings[j].name === "sqsConnection") {
                            trigger.settings[j].value = connection.value;
                        }
                    }
                }
                let flowModel = modelService.createFlow(context.getFlowName(), context.getFlowDescription());
                result = result.addTriggerFlowMapping(lodash.cloneDeep(trigger), lodash.cloneDeep(flowModel));
            }
        }
        let actionResult = ActionResult.newActionResult().setSuccess(true).setResult(result);
        return actionResult;
    }
}

```