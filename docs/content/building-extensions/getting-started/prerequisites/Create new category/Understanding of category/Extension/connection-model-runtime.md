---
date: 2016-04-09T16:50:16+02:00
title: Connection Model and Runtime
weight: 2
---

## Model
The `descriptor.json` describes the model, the metadata of the connector's connection. It describes which fields are displayed and what kind of actions are supported in the connector UI. The below code explains which fields are in the JSON document as well as what kind of values are allowed. For more samples, check out the samples section!
```json
{
  "name": "tibco-sqs",
  "title": "AWS SQS Connector",
  "author": "TIBCO Software Inc.",
  "type": "flogo:connector",
  "version": "1.0.0",
  "display": {
    "description": "This is Amazon SQS connector",
    "category": "AWSSQS",
    "visible": true,
    "smallIcon": "sqs.png",
    "connectionsupport": true
  },
  "ref": "github.com/TIBCOSoftware/tci-flogo/samples/extensions/AWSSQS/connector/sqs",
  "keyfield": "name",
  "settings": [
    {
      "name": "name",
      "type": "string",
      "required": true,
      "display": {
        "name": "Connection Name",
        "description": "Name of the connection"
      }
    },
    {
      "name": "description",
      "type": "string",
      "display": {
        "name": "Description",
        "description": "Connection description"
      }
    },
    {
      "name": "accessKeyId",
      "type": "string",
      "required": true,
      "display": {
        "name": "Access Key ID",
        "description": "AWS Access key ID for the user",
        "type": "password"
      }
    },
    {
      "name": "secretAccessKey",
      "type": "string",
      "required": true,
      "display": {
        "name": "Secret Access Key",
        "description": "AWS Secret Access Key for the user",
        "type": "password"
      }
    },
    {
      "name": "region",
      "type": "string",
      "required": true,
      "display": {
        "name": "Region",
        "description": "Name of the region where SQS service is running"
      }
    },
    {
      "name": "assumeRole",
      "type": "boolean",
      "required" : true,
      "display": {
        "name": "Use Assume Role",
        "description": "Use for AWS Assume role, default is false"
      },
      "value":false
    },
    {
      "name": "roleArn",
      "type": "string",
      "required" : true,
      "display": {
        "name": "Role ARN",
        "description": "The Amazon Resource Name (ARN) of the role to assume",
        "appPropertySupport": true
      }
    },
    {
      "name": "roleSessionName",
      "type": "string",
      "required" : true,
      "display": {
        "name": "Role Session Name",
        "description": "An identifier for the assumed role session",
        "appPropertySupport": true
      }
    },
    {
      "name": "externalId",
      "type": "string",
      "required" : false,
      "display": {
        "name": "External ID",
        "description": "A unique identifier that might be required when you assume a role in another account",
        "appPropertySupport": true
      }
    },
    {
      "name": "expirationDuration",
      "type": "integer",
      "required" : true,
      "display": {
        "name": "Expiration Duration(secs) ",
        "description": "The duration, in seconds, of the role session. The value can range from 900 seconds (15 minutes) up to the maximum session duration setting for the role",
        "appPropertySupport": true
      },
      "value": 900
    }
  ],
  "actions": [
    {
      "name": "Connect",
      "display": {
        "readonly": true
      }
    }
  ]
}

```
## Validation
When creating the `descriptor.json` file for connection, there are a few validation rules that you need take into account:

