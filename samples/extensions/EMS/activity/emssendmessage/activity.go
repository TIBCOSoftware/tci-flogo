package emssendmessage

import (
	conn "github.com/TIBCOSoftware/tci-flogo/samples/extensions/EMS/connector/ems"
	"github.com/mmussett/ems"
	"github.com/project-flogo/core/activity"
	"github.com/project-flogo/core/data/coerce"
	"github.com/project-flogo/core/data/metadata"
	"github.com/project-flogo/core/support/log"
)

func init() {
	_ = activity.Register(&Activity{}, New)
}

var activityLogger = log.ChildLogger(log.RootLogger(), "ems.activity.sendmessage")

var activityMd = activity.ToMetadata(&Settings{}, &Input{})

func New(ctx activity.InitContext) (activity.Activity, error) {
	s := &Settings{}
	err := metadata.MapToStruct(ctx.Settings(), s, true)
	if err != nil {
		return nil, err
	}

	cm, err := coerce.ToConnection(s.ConnectionRef)
	if err != nil {
		return nil, err
	}

	c, ok := cm.GetConnection().(ems.IClient)
	if !ok {
		activityLogger.Error(conn.ErrorInvalidConnection.Error())
		return nil, conn.ErrorInvalidConnection
	}
	act := &Activity{settings: s, client: c}
	return act, nil
}

type Activity struct {
	settings *Settings
	client   ems.IClient
}

func (a *Activity) Metadata() *activity.Metadata {
	return activityMd
}

func (a *Activity) Eval(ctx activity.Context) (bool, error) {

	input := &Input{}
	err := ctx.GetInputObject(input)
	if err != nil {
		return false, err
	}

	if input.Message.Destination == "" {
		activityLogger.Error(conn.ErrorInvalidEmptyDestination.Error())
		return false, conn.ErrorInvalidEmptyDestination
	}

	err = a.client.Send(input.Message.Destination, a.settings.DestinationType, input.Message.Content, input.Message.DeliveryDelay, a.settings.DeliveryMode, input.Message.Expiration)
	if err != nil {
		activityLogger.Errorf("Failed to send message due to error - %s", err.Error())
		return false, err
	}
	activityLogger.Debugf("Message successfully sent on %s destination [%s] by activity [%s] in flow [%s]", a.settings.DestinationType,input.Message.Destination, ctx.Name(), ctx.ActivityHost().Name())

	return true, nil
}
