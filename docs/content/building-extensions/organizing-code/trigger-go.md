
---
date: 2016-04-09T16:50:16+02:00
title: trigger.go
weight: 59
---

Every extension must write the runtime code in Go (`trigger.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`trigger_test.go`) for your extension. The code here give you an overview of what files are structured like, but for samples you should really check out the samples section!

**trigger.go**
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