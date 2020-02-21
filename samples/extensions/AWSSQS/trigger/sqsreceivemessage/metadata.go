package sqsreceivemessage

import (
	"github.com/project-flogo/core/data/coerce"
)


type Settings struct {
	SQSConnection       	string     			   `md:"sqsConnection"`
}

type HandlerSettings struct {
	QueueURL            	string                 `md:"queueUrl"`
	DeleteMessage         	bool                   `md:"deleteMessage"`
	MaxNumberOfMessages     int                    `md:"MaxNumberOfMessages"`
	VisibilityTimeout       int                    `md:"VisibilityTimeout"`
	WaitTimeSeconds         int                    `md:"WaitTimeSeconds"`
	MessageAttributeNames   []interface{} 		   `md:"MessageAttributeNames"`
	AttributeNames      	[]interface{} 		   `md:"AttributeNames"`
}

// Output struct for trigger output
type Output struct {
	Message           	interface{}                 `md:"Message"`
}

// ToMap conversion
func (o *Output) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"Message":              o.Message,
	}
}

// FromMap conversion
func (o *Output) FromMap(values map[string]interface{}) error {

	var err error
	o.Message, err = coerce.ToArray(values["Message"])
	if err != nil {
		return err
	}

	return nil
}
