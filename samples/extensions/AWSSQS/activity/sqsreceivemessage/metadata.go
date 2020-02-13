package sqsreceivemessage

import (
	"github.com/project-flogo/core/data/coerce"
)

// Input struct for activity input
type Settings struct {
	SQSConnection       	string     			   `md:"sqsConnection"`
	QueueURL            	string                 `md:"queueUrl"`
	DeleteMessage         	bool                   `md:"deleteMessage"`
	MaxNumberOfMessages     int                    `md:"MaxNumberOfMessages"`
	VisibilityTimeout       int                    `md:"VisibilityTimeout"`
	WaitTimeSeconds         int                    `md:"WaitTimeSeconds"`
}

type Input struct {
	MessageAttributeNames   []interface{} 		   `md:"MessageAttributeNames"`
	AttributeNames      	[]interface{} 		   `md:"AttributeNames"`
}

// ToMap conversion
func (i *Input) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"MessageAttributeNames": 		i.MessageAttributeNames,
		"AttributeNames":            	i.AttributeNames,
	}
}

// FromMap conversion
func (i *Input) FromMap(values map[string]interface{}) error {
	var err error

	i.MessageAttributeNames, err = coerce.ToArray(values["MessageAttributeNames"])
	if err != nil {
		return err
	}

	i.AttributeNames, err = coerce.ToArray(values["AttributeNames"])
	if err != nil {
		return err
	}

	return nil
}

// Output struct for activity output
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
