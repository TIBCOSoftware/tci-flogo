package emsreceivemessage

import (
	"github.com/project-flogo/core/data/coerce"
)

type Settings struct {
	ConnectionRef string `md:"emsConnection,required"`
}

type HandlerSettings struct {
	Destination     string `md:"destination,required"`
	DestinationType string `md:"destinationType,required"`
	MessageType     string `md:"messageType,required"`
}

type MessageData struct {
	Content interface{} `json:"content"`
}

type Output struct {
	Message MessageData `md:"message"`
}

func (o *Output) ToMap() map[string]interface{} {
	msg, _ := coerce.ToObject(o.Message)
	return map[string]interface{}{
		"message": msg,
	}
}

func (o *Output) FromMap(values map[string]interface{}) error {
	msg, err := coerce.ToObject(values["message"])
	if err != nil {
		return err
	}

	o.Message = MessageData{}
	o.Message.Content, _ = coerce.ToAny(msg["content"])

	return nil
}
