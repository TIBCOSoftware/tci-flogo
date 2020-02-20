/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import {Observable} from "rxjs/Observable";
import {Inject, Injectable, Injector} from "@angular/core";
import {Http} from "@angular/http";
import {
    IActivityContribution,
    IConnectorContribution,
    IFieldDefinition,
    IValidationResult,
    ValidationResult,
    WiContrib,
    WiContributionUtils,
    WiServiceHandlerContribution
} from "wi-studio/app/contrib/wi-contrib";

@WiContrib({})
@Injectable()
export class SendMsgActivityContribution extends WiServiceHandlerContribution {
    constructor(@Inject(Injector) injector, private http: Http) {
        super(injector, http);
    }

    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        if (fieldName === "emsConnection") {
            //Connector Type must match with the category defined in connector.json
            return Observable.create(observer => {
                let connectionRefs = [];
                WiContributionUtils.getConnections(this.http, "EMS").subscribe((data: IConnectorContribution[]) => {
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
        } else if (fieldName === "message") {
            let messageType: IFieldDefinition = context.getField("messageType");
            if (messageType.value === "string") {
                let stingData = {
                    "destination": "",
                    "expiration": 0,
                    "deliveryDelay": 0,
                    "content": ""
                };
                return JSON.stringify(stingData);
            } else if (messageType.value === "object") {
                let objData = {
                    "destination": "",
                    "expiration": 0,
                    "deliveryDelay": 0,
                    "content": {}
                };
                return JSON.stringify(objData);
            }
        }
        return null;
    }

    validate = (fieldName: string, context: IActivityContribution): Observable<IValidationResult> | IValidationResult => {
        // if (fieldName === "url" || fieldName === "authKey") {
        //     let vresult: IValidationResult = ValidationResult.newValidationResult();
        //     let connection: IFieldDefinition = context.getField("tcmConnection")
        //     if (connection.value && connection.value != "") {
        //         vresult.setVisible(false);
        //     } else {
        //         vresult.setVisible(true);
        //     }
        //     return vresult;
        // }
        return null;
    }
}