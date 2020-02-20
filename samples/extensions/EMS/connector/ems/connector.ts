/*
 * Copyright © 2020. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import {Injectable} from "@angular/core";
import {AUTHENTICATION_TYPE, WiContrib, WiServiceHandlerContribution} from "wi-studio/app/contrib/wi-contrib";
import {ActionResult, IActionResult, IConnectorContribution, IFieldDefinition} from "wi-studio/common/models/contrib";
import {Observable} from "rxjs/Observable";
import {IValidationResult, ValidationResult} from "wi-studio/common/models/validation";

@WiContrib({})
@Injectable()
export class TibcoEMSConnectorContribution extends WiServiceHandlerContribution {
    constructor() {
        super();
    }


    value = (fieldName: string, context: IConnectorContribution): Observable<any> | any => {
        return null;
    }

    validate = (name: string, context: IConnectorContribution): Observable<IValidationResult> | IValidationResult => {
        if (name === "Save") {
            let url: IFieldDefinition = context.getField("url");
            if (url.value && url.value !== "") {
                // Enable Save button
                return ValidationResult.newValidationResult().setReadOnly(false)
            } else {
                return ValidationResult.newValidationResult().setReadOnly(true)
            }
        }
        return null;
    }

    action = (actionName: string, context: IConnectorContribution): Observable<IActionResult> | IActionResult => {
        if (actionName == "Save") {
            return Observable.create(observer => {
                let actionResult = {
                    context: context,
                    authType: AUTHENTICATION_TYPE.BASIC,
                    authData: {}
                }
                observer.next(ActionResult.newActionResult().setSuccess(true).setResult(actionResult));
            });
        }
        return null;
    }
}