---
date: 2016-04-09T16:50:16+02:00
title: Receiving a message
weight: 20
---

## Receive a message
To receive a message from Amazon SQS we'll create a Receive Message activity. The API that we follow is documented by [Amazon](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html).

### activity.json
```
{
	"name": "sqsreceivemessage",
	"title": "Receive SQS Message",
	"version": "1.0.0",
	"author": "TIBCO Software Inc.",
	"type": "flogo:activity",
	"display": {
		"category": "AWS",
		"visible": true,
		"smallIcon": "sqsreceivemessage.png",
		"description": "This activity receives a message from the standard queue"
	},
	"ref": "github.com/TIBCOSoftware/tci-webintegrator/examples/AWS/activity/sqsreceivemessage",
	"inputs": [
		{
			"name": "sqsConnection",
			"type": "object",
			"required": true,
			"display": {
				"name": "SQS Connection",
				"description": "Select SQS Connection",
				"type": "connection"
			},
			"allowed": []
		},
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
				"schema": "{\r\n    \"$schema\": \"http:\/\/json-schema.org\/draft-04\/schema#\",\r\n    \"definitions\": {},\r\n    \"id\": \"http:\/\/example.com\/example.json\",\r\n    \"items\": {\r\n        \"id\": \"\/items\",\r\n        \"properties\": {\r\n            \"Name\": {\r\n                \"id\": \"\/items\/properties\/Name\",\r\n                \"type\": \"string\"\r\n            },\r\n            \"Type\": {\r\n                \"id\": \"\/items\/properties\/Type\",\r\n                \"type\": {\"enum\":[\"String\", \"Integer\"]}\r\n            }\r\n        },\r\n        \"type\": \"object\"\r\n    },\r\n    \"type\": \"array\"\r\n}"
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
				"schema": "{\r\n    \"$schema\": \"http:\/\/json-schema.org\/draft-04\/schema#\",\r\n    \"definitions\": {},\r\n    \"id\": \"http:\/\/example.com\/example.json\",\r\n    \"items\": {\r\n        \"id\": \"\/items\",\r\n        \"properties\": {\r\n            \"Name\": {\r\n                \"id\": \"\/items\/properties\/Name\",\r\n                \"type\": \"string\"\r\n            },\r\n            \"Type\": {\r\n                \"id\": \"\/items\/properties\/Type\",\r\n                \"type\": {\"enum\":[\"String\", \"Number\"]}\r\n            }\r\n        },\r\n        \"type\": \"object\"\r\n    },\r\n    \"type\": \"array\"\r\n}"
			}
		},
		{
			"name": "MaxNumberOfMessages",
			"type": "integer",
			"required": false,
			"value": 1
		},
		{
			"name": "VisibilityTimeout",
			"type": "integer",
			"required": false
		},
		{
			"name": "WaitTimeSeconds",
			"type": "integer",
			"required": false
		}
	],
	"outputs": [
		{
			"name": "Message",
			"type": "complex_object"
		}
	]
}
```

### activity.module.ts
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SQSReceiveMessageActivityContributionHandler} from "./activity";
import { WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";
 
 
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: SQSReceiveMessageActivityContributionHandler
     }
  ]
})
 
export default class SQSReceiveMessageActivityModule {
 
}
```

### activity.ts
The TypeScript code to fetch SQS connection and Queue URLs.
```typescript
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { Injectable, Injector, Inject } from "@angular/core";
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
export class RecvMsgActivityContribution extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector, private http: Http) {
        super(injector, http);
    }

    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        if (fieldName === "sqsConnection") {
            //Connector Type must match with the name defined in connector.json
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
                return ValidationResult.newValidationResult().setError("AWS-RECV-MSG-1000", "SQS Connection must be configured");
            }
        } else if (fieldName === "queueUrl") {
            let queueUrl: IFieldDefinition = context.getField("queueUrl")
            if (queueUrl.value === null) {
                return ValidationResult.newValidationResult().setError("AWS-RECV-MSG-1001", "Queue URL must be configured");
            }
        }
        return null;
    }
}
```

### activity.go
The runtime code
```go
package sqsreceivemessage

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
	ivDeleteMessage         = "deleteMessage"
	ivQueueUrl              = "queueUrl"
	ivMessageAttributeNames = "MessageAttributeNames"
	ivAttributeNames        = "AttributeNames"
	ivMaxNumberOfMessages   = "MaxNumberOfMessages"
	ivVisibilityTimeout     = "VisibilityTimeout"
	ivWaitTimeSeconds       = "WaitTimeSeconds"
	ovMessage               = "Message"
)

