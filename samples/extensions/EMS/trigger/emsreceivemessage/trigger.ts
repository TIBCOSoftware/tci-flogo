/*
 * Copyright © 2020. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
import {Observable} from "rxjs/Observable";
import {Inject, Injectable, Injector} from "@angular/core";
import {Http} from "@angular/http";
import * as lodash from "lodash";
import {
    ActionResult,
    CreateFlowActionResult,
    ITriggerContribution,
    IConnectorContribution,
    IFieldDefinition,
    IValidationResult,
    IActionResult,
    ICreateFlowActionContext,
    WiContrib,
    WiContributionUtils,
    WiServiceHandlerContribution
} from "wi-studio/app/contrib/wi-contrib";

@WiContrib({})
@Injectable()
export class ReceiveMsgTriggerContribution extends WiServiceHandlerContribution {
    constructor(@Inject(Injector) injector, private http: Http) {
        super(injector, http);
    }

    value = (fieldName: string, context: ITriggerContribution): Observable<any> | any => {
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
                    "content": ""
                };
                return JSON.stringify(stingData);
            } else if (messageType.value === "object") {
                let objData = {
                    "content": {}
                };
                return JSON.stringify(objData);
            }
        }
        return null;
    }

    validate = (fieldName: string, context: ITriggerContribution): Observable<IValidationResult> | IValidationResult => {
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

    action = (fieldName: string, context: ICreateFlowActionContext): Observable<IActionResult> | IActionResult => {
        let modelService = this.getModelService();
        let result = CreateFlowActionResult.newActionResult();
        if (context.settings && context.settings.length > 0) {
            let connection = <IFieldDefinition>context.getField("emsConnection");
            if (connection && connection.value) {
                let trigger = modelService.createTriggerElement("EMS/tibco-ems-trigger");
                if (trigger && trigger.settings  && trigger.settings.length > 0) {
                    for (let j = 0; j < trigger.settings.length; j++) {
                        if (trigger.settings[j].name === "emsConnection") {
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