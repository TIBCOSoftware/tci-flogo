package ems

import (
	"errors"

	"github.com/mmussett/ems"
	"github.com/project-flogo/core/data/metadata"
	"github.com/project-flogo/core/support/connection"
	"github.com/project-flogo/core/support/log"
)

var ConnectorLogger = log.ChildLogger(log.RootLogger(), "ems.connection")
var factory = &Factory{}

type Factory struct {
}

var (
	ErrorInvalidConnection       = errors.New("invalid connection object set at runtime")
	ErrorInvalidEmptyDestination = errors.New("invalid empty destination set")
)

type Settings struct {
	Name     string `md:"name,required"`
	URL      string `md:"url,required"`
	UserName string `md:"username"`
	Password string `md:"password"`
}

func (*Factory) Type() string {
	return "EMS"
}

func init() {
	err := connection.RegisterManagerFactory(factory)
	if err != nil {
		panic(err)
	}
}

func (*Factory) NewManager(settings map[string]interface{}) (connection.Manager, error) {

	sharedConn := &ClientManager{
	}
	var err error
	s := &Settings{}

	err = metadata.MapToStruct(settings, s, false)

	if err != nil {
		return nil, err
	}

	opts := ems.NewClientOptions()
	opts.SetServerUrl(s.URL).SetUsername(s.UserName).SetPassword(s.Password)

	client := ems.NewClient(opts)

	sharedConn.client = client
	sharedConn.name = s.Name

	return sharedConn, nil
}

type ClientManager struct {
	name   string
	client ems.IClient
}

func (k *ClientManager) Type() string {
	return "EMS"
}

func (k *ClientManager) GetConnection() interface{} {
	return k.client
}

func (k *ClientManager) ReleaseConnection(connection interface{}) {
}

func (k *ClientManager) Start() error {
	ConnectorLogger.Debugf("Creating connection with TIBCO EMS for - [%s]", k.name)
	err := k.client.Connect()
	if err != nil {
		ConnectorLogger.Errorf("Failed to create connection for [%s] due to error - {%s}", k.name, err.Error())
	}
	return err
}

func (k *ClientManager) Stop() error {
	ConnectorLogger.Debugf("Stopping connection with TIBCO EMS for - [%s]", k.name)
	if k.client != nil {
		_ = k.client.Disconnect()
	}
	return nil
}
