---
date: 2016-04-09T16:50:16+02:00
title: Sending a message
weight: 30
---

## Send a message
To send a message to Amazon SQS we'll create a Send Message activity.
 The API that we follow is documented by [Amazon](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html).

### activity.json
```
{
    "name": "sqssendmessage",
    "version": "1.0.0",
    "author": "TIBCO Software Inc.",
    "type": "flogo:activity",
    "title": "Send SQS Message",
     
    "display": {
       "category": "AWS",
       "visible": true,
       "smallIcon": "sqssendmessage.png",
       "description": "This activity sends a message to the standard queue"
    },
 
    "ref": "github.com/TIBCOSoftware/tci-webintegrator/examples/AWS/activity/sqssendmessage",
    "inputs": [
           {
            "name": "sqsConnection",
            "type": "object",
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
            "name": "MessageAttributeNames",
            "type": "array",
            "required": false,
            "display": {
               "name": "Message Attributes",
               "description": "Set message attributes",
               "type": "table",
               "schema": "{\r\n    \"$schema\": \"http:\/\/json-schema.org\/draft-04\/schema#\",\r\n    \"definitions\": {},\r\n    \"id\": \"http:\/\/example.com\/example.json\",\r\n    \"items\": {\r\n        \"id\": \"\/items\",\r\n        \"properties\": {\r\n            \"Name\": {\r\n                \"id\": \"\/items\/properties\/Name\",\r\n                \"type\": \"string\"\r\n            },\r\n            \"Type\": {\r\n                \"id\": \"\/items\/properties\/Type\",\r\n                \"type\": {\"enum\":[\"String\", \"Number\"]}\r\n            }\r\n        },\r\n        \"type\": \"object\"\r\n    },\r\n    \"type\": \"array\"\r\n}"
            }
           },
           {
            "name": "MessageAttributes",
            "type": "complex_object",
            "required": false
           }, 
           {
            "name": "DelaySeconds",
            "type": "integer",
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

### activity.module.ts
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SQSSendMessageActivityContributionHandler} from "./activity";
import { WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";


@NgModule({
  imports: [
  	CommonModule,
  	HttpModule,
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: SQSSendMessageActivityContributionHandler
     }
  ]
})

export default class ConcatActivityModule {

}
```

### activity.ts
The TypeScript code to fetch the SQS connection and Queue URLs.
```typescript
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
                WiContributionUtils.getConnections(this.http, "AWS").subscribe((data: IConnectorContribution[]) => {
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
                            let accessKeyId: IFieldDefinition;
                            let secreteKey: IFieldDefinition;
                            let region: IFieldDefinition;

                            for (let configuration of data.settings) {
                                if (configuration.name === "accessKeyId") {
                                    accessKeyId = configuration
                                } else if (configuration.name === "secreteAccessKey") {
                                    secreteKey = configuration
                                } else if (configuration.name === "region") {
                                    region = configuration
                                }
                            }

                            var sqs = new AWS.SQS({
                                credentials: new AWS.Credentials(accessKeyId.value, secreteKey.value), region: region.value
                            });
                            var params = {};
                            sqs.listQueues(params, function (err, data) {
                                if (err) {
                                    observer.next(queueUrls);
                                } else {
                                    observer.next(data.QueueUrls);
                                }
                            });

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

### activity.go
The runtime code
```go
package sqssendmessage

import (
	"fmt"
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
	"github.com/TIBCOSoftware/flogo-lib/core/data"
	"github.com/TIBCOSoftware/flogo-lib/logger"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sqs"
)

const (
	ivConnection            = "sqsConnection"
	ivQueueUrl              = "queueUrl"
	ivMessageAttributes     = "MessageAttributes"
	ivMessageAttributeNames = "MessageAttributeNames"
	ivDelaySeconds          = "DelaySeconds"
	ivMessageBody           = "MessageBody"
	ovMessageId             = "MessageId"
)

var activityLog = logger.GetLogger("aws-activity-sqssendmessage")

type SQSSendMessageActivity struct {
	metadata *activity.Metadata
}

func NewActivity(metadata *activity.Metadata) activity.Activity {
	return &SQSSendMessageActivity{metadata: metadata}
}

