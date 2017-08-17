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
                WiContributionUtils.getConnections(this.http, "AWS").subscribe((data: IConnectorContribution[]) => {
                    data.forEach(connection => {
                        connectionRefs.push({
                            "unique_id": WiContributionUtils.getUniqueId(connection),
                            "name": connection.title
                        });
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
                            let accessKeyId: IFieldDefinition;
                            let secreteKey: IFieldDefinition;
                            let region: IFieldDefinition;

                            for (let configuration of data.settings) {
                                if (configuration.name === "accessKeyId") {
                                    accessKeyId = configuration
                                } else if (configuration.name === "secreteAccessKey") {
                                    secreteKey = configuration
                                } else if (configuration.name === "region") {
                                    region = configuration
                                }
                            }

                            var sqs = new AWS.SQS({
                                credentials: new AWS.Credentials(accessKeyId.value, secreteKey.value), region: region.value
                            });
                            var params = {};
                            sqs.listQueues(params, function (err, data) {
                                if (err) {
                                    observer.next(queueUrls);
                                } else {
                                    observer.next(data.QueueUrls);
                                }
                            });

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