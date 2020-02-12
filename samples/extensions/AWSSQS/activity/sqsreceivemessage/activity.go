/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
package sqsreceivemessage

import (
    "errors"
    "fmt"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/service/sqs"
    "github.com/project-flogo/core/activity"
    "github.com/project-flogo/core/data/coerce"
    "github.com/project-flogo/core/data/metadata"
    "github.com/project-flogo/core/support/log"
)

func init() {
    _ = activity.Register(&SQSReceiveMessageActivity{}, New)
}

var activityLog = log.ChildLogger(log.RootLogger(), "aws-activity-sqsreceivemessage")
var activityMd = activity.ToMetadata(&Settings{},&Input{},&Output{})

type SQSReceiveMessageActivity struct {
    settings *Settings
    sqssvc *sqs.SQS
}

func New(ctx activity.InitContext) (activity.Activity, error) {
    s := &Settings{}
    err := metadata.MapToStruct(ctx.Settings(),s,true)

    if err!=nil {
        return nil, err
    }

    cm,err := coerce.ToConnection(s.SQSConnection)

    if err!=nil {
        return nil, err
    }

    c,ok := cm.GetConnection().(*sqs.SQS)
    if !ok {
        activityLog.Error("Connection Error")
        return nil, errors.New("Connection Error")
    }

    act := &SQSReceiveMessageActivity{settings: s, sqssvc: c}
    return act, nil
}

func (a *SQSReceiveMessageActivity) Metadata() *activity.Metadata {
  return activityMd
}


func (a *SQSReceiveMessageActivity) Eval(context activity.Context) (done bool, err error) {

  input := &Input{}

  err = context.GetInputObject(input)
  if err != nil {
    return false, err
  }

  activityLog.Info("Executing SQS Receive Message activity")

  if a.settings.QueueURL == "" {
    return false, activity.NewError("SQS Queue URL is not configured", "SQS-RECEIVEMESSAGE-4002", nil)
  }

  //Read connection details
  sqsSvc := a.sqssvc
  receiveMessageInput := &sqs.ReceiveMessageInput{}
  receiveMessageInput.QueueUrl = aws.String(a.settings.QueueURL)

  attrsNames := input.AttributeNames
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

   attrsNames = input.MessageAttributeNames
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

   maxNumberOfMessages := a.settings.MaxNumberOfMessages
   if maxNumberOfMessages != 0 {
     receiveMessageInput.MaxNumberOfMessages = aws.Int64(int64(maxNumberOfMessages))
   }

   visibilityTimeout := a.settings.VisibilityTimeout
   if visibilityTimeout != 0 {
     receiveMessageInput.VisibilityTimeout = aws.Int64(int64(visibilityTimeout))
   }

   waitTimeSeconds := a.settings.WaitTimeSeconds
   if waitTimeSeconds != 0 {
     receiveMessageInput.WaitTimeSeconds = aws.Int64(int64(waitTimeSeconds))
   }

   //Receive message from SQS
   response, err1 := sqsSvc.ReceiveMessage(receiveMessageInput)
   if err1 != nil {
     return false, activity.NewError(fmt.Sprintf("Failed to receive message from SQS due to error:%s", err1.Error()), "SQS-RECEIVEMESSAGE-4004", nil)
   }

  deleteMsgs := a.settings.DeleteMessage

   //Set Message details in the output
   msgs := make([]map[string]interface{}, len(response.Messages))
   if len(response.Messages) > 0 {
     for i, msg := range response.Messages {
       if deleteMsgs {
         deleteMsgInput := &sqs.DeleteMessageInput{}
         deleteMsgInput.SetQueueUrl(a.settings.QueueURL)
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

  output := &Output{}
  output.Message = msgs
  context.SetOutputObject(output)
  return true, nil
}