var activityLog = logger.GetLogger("aws-activity-sqsreceivemessage")

type SQSReceiveMessageActivity struct {
	metadata *activity.Metadata
}

func NewActivity(metadata *activity.Metadata) activity.Activity {
	return &SQSReceiveMessageActivity{metadata: metadata}
}

func (a *SQSReceiveMessageActivity) Metadata() *activity.Metadata {
	return a.metadata
}
func (a *SQSReceiveMessageActivity) Eval(context activity.Context) (done bool, err error) {
	activityLog.Info("Executing SQS Send Message activity")
	//Read Inputs
	if context.GetInput(ivConnection) == nil {
		return false, activity.NewError("SQS connection is not configured", "SQS-RECEIVEMESSAGE-4001", nil)
	}

	if context.GetInput(ivQueueUrl) == nil {
		return false, activity.NewError("SQS Queue URL is not configured", "SQS-RECEIVEMESSAGE-4002", nil)
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
	receiveMessageInput := &sqs.ReceiveMessageInput{}
	receiveMessageInput.QueueUrl = aws.String(context.GetInput(ivQueueUrl).(string))

	if context.GetInput(ivAttributeNames) != nil {
		//Add attribute names
		attrsNames := context.GetInput(ivAttributeNames).([]interface{})
		attrs := make([]*string, len(attrsNames))
		for i, v := range attrsNames {
			attrInfo := v.(map[string]interface{})
			attrs[i] = aws.String(attrInfo["Name"].(string))
		}
		receiveMessageInput.AttributeNames = attrs
	}

	if context.GetInput(ivMessageAttributeNames) != nil {
		//Add message attribute names
		attrsNames := context.GetInput(ivMessageAttributeNames).([]interface{})
		attrs := make([]*string, len(attrsNames))
		for i, v := range attrsNames {
			attrInfo := v.(map[string]interface{})
			attrs[i] = aws.String(attrInfo["Name"].(string))
		}
		receiveMessageInput.MessageAttributeNames = attrs
	}

	maxNumberOfMessages := context.GetInput(ivMaxNumberOfMessages)
	if maxNumberOfMessages != nil {
		receiveMessageInput.MaxNumberOfMessages = aws.Int64(int64(maxNumberOfMessages.(int)))
	}

	visibilityTimeout := context.GetInput(ivVisibilityTimeout)
	if visibilityTimeout != nil {
		receiveMessageInput.VisibilityTimeout = aws.Int64(int64(visibilityTimeout.(int)))
	}

	waitTimeSeconds := context.GetInput(ivWaitTimeSeconds)
	if waitTimeSeconds != nil {
		receiveMessageInput.WaitTimeSeconds = aws.Int64(int64(waitTimeSeconds.(int)))
	}

	//Receive message from SQS
	response, err1 := sqsSvc.ReceiveMessage(receiveMessageInput)
	if err1 != nil {
		return false, activity.NewError(fmt.Sprintf("Failed to receive message from SQS due to error:%s", err1.Error()), "SQS-RECEIVEMESSAGE-4004", nil)
	}

	deleteMsgs := context.GetInput(ivDeleteMessage).(bool)

	//Set Message details in the output
	msgs := make([]map[string]interface{}, len(response.Messages))
	if len(response.Messages) > 0 {
		for i, msg := range response.Messages {
			if deleteMsgs {
				deleteMsgInput := &sqs.DeleteMessageInput{}
				deleteMsgInput.SetQueueUrl(context.GetInput(ivQueueUrl).(string))
				deleteMsgInput.SetReceiptHandle(*msg.ReceiptHandle)
				_, err := sqsSvc.DeleteMessage(deleteMsgInput)
				if err != nil {
					return false, activity.NewError(fmt.Sprintf("Failed to delete received message from SQS due to error:%s", err.Error()), "SQS-RECEIVEMESSAGE-4005", nil)
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
	output := &data.ComplexObject{Metadata: "", Value: msgs}
	context.SetOutput(ovMessage, output)
	return true, nil
}
```

### activity_test.go
And, yes, the unit tests 😄 
```go
package sqsreceivemessage

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
	_, err := act.Eval(tc)
	assert.Nil(t, err)

}
```