/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import { Observable } from "rxjs/Observable";
import { Injectable, Injector, Inject } from "@angular/core";
import { Http } from "@angular/http";
import {
    WiContrib,
    WiServiceHandlerContribution,
    IValidationResult,
    ValidationResult,
    IFieldDefinition,
    IActivityContribution,
    IConnectorContribution,
    WiContributionUtils
} from "wi-studio/app/contrib/wi-contrib";
import * as AWS from "aws-sdk";

@WiContrib({})
@Injectable()
export class SendMsgActivityContribution extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector, private http: Http) {
        super(injector, http);
    }

    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        if (fieldName === "sqsConnection") {
            //Connector Type must match with the category defined in connector.json
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
        } else if (fieldName === "MessageAttributes") {
            let msgAttrNames: IFieldDefinition = context.getField("MessageAttributeNames");
            if (msgAttrNames.value) {
                // Read message attrbutes and construct JSON schema on the fly for the activity input
                var jsonSchema = {};
                // Convert string value into JSON object
                let data = JSON.parse(msgAttrNames.value);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Type === "String") {
                        jsonSchema[data[i].Name] = "abc";
                    } else if (data[i].Type === "Number") {
                        jsonSchema[data[i].Name] = 0;
                    }
                }
                return JSON.stringify(jsonSchema);
            }
            return "{}";
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
                    }
                );
            }
        }
        return null;
    }

    validate = (fieldName: string, context: IActivityContribution): Observable<IValidationResult> | IValidationResult => {
        if (fieldName === "sqsConnection") {
            let connection: IFieldDefinition = context.getField("sqsConnection")
            if (connection.value === null) {
                return ValidationResult.newValidationResult().setError("AWS-SEND-MSG-1000", "SQS Connection must be configured");
            }
        } else if (fieldName === "queueUrl") {
            let queueUrl: IFieldDefinition = context.getField("queueUrl")
            if (queueUrl.value === null) {
                return ValidationResult.newValidationResult().setError("AWS-SEND-MSG-1001", "Queue URL must be configured");
            }
        }
        return null;
    }
}
