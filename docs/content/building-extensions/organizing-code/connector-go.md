---
date: 2016-04-09T16:50:16+02:00
title: Connector Runtime
weight: 52
---

The `connection.go` is runtime code for contribution. Use `connection.RegisterManagerFactory(factory)` to registy contribution to engine.

Please refer [connection](https://github.com/project-flogo/core/blob/master/support/connection/manager.go) for connection interface. 

```go
package sqs

import (
	"time"

	"github.com/TIBCOSoftware/flogo-lib/logger"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/credentials/stscreds"
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

type sqsConnection struct {
	Name               string `md:"name,required"`
	AccessKey          string `md:"accessKeyId,required"`
	SecretKey          string `md:"secretAccessKey,required"`
	Region             string `md:"region,required"`
	AssumeRole         bool   `md:"assumeRole"`
	RoleArn            string `md:"roleArn"`
	RoleSessionName    string `md:"roleSessionName"`
	ExternalID         string `md:"externalId"`
	ExpirationDuration int    `md:"expirationDuration"`
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
	sqsManager := &SQSConfigManager{}
	var err error
	sqsManager.config, err = getConnectionConfig(settings)
	if err != nil {
		return nil, err
	}
	session := sqsManager.NewSession()
	sqsManager.sqs = sqs.New(session)

	return sqsManager, nil
}

type SQSConfigManager struct {
	config *sqsConnection
	sqs    *sqs.SQS
}

func (k *SQSConfigManager) Type() string {
	return "SQS"
}

func (k *SQSConfigManager) GetConnection() interface{} {
	return k.sqs
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

func (k *SQSConfigManager) NewSession() *session.Session {
	sess := session.Must(session.NewSession(k.GetConfig()))
	if k.config.AssumeRole {
		logger.Infof("Enabled Assume Role for connection [%s]", k.config.Name)
		sess.Config.Credentials = stscreds.NewCredentials(sess, k.config.RoleArn, func(p *stscreds.AssumeRoleProvider) {
			if len(k.config.ExternalID) > 0 {
				p.ExternalID = aws.String(k.config.ExternalID)
			}
			p.RoleSessionName = k.config.RoleSessionName
			p.Duration = time.Duration(k.config.ExpirationDuration) * time.Second
		})
	}
	return sess
}

func (k *SQSConfigManager) GetConfig() *aws.Config {
	conf := &aws.Config{Region: aws.String(k.config.Region)}
	conf.Credentials = credentials.NewStaticCredentials(k.config.AccessKey, k.config.SecretKey, "")
	return conf
}

func getConnectionConfig(settings map[string]interface{}) (*sqsConnection, error) {
	s := &sqsConnection{}
	err := metadata.MapToStruct(settings, s, false)
	if err != nil {
		return nil, err
	}
	return s, nil
}
```