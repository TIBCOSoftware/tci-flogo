package sqssendmessage

import (
	"github.com/project-flogo/core/data/coerce"
)

// Input struct for activity input
type Settings struct {
	SQSConnection string `md:"sqsConnection"`
	QueueURL      string `md:"queueUrl"`
	Delay         int    `md:"DelaySeconds"`
}

type Input struct {
	MessageBody           string                 `md:"MessageBody"`
	MessageAttributeNames []interface{}          `md:"MessageAttributeNames"`
	MessageAttributes     map[string]interface{} `md:"MessageAttributes"`
}

// ToMap conversion
func (i *Input) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"MessageBody":           i.MessageBody,
		"MessageAttributeNames": i.MessageAttributeNames,
		"MessageAttributes":     i.MessageAttributes,
	}
}

// FromMap conversion
func (i *Input) FromMap(values map[string]interface{}) error {
	var err error

	i.MessageBody, err = coerce.ToString(values["MessageBody"])
	if err != nil {
		return err
	}

	i.MessageAttributeNames, err = coerce.ToArray(values["MessageAttributeNames"])
	if err != nil {
		return err
	}

	i.MessageAttributes, err = coerce.ToObject(values["MessageAttributes"])
	if err != nil {
		return err
	}

	return nil
}

// Output struct for activity output
type Output struct {
	MessageId string `md:"MessageId"`
}

// ToMap conversion
func (o *Output) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"MessageId": o.MessageId,
	}
}

// FromMap conversion
func (o *Output) FromMap(values map[string]interface{}) error {

	var err error
	o.MessageId, err = coerce.ToString(values["MessageId"])
	if err != nil {
		return err
	}

	return nil
}
