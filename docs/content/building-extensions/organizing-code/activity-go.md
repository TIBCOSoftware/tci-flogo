---
date: 2016-04-09T16:50:16+02:00
title: Activity Runtime
weight: 55
---

Every extension must write the runtime code in Go (`activity.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`activity_test.go`) for your extension. The code here give you an overview of what files are structured like, but for samples you should really check out the samples section!

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