* **name**: The name always start with "tibco-" and should only contain alphanumeric chararcters and underscores
* **title**: The title of your connector (which also shows up on your activity) should only contain alphanumeric chararcters and spaces
* **version**: The version of your activity follows the semver notation (x.y.z), with numeric characters separated by dots
* **type**: The type must always be **flogo:connector**
* **ref**: The ref field must be in the form of `<category>/connector/<connectorName>` and the category and connector name must be the exact same case as the category and name specified above
* **type** _under inputs_: The [type](../display-settings) can be either one of the types in the [Types](../display-settings/#types) section if it is part of the input or the [Special types](../display-settings/#special-types) if it is part of the display section.
* **actions**: Each action will be rendered as a button on the screen and should be handled by the code in [connector.ts](../connector-ts),  in [connector.ts](../connector-ts) where we handle field

## Runtime

For connection runtime, we should care about 2 interfaces.  
1. Connection Factory [Here](https://github.com/project-flogo/core/blob/master/support/connection/manager.go#L15)
2. Connection Manager [Here](https://github.com/project-flogo/core/blob/master/support/connection/manager.go#L7)

* Connection must be registered into engine by using `connection.RegisterManagerFactory(factory)` in `init()` method
* `connection.Manager.GetConnection` would return real connection instance to trigger/activity where it use/refer to this connection.
Exmaple:
```go
package sqs

import (
	"time"

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
		logCache.Infof("Enabled Assume Role for connection [%s]", k.config.Name)
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
## UI Contribution

We are using typescript as UI contribution code. 

The `connector.ts` file handles the fields dynamic value, fields validation and actions for the fields described in the model. For example it validates that values have been entered in the text boxes when you click _connect_.
The `connector.module.ts` makes sure that Flogo knows about your extension and injects the validation rules into it. This isn't the full code, so if you want to see a sample check out the samples section!

There are 3 more function in `connector.ts`
* *value* Setting field's value, the value can be set hardcoded value or get value from network in ts, such as: Showing topic name where topic name get from AWS SQS.
* *Validate* Show validation error in UI or set ready only or visibility base on field relationship. For this example, It shows `roleArn` field only when `assumeRole` been enabled.
* *Action*:  The action field name defined in model(descriptor.json).

```typescript
/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
/// <reference types="aws-sdk" />
import * as AWS from "aws-sdk";
import {Injectable} from "@angular/core";
import {AUTHENTICATION_TYPE, WiContrib, WiServiceHandlerContribution} from "wi-studio/app/contrib/wi-contrib";
import {ActionResult, IActionResult, IConnectorContribution, IFieldDefinition} from "wi-studio/common/models/contrib";
import {Observable} from "rxjs/Observable";
import {IValidationResult, ValidationError, ValidationResult} from "wi-studio/common/models/validation";

@WiContrib({})
@Injectable()
export class TibcoSQSConnectorContribution extends WiServiceHandlerContribution {
    constructor() {
        super();
    }


    value = (fieldName: string, context: IConnectorContribution): Observable<any> | any => {
        return null;
    }

    validate = (name: string, context: IConnectorContribution): Observable<IValidationResult> | IValidationResult => {
        if( name === "Connect") {
            let accessKeyId: IFieldDefinition;
            let secretKey: IFieldDefinition;
            let region: IFieldDefinition;

            for (let configuration of context.settings) {
                if( configuration.name === "accessKeyId") {
                    accessKeyId = configuration;
                } else if( configuration.name === "secretAccessKey") {
                    secretKey = configuration;
                } else if( configuration.name === "region") {
                    region = configuration;
                }
            }

            if( accessKeyId.value && secretKey.value && region.value) {
                // Enable Connect button
                return ValidationResult.newValidationResult().setReadOnly(false)
            } else {
                return ValidationResult.newValidationResult().setReadOnly(true)
            }
        }else if (name === "roleArn" || name === "roleSessionName"  || name === "externalId"  || name === "expirationDuration") {
            return Observable.create(observer => {
                let assumeRole = false
                let roleSessionName = ""
                let expirationDuration = 0

                for (let setting of context.settings) {
                    if (setting.name === "assumeRole") {
                        assumeRole = setting.value
                    }else if  (setting.name === "roleSessionName") {
                        roleSessionName = setting.value
                    }else if  (setting.name === "expirationDuration") {
                        expirationDuration = setting.value
                    }
                }

                let result = ValidationResult.newValidationResult()
                if (assumeRole == true) {
                    result.setVisible(true)
                    if (name === "roleSessionName") {
                        if (roleSessionName.length < 2) {
                            result.setError("Role Session Name Error", "Role Session Name must have length greather than or equal to 2");
                        }
                    }else if (name === "expirationDuration") {
                        if (expirationDuration && expirationDuration < 900) {
                            result.setError("Expiration Duration Error", "Expiration Duration must bigger than 900 seconds");
                        }
                    }
                }else {
                    result.setVisible(false)
                }
                observer.next(result);
                observer.complete()
            });
        }
        return null;
    }

    action = (actionName: string, context: IConnectorContribution): Observable<IActionResult> | IActionResult => {
        if( actionName == "Connect") {
            return Observable.create(observer => {
                let vresult = ActionResult.newActionResult();
                let keyId = "", secretKey = "", region = "";
                let useAssumeRole = false
                let roleArn = "", roleSessionName = "", externalId = "";
                let duration = 60 * 60
                for (let i = 0; i < context.settings.length; i++) {
                    if (context.settings[i].name === "accessKeyId") {
                        keyId = context.settings[i].value;
                    }
                    if (context.settings[i].name === "secretAccessKey") {
                        secretKey = context.settings[i].value;
                    }
                    if (context.settings[i].name === "region") {
                        region = context.settings[i].value;
                    }
                    if (context.settings[i].name === "assumeRole") {
                        useAssumeRole = context.settings[i].value;
                    }
                    if (context.settings[i].name === "roleArn") {
                        roleArn = context.settings[i].value;
                    }
                    if (context.settings[i].name === "roleSessionName") {
                        roleSessionName = context.settings[i].value;
                    }
                    if (context.settings[i].name === "externalId") {
                        externalId = context.settings[i].value;
                    }
                    if (context.settings[i].name === "expirationDuration") {
                        duration = context.settings[i].value;
                    }
                }

                let awsCredential = {
                    accessKeyId: keyId,
                    secretAccessKey: secretKey,
                    region: region,
                    sessionToken:""
                };

                if (useAssumeRole == true) {
                    console.log("Assume role")
                    const sts = new AWS.STS(awsCredential);
                    const assumeRoleParam = {
                        RoleArn: roleArn,
                        RoleSessionName: roleSessionName,
                        ExternalId: externalId,
                        DurationSeconds: duration
                    };

                    if (externalId === "") {
                        delete assumeRoleParam.ExternalId
                    }

                    sts.assumeRole(assumeRoleParam, (err, data) => {
                        if (err) {
                            console.log("assume role error occured...........")
                            vresult.setSuccess(false).setResult(new ValidationError("AWS-SQS-1000","Assume Role Error AWS Assume Role failed:" .concat(err.message)));
                            observer.next(vresult);
                            observer.complete();
                        }else {
                            console.log("Assume role call observer next")
                            awsCredential.accessKeyId = data.Credentials.AccessKeyId
                            awsCredential.secretAccessKey = data.Credentials.SecretAccessKey
                            awsCredential.sessionToken = data.Credentials.SessionToken

                            var params = {};
                            let sqs = new AWS.SQS(awsCredential)
                            sqs.listQueues(params, (err, data) => {
                                if (err) {
                                    console.log("error occured...........")
                                    vresult.setSuccess(false).setResult(new ValidationError("AWS-SQS-1000","Failed to connect to SQS service due to error: ".concat(err.message)));
                                }else {
                                    let actionResult = {
                                        context: context,
                                        authType: AUTHENTICATION_TYPE.BASIC,
                                        authData: {}
                                    }
                                    vresult.setSuccess(true).setResult(actionResult);
                                }
                                console.log("call observer next")
                                observer.next(vresult);
                                observer.complete();
                            });
                        }
                    });

                }else {
                    var params = {};
                    let sqs = new AWS.SQS(awsCredential)
                    sqs.listQueues(params, (err, data) => {
                        if (err) {
                            console.log("error occured...........", err)
                            vresult.setSuccess(false).setResult(new ValidationError("AWS-SQS-1000","Failed to connect to SQS service due to error: ".concat(err.message)));
                        }else {
                            let actionResult = {
                                context: context,
                                authType: AUTHENTICATION_TYPE.BASIC,
                                authData: {}
                            }
                            vresult.setSuccess(true).setResult(actionResult);
                        }
                        console.log("call observer next")
                        observer.next(vresult);
                        observer.complete();
                    });
                }
            });
        }
        return null;
    }
}

```

## connector.module.ts
```typescript
/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {TibcoSQSConnectorContribution} from "./connector";
import {WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";

@NgModule({
  imports: [
  	CommonModule,
  	HttpModule,
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: TibcoSQSConnectorContribution
     }
  ]
})

export default class TibcoSQSConnectorModule {

}
```