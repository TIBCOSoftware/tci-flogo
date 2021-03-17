---
date: 2016-04-09T16:50:16+02:00
title: trigger.ts
weight: 58
---

The `trigger.ts` file handles the validation and actions for the fields described in the model. For example it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. This part is optional and you can rely on the out of the box UI as well! The `trigger.module.ts` file makes sure that Flogo knows about your extension and injects the validation rules into it. This isn't the full code, so if you want to see a sample check out the samples section!

## trigger.ts
```typescript
/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { Injectable, Injector, Inject } from "@angular/core";
import * as lodash from "lodash";
import {
    WiContrib,
    ActionResult,
    CreateFlowActionResult,
    ICreateFlowActionContext,
    WiServiceHandlerContribution,
    IValidationResult,
    ValidationResult,
    IFieldDefinition,
    ITriggerContribution,
    WiContribModelService,
    IConnectorContribution,
    IActionResult,
    WiContributionUtils
} from "wi-studio/app/contrib/wi-contrib";
import * as AWS from "aws-sdk";

@WiContrib({})
@Injectable()
export class RecvMsgTriggerContribution extends WiServiceHandlerContribution {

    constructor(private injector: Injector, private http: Http, private contribModelService: WiContribModelService) {
        super(injector, http, contribModelService);
    }

    value = (fieldName: string, context: ITriggerContribution): Observable<any> | any => {
        if (fieldName === "sqsConnection") {
            //Connector Type must match with the name defined in connector.json
            return Observable.create(observer => {
                let connectionRefs = [];
                WiContributionUtils.getConnections(this.http, "AWSSQS").subscribe((data: IConnectorContribution[]) => {
                    data.forEach(connection => {
                        for (let i = 0; i < connection.settings.length; i++) {
                            if (connection.settings[i].name === "name") {
                                connectionRefs.push({
                                    "unique_id": WiContributionUtils.getUniqueId(connection),
                                    "name": connection.settings[i].value
                                });
                                break;
                            }
                        }
                    });
                    observer.next(connectionRefs);
                });
            });
        } else if (fieldName === "Message") {
            var jsonSchema = {};
            jsonSchema["Attributes"] = {};
            jsonSchema["MessageAttributes"] = {};
            let attrNames: IFieldDefinition = context.getField("AttributeNames");
            if (attrNames.value) {
                var attrJsonSchema = {};
                // Convert string value into JSON object
                let data = JSON.parse(attrNames.value);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Type === "String") {
                        attrJsonSchema[data[i].Name] = "abc";
                    } else if (data[i].Type === "Integer") {
                        attrJsonSchema[data[i].Name] = 0;
                    }
                }
                jsonSchema["Attributes"] = attrJsonSchema;
            }

            let msgAttrNames: IFieldDefinition = context.getField("MessageAttributeNames");
            if (msgAttrNames.value) {
                // Read message attrbutes and construct JSON schema on the fly for the activity input
                var msgAttrJsonSchema = {};
                // Convert string value into JSON object
                let data = JSON.parse(msgAttrNames.value);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Type === "String") {
                        msgAttrJsonSchema[data[i].Name] = "abc";
                    } else if (data[i].Type === "Number") {
                        msgAttrJsonSchema[data[i].Name] = 0;
                    }
                }
                jsonSchema["MessageAttributes"] = msgAttrJsonSchema;
            }
            jsonSchema["Body"] = "";
            jsonSchema["MD5OfBody"] = "";
            jsonSchema["MD5OfMessageAttributes"] = "";
            jsonSchema["MessageId"] = "";
            jsonSchema["ReceiptHandle"] = "";
            return "[" + JSON.stringify(jsonSchema) + "]";
        } else if (fieldName === "queueUrl") {
            let connectionField: IFieldDefinition = context.getField("sqsConnection");
            if (connectionField.value) {
                return Observable.create(observer => {
                        //Read connection configuration
                        let queueUrls = [];
                        WiContributionUtils.getConnection(this.http, connectionField.value)
                            .map(data => data)
                            .subscribe(data => {
                                let keyId = "", secretKey = "", region = "";
                                let useAssumeRole = false
                                let roleArn = "", roleSessionName = "", externalId = "";
                                let duration = 60 * 60
                                for (let i = 0; i < data.settings.length; i++) {
                                    if (data.settings[i].name === "accessKeyId") {
                                        keyId = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "secretAccessKey") {
                                        secretKey = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "region") {
                                        region = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "assumeRole") {
                                        useAssumeRole = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "roleArn") {
                                        roleArn = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "roleSessionName") {
                                        roleSessionName = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "externalId") {
                                        externalId = data.settings[i].value;
                                    }
                                    if (data.settings[i].name === "expirationDuration") {
                                        duration = data.settings[i].value;
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
                                            console.log("error occured...........".concat(err.message))
                                            observer.next(queueUrls);
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
                                                    console.log("error occured...........".concat(err.message))
                                                    observer.next(queueUrls);
                                                }else {
                                                    observer.next(data.QueueUrls);
                                                }
                                                observer.complete();
                                            });
                                        }
                                    });
                                }else {
                                    var sqs = new AWS.SQS({
                                        credentials: new AWS.Credentials(keyId, secretKey), region: region
                                    });
                                    var params = {};
                                    sqs.listQueues(params, function (err, data) {
                                        if (err) {
                                            observer.next(queueUrls);
                                        } else {
                                            observer.next(data.QueueUrls);
                                        }
                                    });
                                }
                            });
                        // .subscribe(data => {
                        //     // let accessKeyId: IFieldDefinition;
                        //     // let secreteKey: IFieldDefinition;
                        //     // let region: IFieldDefinition;
                        //     // for (let configuration of data.settings) {
                        //     //     if (configuration.name === "accessKeyId") {
                        //     //         accessKeyId = configuration
                        //     //     } else if (configuration.name === "secretAccessKey") {
                        //     //         secreteKey = configuration
                        //     //     } else if (configuration.name === "region") {
                        //     //         region = configuration
                        //     //     }
                        //     // }
                        //     //
                        //     // var sqs = new AWS.SQS({
                        //     //     credentials: new AWS.Credentials(accessKeyId.value, secreteKey.value), region: region.value
                        //     // });
                        //     // var params = {};
                        //     // sqs.listQueues(params, function (err, data) {
                        //     //     if (err) {
                        //     //         observer.next(queueUrls);
                        //     //     } else {
                        //     //         observer.next(data.QueueUrls);
                        //     //     }
                        //     // });
                        //
                        // });
                    }
                );
            }
        }
        return null;
    }

    validate = (fieldName: string, context: ITriggerContribution): Observable<IValidationResult> | IValidationResult => {
        if (fieldName === "sqsConnection") {
            let connection: IFieldDefinition = context.getField("sqsConnection");
            if (connection.value === null) {
                return ValidationResult.newValidationResult().setError("AWS-RECV-MSG-1000", "SQS Connection must be configured");
            }
        } else if (fieldName === "queueUrl") {
            let queueUrl: IFieldDefinition = context.getField("queueUrl");
            if (queueUrl.value === null) {
                return ValidationResult.newValidationResult().setError("AWS-RECV-MSG-1001", "Queue URL must be configured");
            }
        }
        return null;
    }

    action = (fieldName: string, context: ICreateFlowActionContext): Observable<IActionResult> | IActionResult => {
        let modelService = this.getModelService();
        let result = CreateFlowActionResult.newActionResult();
        if (context.settings && context.settings.length > 0) {
            let connection = <IFieldDefinition>context.getField("sqsConnection");
            if (connection && connection.value) {
                let trigger = modelService.createTriggerElement("AWSSQS/sqsreceivemessage");
                if (trigger && trigger.settings  && trigger.settings.length > 0) {
                    for (let j = 0; j < trigger.settings.length; j++) {
                        if (trigger.settings[j].name === "sqsConnection") {
                            trigger.settings[j].value = connection.value;
                        }
                    }
                }
                let flowModel = modelService.createFlow(context.getFlowName(), context.getFlowDescription());
                result = result.addTriggerFlowMapping(lodash.cloneDeep(trigger), lodash.cloneDeep(flowModel));
            }
        }
        let actionResult = ActionResult.newActionResult().setSuccess(true).setResult(result);
        return actionResult;
    }
}

```