func (a *SQSSendMessageActivity) Metadata() *activity.Metadata {
	return a.metadata
}
func (a *SQSSendMessageActivity) Eval(context activity.Context) (done bool, err error) {
	activityLog.Info("Executing SQS Send Message activity")
	//Read Inputs
	if context.GetInput(ivConnection) == nil {
		return false, activity.NewError("SQS connection is not configured", "SQS-SENDMESSAGE-4001", nil)
	}

	if context.GetInput(ivQueueUrl) == nil {
		return false, activity.NewError("SQS Queue URL is not configured", "SQS-SENDMESSAGE-4002", nil)
	}

	if context.GetInput(ivMessageBody) == nil {
		return false, activity.NewError("Message body is not configured", "SQS-SENDMESSAGE-4003", nil)
	}

	//Read connection details
	connectionInfo := context.GetInput(ivConnection).(map[string]interface{})
	connectionSettings := connectionInfo["settings"].([]interface{})
	var region string
	var accesskey string
	var secreteKey string
	for _, v := range connectionSettings {
		setting := v.(map[string]interface{})
		if setting["name"] == "accessKeyId" {
			accesskey = setting["value"].(string)
		} else if setting["name"] == "region" {
			region = setting["value"].(string)
		} else if setting["name"] == "secreteAccessKey" {
			secreteKey = setting["value"].(string)
		}
	}
	session, err := session.NewSession(aws.NewConfig().WithRegion(region).WithCredentials(credentials.NewStaticCredentials(accesskey, secreteKey, "")))
	if err != nil {
		return false, activity.NewError(fmt.Sprintf("Failed to connect to AWS due to error:%s. Check credentials configured in the connection:%s.", err.Error(), connectionInfo["name"].(string)), "SQS-SENDMESSAGE-4004", nil)
	}
	//Create SQS service instance
	sqsSvc := sqs.New(session)
	sendMessageInput := &sqs.SendMessageInput{}
	sendMessageInput.QueueUrl = aws.String(context.GetInput(ivQueueUrl).(string))
	sendMessageInput.MessageBody = aws.String(context.GetInput(ivMessageBody).(string))

	if context.GetInput(ivMessageAttributes) != nil && context.GetInput(ivMessageAttributeNames) != nil {
		//Add message attributes

		//Read mapped values
		messageAttributes := context.GetInput(ivMessageAttributes).(*data.ComplexObject)
		if messageAttributes.Value != nil {
			switch messageAttributes.Value.(type) {
			case map[string]interface{}:
				msgAttrs := messageAttributes.Value.(map[string]interface{})

				//Read table values
				attrsName := context.GetInput(ivMessageAttributeNames).([]interface{})
				attrs := make(map[string]*sqs.MessageAttributeValue, len(msgAttrs))
				for _, v := range attrsName {
					attr := v.(map[string]interface{})
					// Has mapped value??
					if msgAttrs[attr["Name"].(string)] != nil {
						attrVal, err := data.CoerceToString(msgAttrs[attr["Name"].(string)])
						if err != nil && attr["Type"].(string) == "Number" {
							attrVal, err = data.CoerceToString(int(msgAttrs[attr["Name"].(string)].(int64)))
						}
						attrs[attr["Name"].(string)] = &sqs.MessageAttributeValue{
							DataType:    aws.String(attr["Type"].(string)),
							StringValue: aws.String(attrVal),
						}
					}
				}
				sendMessageInput.MessageAttributes = attrs
			}
		}
	}

	delaySeconds := context.GetInput(ivDelaySeconds)
	if delaySeconds != nil {
		sendMessageInput.DelaySeconds = aws.Int64(int64(delaySeconds.(int)))
	}

	//Send message to SQS
	response, err1 := sqsSvc.SendMessage(sendMessageInput)
	if err1 != nil {
		return false, activity.NewError(fmt.Sprintf("Failed to send message to SQS due to error:%s", err1.Error()), "SQS-SENDMESSAGE-4005", nil)
	}

	//Set Message ID in the output
	context.SetOutput(ovMessageId, *response.MessageId)
	return true, nil
}
```

### activity_test.go
The unit tests 😄 
```go
/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
package sqssendmessage

import (
	"io/ioutil"
	"testing"

	"github.com/TIBCOSoftware/flogo-contrib/action/flow/test"
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
	"github.com/stretchr/testify/assert"
)

var activityMetadata *activity.Metadata
var connectionData = ``

func getActivityMetadata() *activity.Metadata {
	if activityMetadata == nil {
		jsonMetadataBytes, err := ioutil.ReadFile("activity.json")
		if err != nil {
			panic("No Json Metadata found for activity.json path")
		}
		activityMetadata = activity.NewMetadata(string(jsonMetadataBytes))
	}
	return activityMetadata
}

func TestActivityRegistration(t *testing.T) {
	act := NewActivity(getActivityMetadata())
	if act == nil {
		t.Error("Activity Not Registered")
		t.Fail()
		return
	}
}

func TestEval(t *testing.T) {
	act := NewActivity(getActivityMetadata())
	tc := test.NewTestActivityContext(act.Metadata())

	dummyConnectionData := make(map[string]interface{})
	dummyConnectionSettings := make(map[string]interface{}, 4)
	//Use your AWS information
	dummyConnectionSettings["accesskeyId"] = "<YOUR ACCESS KEY ID>"
	dummyConnectionSettings["secreteAccessKey"] = "<YOUR SECRETE ACCESS KEY>"
	dummyConnectionSettings["region"] = "<REGION NAME WHERE SQS IS RUNNING>"
	dummyConnectionSettings["name"] = "My SQS Connection"

	dummyConnectionData["settings"] = dummyConnectionSettings

	tc.SetInput(ivConnection, dummyConnectionData)
	tc.SetInput(ivQueueUrl, "<YOUR SQS QUEUE URL>")
	tc.SetInput(ivMessageBody, "Message from TIBCO")

	_, err := act.Eval(tc)
	assert.Nil(t, err)
}
```