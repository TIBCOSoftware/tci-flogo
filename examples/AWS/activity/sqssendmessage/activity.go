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
