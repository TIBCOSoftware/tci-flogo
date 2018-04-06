/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
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

	if context.GetInput(ivQueueUrl) == nil {
		return false, activity.NewError("SQS Queue URL is not configured", "SQS-SENDMESSAGE-4002", nil)
	}

	if context.GetInput(ivMessageBody) == nil {
		return false, activity.NewError("Message body is not configured", "SQS-SENDMESSAGE-4003", nil)
	}

	//Read connection details
	connectionInfo, _ := data.CoerceToObject(context.GetInput(ivConnection))

	if connectionInfo == nil {
		return false, activity.NewError("SQS connection is not configured", "SQS-SENDMESSAGE-4001", nil)
	}

	var region string
	var accesskey string
	var secreteKey string
	connectionSettings, _ := connectionInfo["settings"].([]interface{})
	if connectionSettings != nil {
		for _, v := range connectionSettings {
			setting, _ := data.CoerceToObject(v)
			if setting != nil {
				if setting["name"] == "accessKeyId" {
					accesskey, _ = data.CoerceToString(setting["value"])
				} else if setting["name"] == "region" {
					region, _ = data.CoerceToString(setting["value"])
				} else if setting["name"] == "secreteAccessKey" {
					secreteKey, _ = data.CoerceToString(setting["value"])
				}
			}
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

	messageAttributes, _ := data.CoerceToComplexObject(context.GetInput(ivMessageAttributes))
	attrsName, _ := context.GetInput(ivMessageAttributeNames).([]interface{})
	if messageAttributes != nil && attrsName != nil {

		//Read mapped values
		if messageAttributes.Value != nil {
			switch messageAttributes.Value.(type) {
			case map[string]interface{}:
				msgAttrs, _ := data.CoerceToObject(messageAttributes.Value)
				if msgAttrs != nil {
					//Read table values
					attrs := make(map[string]*sqs.MessageAttributeValue, len(msgAttrs))
					for _, v := range attrsName {
						attr, _ := data.CoerceToObject(v)
						if attr != nil && attr["Name"] != nil && attr["Type"] != nil {
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
					}
					sendMessageInput.MessageAttributes = attrs
				}
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
