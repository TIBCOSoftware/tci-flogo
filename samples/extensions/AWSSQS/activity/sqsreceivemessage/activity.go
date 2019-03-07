/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
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
	activityLog.Info("Executing SQS Receive Message activity")

	if context.GetInput(ivQueueUrl) == nil {
		return false, activity.NewError("SQS Queue URL is not configured", "SQS-RECEIVEMESSAGE-4002", nil)
	}

	//Read connection details
	connectionInfo, _ := data.CoerceToObject(context.GetInput(ivConnection))

	if connectionInfo == nil {
		return false, activity.NewError("SQS connection is not configured", "SQS-RECEIVEMESSAGE-4001", nil)
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
	receiveMessageInput := &sqs.ReceiveMessageInput{}
	receiveMessageInput.QueueUrl = aws.String(context.GetInput(ivQueueUrl).(string))

	attrsNames, _ := context.GetInput(ivAttributeNames).([]interface{})
	if attrsNames != nil && len(attrsNames) > 0 {
		//Add attribute names
		attrs := make([]*string, len(attrsNames))
		for i, v := range attrsNames {
			attrInfo, _ := data.CoerceToObject(v)
			if attrInfo != nil && attrInfo["Name"] != nil {
				attrs[i] = aws.String(attrInfo["Name"].(string))
			}
		}
		receiveMessageInput.AttributeNames = attrs
	}

	attrsNames, _ = context.GetInput(ivMessageAttributeNames).([]interface{})
	if attrsNames != nil && len(attrsNames) > 0 {
		attrs := make([]*string, len(attrsNames))
		for i, v := range attrsNames {
			attrInfo, _ := data.CoerceToObject(v)
			if attrInfo != nil && attrInfo["Name"] != nil {
				attrs[i] = aws.String(attrInfo["Name"].(string))
			}
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
