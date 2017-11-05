---
date: 2016-04-09T16:50:16+02:00
title: connector.ts
weight: 53
---

The connector.ts file handles the validation and actions for the fields described in the model. For example it validates that values have been entered in the textboxes or what to do when you click _connect_. The connector.module.ts makes sure that Web Integrator knows about your extension and injects the validation rules into it. This isn't the full code, so if you want to see a sample check out the samples section!

## connector.ts
```typescript
/**
 * Imports
 */
import { Injectable } from "@angular/core";
import { WiContrib, WiServiceHandlerContribution, AUTHENTICATION_TYPE } from "wi-studio/app/contrib/wi-contrib";
import { IConnectorContribution, IFieldDefinition, IActionResult, ActionResult } from "wi-studio/common/models/contrib";
import { Observable } from "rxjs/Observable";
import { IValidationResult, ValidationResult, ValidationError } from "wi-studio/common/models/validation";

/**
 * Main
 */
@WiContrib({})
@Injectable()
export class IFTTTConnectorContribution extends WiServiceHandlerContribution {
    constructor() {
        super();
    }

    value = (fieldName: string, context: IConnectorContribution): Observable<any> | any => {
        return null;
    }

    /**
     * Validation method that is triggered when an action occurs
     */
    validate = (name: string, context: IConnectorContribution): Observable<IValidationResult> | IValidationResult => {
        /**
         * This is the validation which is triggered to see whether the Connect button can be
         * enabled or not. In order for it to be enabled there need to be values entered for
         * both the webhookKey and eventName fields 
         */
        if (name === "Connect") {
            /**
             * These are the two fields that need to be checked whether they're filled in or not
             */
            let webhookKey: IFieldDefinition;
            let eventName: IFieldDefinition;

            for (let configuration of context.settings) {
                if (configuration.name === "webhookKey") {
                    webhookKey = configuration
                } else if (configuration.name === "eventName") {
                    eventName = configuration
                }
            }

            /**
             * If both the webhookKey and the eventName have a value enable the connect button
             * otherwise keep it disabled
             */
            if (webhookKey.value && eventName.value) {
                return ValidationResult.newValidationResult().setReadOnly(false)
            } else {
                return ValidationResult.newValidationResult().setReadOnly(true)
            }
        }
        return null;
    }

    /**
     * Action method that is triggered when an action occurs (e.g. a button is clicked)
     */
    action = (actionName: string, context: IConnectorContribution): Observable<IActionResult> | IActionResult => {
        /**
         * This part of the code handles the click of the Connect button. As all the details are
         * already in the form, the only thing that needs to happen is to save the data
         */
        if (actionName == "Connect") {
            return Observable.create(observer => {
                /**
                 * These are the two fields that need to be checked whether they're filled in or not
                 */
                let webhookKey: IFieldDefinition;
                let eventName: IFieldDefinition;

                for (let configuration of context.settings) {
                    if (configuration.name === "webhookKey") {
                        webhookKey = configuration
                    } else if (configuration.name === "eventName") {
                        eventName = configuration
                    }
                }

                /**
                 * Set the action result to save the configuration data
                 */
                let actionResult = {
                    context: context,
                    authType: AUTHENTICATION_TYPE.BASIC,
                    authData: {}
                }

                /**
                 * Call the observer and tell it the validation was sucessful and the data should be saved
                 */
                observer.next(ActionResult.newActionResult().setSuccess(true).setResult(actionResult));
            });
        }
        return null;
    }
}
```

## connector.module.ts
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {IFTTTConnectorContribution} from "./connector";
import {WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";

@NgModule({
  imports: [
  	CommonModule,
  	HttpModule,
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: IFTTTConnectorContribution
     }
  ]
})

export default class IFTTTConnectorModule {

}
```