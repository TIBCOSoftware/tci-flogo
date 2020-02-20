package emsreceivemessage

import (
	"context"

	conn "github.com/TIBCOSoftware/tci-flogo/samples/extensions/EMS/connector/ems"
	"github.com/mmussett/ems"
	"github.com/project-flogo/core/data/coerce"
	"github.com/project-flogo/core/data/metadata"
	"github.com/project-flogo/core/support/log"
	"github.com/project-flogo/core/trigger"
)

var triggerMd = trigger.NewMetadata(&Settings{}, &HandlerSettings{}, &Output{})
var triggerLogger = log.ChildLogger(log.RootLogger(), "ems.trigger.receivemessage")

func init() {
	_ = trigger.Register(&Trigger{}, &Factory{})
}

// Factory is a EMS trigger factory
type Factory struct {
}

// Metadata implements trigger.Factory.Metadata
func (*Factory) Metadata() *trigger.Metadata {
	return triggerMd
}

// New implements trigger.Factory.New
func (*Factory) New(config *trigger.Config) (trigger.Trigger, error) {
	s := &Settings{}
	var err error
	err = metadata.MapToStruct(config.Settings, s, true)
	if err != nil {
		return nil, err
	}

	cm, err := coerce.ToConnection(s.ConnectionRef)
	if err != nil {
		return nil, err
	}

	c, ok := cm.GetConnection().(ems.IClient)
	if !ok {
		triggerLogger.Error(conn.ErrorInvalidConnection.Error())
		return nil, conn.ErrorInvalidConnection
	}

	return &Trigger{client: c, name: config.Id}, nil
}

// Trigger is a kafka trigger
type Trigger struct {
	client      ems.IClient
	emsHandlers map[string]*DestinationHandler
	name        string
}

// Initialize initializes the trigger
func (t *Trigger) Initialize(ctx trigger.InitContext) error {

	var err error
	t.emsHandlers = make(map[string]*DestinationHandler)
	for _, handler := range ctx.GetHandlers() {
		handlerSetting := &HandlerSettings{}
		err := metadata.MapToStruct(handler.Settings(), handlerSetting, true)
		if err != nil {
			return err
		}
		if handlerSetting.Destination == "" {
			return conn.ErrorInvalidEmptyDestination
		}
		emsHandler := &DestinationHandler{}
		emsHandler.settings = handlerSetting
		emsHandler.handler = handler
		emsHandler.shutdown = make(chan bool)
		emsHandler.client = t.client
		emsHandler.triggerName = t.name
		t.emsHandlers[handlerSetting.Destination] = emsHandler
	}

	return err
}

// Start starts the kafka trigger
func (t *Trigger) Start() error {
	for _, handler := range t.emsHandlers {
		go handler.start()
	}
	return nil
}

// Stop implements ext.Trigger.Stop
func (t *Trigger) Stop() error {
	for _, handler := range t.emsHandlers {
		handler.shutdown <- true
	}
	return nil
}

// Handler is a kafka topic handler
type DestinationHandler struct {
	client      ems.IClient
	handler     trigger.Handler
	settings    *HandlerSettings
	shutdown    chan bool
	triggerName string
}

// Start starts the handler
func (h *DestinationHandler) start() {
	for {
		select {
		case <-h.shutdown:
			triggerLogger.Debugf("Stopping receiver for %s destination [%s] for trigger [%s]", h.settings.DestinationType, h.settings.Destination, h.triggerName)
			return
		default:
			msgText, timeout, err := h.client.Receive(h.settings.Destination, h.settings.DestinationType, 0)
			if err == nil {
				if !timeout {
					out := &Output{}
					if h.settings.MessageType == "object" {
						obj, _ := coerce.ToObject(msgText)
						out.Message = MessageData{Content: obj}
					} else if h.settings.MessageType == "string" {
						out.Message = MessageData{Content: msgText}
					}
					triggerLogger.Debugf("Message received for %s destination [%s] by trigger [%s]", h.settings.DestinationType, h.settings.Destination, h.triggerName)
					_, err := h.handler.Handle(context.Background(), out)
					if err != nil {
						triggerLogger.Errorf("Trigger [%s] failed to execute action for destination [%s] due to error - {%v}", h.triggerName, h.settings.Destination, err)
					}
				}
			} else {
				triggerLogger.Errorf("Trigger [%s] failed to receive message for destination [%s] due to error - {%v}", h.triggerName, h.settings.Destination, err)
			}
		}
	}
}
