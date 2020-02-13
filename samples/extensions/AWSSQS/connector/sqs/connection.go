package sqs

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sqs"
	"github.com/project-flogo/core/data/metadata"
	"github.com/project-flogo/core/support/connection"
	"github.com/project-flogo/core/support/log"
)

var logCache = log.ChildLogger(log.RootLogger(), "sqs.connection")
var factory = &SQSFactory{}

type SQSFactory struct {
}

type Settings struct {
	Name				string `md:"name,required"`
	AccessKeyId         string `md:"accessKeyId,required"`
	SecreteAccessKey    string `md:"secreteAccessKey,required"`
	Region 				string `md:"region,required"`
}


func (*SQSFactory) Type() string {
	return "SQS"
}

func init() {
	err := connection.RegisterManagerFactory(factory)
	if err != nil {
		panic(err)
	}
}

func (*SQSFactory) NewManager(settings map[string]interface{}) (connection.Manager, error) {
	SQSConn := &SQSConfigManager{
	}

	var err error
	s := &Settings{}
	err = metadata.MapToStruct(settings, s, false)
	if err != nil {
		return nil, err
	}

	session, err := session.NewSession(aws.NewConfig().WithRegion(s.Region).WithCredentials(credentials.NewStaticCredentials(s.AccessKeyId, s.SecreteAccessKey, "")))
	SQSSvc := sqs.New(session)
	SQSConn.session = SQSSvc

	return SQSConn, nil
}

type SQSConfigManager struct {
	session *sqs.SQS
}


func (k *SQSConfigManager) Type() string {
	return "SQS"
}

func (k *SQSConfigManager) GetConnection() interface{} {
	return k.session
}


func (k *SQSConfigManager) ReleaseConnection(connection interface{}) {
}


func (k *SQSConfigManager) Start() error {
	return nil
}

func (k *SQSConfigManager) Stop() error {
	logCache.Info("Cleaning up Connection")
	return nil
}


