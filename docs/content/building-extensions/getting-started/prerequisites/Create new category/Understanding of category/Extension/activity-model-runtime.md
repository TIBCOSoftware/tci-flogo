---
date: 2016-04-09T16:50:16+02:00
title: Activity Model and Runtime
weight: 3
---

## Model

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

## Runtime


Every extension must write the runtime code in Go (`activity.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`activity_test.go`) for your extension. 

* Interface of activity [Here](https://github.com/project-flogo/core/blob/master/activity/activity.go#L9)

## activity.go
```go
/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

package sqssendmessage

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/sqs"
	"github.com/pkg/errors"
	"github.com/project-flogo/core/activity"
	"github.com/project-flogo/core/data/coerce"
	"github.com/project-flogo/core/data/metadata"
	"github.com/project-flogo/core/support/log"
)

func init() {
	_ = activity.Register(&SQSSendMessageActivity{}, New)
}

var activityLog = log.ChildLogger(log.RootLogger(), "aws-activity-sqssendmessage")

var activityMd = activity.ToMetadata(&Settings{}, &Input{}, &Output{})

type SQSSendMessageActivity struct {
	settings *Settings
	sqssvc   *sqs.SQS
}

func New(ctx activity.InitContext) (activity.Activity, error) {
	s := &Settings{}
	err := metadata.MapToStruct(ctx.Settings(), s, true)

	if err != nil {
		return nil, err
	}

	cm, err := coerce.ToConnection(s.SQSConnection)

	if err != nil {
		return nil, err
	}

	c, ok := cm.GetConnection().(*sqs.SQS)
	if !ok {
		activityLog.Error("Connection Error")
		return nil, errors.New("Connection Error")
	}

	act := &SQSSendMessageActivity{settings: s, sqssvc: c}
	return act, nil
}

func (a *SQSSendMessageActivity) Metadata() *activity.Metadata {
	return activityMd
}

func (a *SQSSendMessageActivity) Eval(context activity.Context) (done bool, err error) {

	input := &Input{}

	err = context.GetInputObject(input)
	if err != nil {
		return false, err
	}

	activityLog.Info("Executing SQS Send Message activity")

	if a.settings.QueueURL == "" {
		return false, activity.NewError("SQS Queue URL is not configured", "SQS-SENDMESSAGE-4002", nil)
	}

	if input.MessageBody == "" {
		return false, activity.NewError("Message body is not configured", "SQS-SENDMESSAGE-4003", nil)
	}

	sqsSvc := a.sqssvc
	sendMessageInput := &sqs.SendMessageInput{}
	sendMessageInput.QueueUrl = aws.String(a.settings.QueueURL)
	sendMessageInput.MessageBody = aws.String(input.MessageBody)

	messageAttributes := input.MessageAttributes
	attrsName := input.MessageAttributeNames
	if messageAttributes != nil && attrsName != nil {

		//Read mapped values
		if messageAttributes != nil {
			msgAttrs, _ := coerce.ToObject(messageAttributes)
			if msgAttrs != nil {
				//Read table values
				attrs := make(map[string]*sqs.MessageAttributeValue, len(msgAttrs))
				for _, v := range attrsName {
					attr, _ := coerce.ToObject(v)
					if attr != nil && attr["Name"] != nil && attr["Type"] != nil {
						// Has mapped value??
						if msgAttrs[attr["Name"].(string)] != nil {
							attrVal, err := coerce.ToString(msgAttrs[attr["Name"].(string)])
							if err != nil && attr["Type"].(string) == "Number" {
								attrVal, err = coerce.ToString(int(msgAttrs[attr["Name"].(string)].(int64)))
							}
							attrs[attr["Name"].(string)] = &sqs.MessageAttributeValue{
								DataType:    aws.String(attr["Type"].(string)),
								StringValue: aws.String(attrVal),
							}
						}
					}
				}
				sendMessageInput.MessageAttributes = attrs
			}
		}
	}

	delaySeconds := a.settings.Delay
	if delaySeconds != 0 {
		sendMessageInput.DelaySeconds = aws.Int64(int64(delaySeconds))
	}

	//Send message to SQS
	response, err1 := sqsSvc.SendMessage(sendMessageInput)
	if err1 != nil {
		return false, activity.NewError(fmt.Sprintf("Failed to send message to SQS due to error:%s", err1.Error()), "SQS-SENDMESSAGE-4005", nil)
	}

	//Set Message ID in the output
	output := &Output{}
	output.MessageId = *response.MessageId
	err = context.SetOutputObject(output)
	if err != nil {
		return false, fmt.Errorf("error setting output for Activity [%s]: %s", context.Name(), err.Error())
	}
	return true, nil
}

```
## UI Contribution

The `activity.ts` file handles the validation and actions for the fields described in the model.
For example,  it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. 
This part is optional and you can rely on the out of the box UI as well! The `activity.module.ts` makes sure that Flogo knows about your extension and injects the validation rules into it. This isn't the full code, so if you want to see a sample check out the samples section!

There are 2 functions in `connector.ts`
* *value* Setting field's value, the value can be set hardcoded value or get value from network in ts.
* *Validate* Show validation error in UI or set ready only or visibility base on field relationship. 

Above are same with [Connection](../connection-model-runtime) UI Contribution

```typescript
/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import { Observable } from "rxjs/Observable";
import { Injectable, Injector, Inject } from "@angular/core";
import { Http } from "@angular/http";
import {
    WiContrib,
    WiServiceHandlerContribution,
    IValidationResult,
    ValidationResult,
    IFieldDefinition,
    IActivityContribution,
    IConnectorContribution,
    WiContributionUtils
} from "wi-studio/app/contrib/wi-contrib";
import * as AWS from "aws-sdk";

@WiContrib({})
@Injectable()
export class SendMsgActivityContribution extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector, private http: Http) {
        super(injector, http);
    }

    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        if (fieldName === "sqsConnection") {
            //Connector Type must match with the category defined in connector.json
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
        } else if (fieldName === "MessageAttributes") {
            let msgAttrNames: IFieldDefinition = context.getField("MessageAttributeNames");
            if (msgAttrNames.value) {
                // Read message attrbutes and construct JSON schema on the fly for the activity input
                var jsonSchema = {};
                // Convert string value into JSON object
                let data = JSON.parse(msgAttrNames.value);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Type === "String") {
                        jsonSchema[data[i].Name] = "abc";
                    } else if (data[i].Type === "Number") {
                        jsonSchema[data[i].Name] = 0;
                    }
                }
                return JSON.stringify(jsonSchema);
            }
            return "{}";
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
                    }
                );
            }
        }
        return null;
    }

    validate = (fieldName: string, context: IActivityContribution): Observable<IValidationResult> | IValidationResult => {
        if (fieldName === "sqsConnection") {
            let connection: IFieldDefinition = context.getField("sqsConnection")
            if (connection.value === null) {
                return ValidationResult.newValidationResult().setError("AWS-SEND-MSG-1000", "SQS Connection must be configured");
            }
        } else if (fieldName === "queueUrl") {
            let queueUrl: IFieldDefinition = context.getField("queueUrl")
            if (queueUrl.value === null) {
                return ValidationResult.newValidationResult().setError("AWS-SEND-MSG-1001", "Queue URL must be configured");
            }
        }
        return null;
    }
}

```