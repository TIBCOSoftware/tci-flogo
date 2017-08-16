import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { Injectable, Injector, Inject } from "@angular/core";
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
export class RecvMsgActivityContribution extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector, private http: Http) {
        super(injector, http);
    }

    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        if (fieldName === "sqsConnection") {
            //Connector Type must match with the name defined in connector.json
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
                return ValidationResult.newValidationResult().setError("AWS-RECV-MSG-1000", "SQS Connection must be configured");
            }
        } else if (fieldName === "queueUrl") {
            let queueUrl: IFieldDefinition = context.getField("queueUrl")
            if (queueUrl.value === null) {
                return ValidationResult.newValidationResult().setError("AWS-RECV-MSG-1001", "Queue URL must be configured");
            }
        }
        return null;
    }
}