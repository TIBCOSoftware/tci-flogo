package sqsreceivemessage
 
import (
    "github.com/TIBCOSoftware/flogo-lib/core/activity"
    "github.com/TIBCOSoftware/flogo-lib/logger"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/credentials"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/sqs"
    "github.com/TIBCOSoftware/flogo-lib/core/data"
)
 
const (
    ivConnection             = "sqsConnection"
    ivQueueUrl               = "queueUrl"
    ivMessageAttributeNames  = "MessageAttributeNames"
    ivAttributeNames         = "AttributeNames"
    ivMaxNumberOfMessages    = "MaxNumberOfMessages"
    ivVisibilityTimeout      = "VisibilityTimeout"
    ivWaitTimeSeconds        = "WaitTimeSeconds"
    ovMessage                = "Message"
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
    session, err := session.NewSession(aws.NewConfig().WithRegion(connectionInfo["region"].(string)).WithCredentials(credentials.NewStaticCredentials(connectionInfo["accessKeyId"].(string), connectionInfo["secreteAccessKey"].(string), "")))
    if err != nil {
      return false, activity.NewError(fmt.Sprintf("Failed to connect to AWS due to error:%s. Check credentials configured in the connection:%s.",err.Error(),connectionInfo["name"].(string)), "SQS-RECEIVEMESSAGE-4003", nil)
    }
    //Create SQS service instance
    sqsSvc := sqs.New(session)
    receiveMessageInput := &sqs.ReceiveMessageInput{}
    receiveMessageInput.QueueUrl = aws.String(context.GetInput(ivQueueUrl).(string))
     
    if context.GetInput(ivAttributeNames) != nil {
      //Add attribute names
      attrs := make([]string, len(context.GetInput(ivAttributeNames)))
      for i, v := range context.GetInput(ivAttributeNames).([]interface{}) {
        attrs[i] = aws.String(v.(string))
      }
      receiveMessageInput.AttributeNames = attrs
    }
   
    if context.GetInput(ivMessageAttributeNames) != nil {
     //Add message attribute names
      attrs := make([]string, len(context.GetInput(ivMessageAttributeNames)))
      for i, v := range context.GetInput(ivMessageAttributeNames).([]interface{}) {
        attrs[i] = aws.String(v.(string))
      }
      receiveMessageInput.MessageAttributeNames = attrs
    }
 
    maxNumberOfMessages := context.GetInput(ivMaxNumberOfMessages)
    if maxNumberOfMessages != nil {
      receiveMessageInput.MaxNumberOfMessages = aws.Int64(maxNumberOfMessages.(int64))
    }
     
    visibilityTimeout := context.GetInput(ivVisibilityTimeout)
    if visibilityTimeout != nil {
      receiveMessageInput.VisibilityTimeout = aws.Int64(visibilityTimeout.(int64))
    }
 
 
    waitTimeSeconds := context.GetInput(ivWaitTimeSeconds)
    if waitTimeSeconds != nil {
      receiveMessageInput.WaitTimeSeconds = aws.Int64(waitTimeSeconds.(int64))
    }
 
    //Receive message from SQS
    response, err1 := sqsSvc.ReceiveMessage(receiveMessageInput)
    if err1 != nil {
       return false, activity.NewError(fmt.Sprintf("Failed to receive message from SQS due to error:%s",err1.Error()), "SQS-RECEIVEMESSAGE-4004", nil)
    }
 
    //Set Message details in the output
    msgs := make([]map[string]interface{}, len(response.Messages))
    if len(response.Messages) > 0 {
      for i, msg := range response.Messages {
       //read attributes
       if len(msg.Attributes) > 0 {
         msgs[i]["Attribute"] = make(map[string]string,len(msg.Attributes) )
         attrs := msgs[i]["Attribute"].(map[string]string)
         for k, v := range msg.Attributes {
          attrs[k] = *v
         }
       }
       //read message attributes
       if len(msg.MessageAttributes) > 0 {
         msgs[i]["MessageAttributes"] = make(map[string]string,len(msg.MessageAttributes) )
         attrs := msgs[i]["MessageAttributes"].(map[string]string)
         for k, v := range msg.MessageAttributes {
          attrs[k] = *v.StringValue
         }
       }
       msgs[i]["Body"] = *msg.Body
       msgs[i]["MD5OfBody"] = *msg.MD5OfBody
       msgs[i]["MD5OfMessageAttributes"] = *msg.MD5OfMessageAttributes
       msgs[i]["MessageId"] = *msg.MessageId
       msgs[i]["ReceiptHandle"] = *msg.ReceiptHandle
     }
    }
    output := &data.ComplexObject{Metadata:"", Value: msgs}
    context.SetOutput(ovMessage,output)   
    return true, nil
}