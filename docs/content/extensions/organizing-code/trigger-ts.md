---
date: 2016-04-09T16:50:16+02:00
title: trigger.ts
weight: 58
---

The trigger.ts file handles the validation and actions for the fields described in the model. For example it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. This part is optional and you can rely on the out of the box UI as well! The trigger.module.ts makes sure that Flogo knows about your extension and injects the validation rules into it. This isn't the full code, so if you want to see a sample check out the samples section!

## trigger.ts
```typescript

import {Injectable, Injector} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {
    WiContrib,
    WiServiceHandlerContribution,
    IValidationResult,
    ValidationResult,
    IContributionTypes,
    ActionResult,
    IActionResult,
    WiContribModelService,
    WiContributionUtils,
    IConnectorContribution
} from "wi-studio/app/contrib/wi-contrib";

@WiContrib({})
@Injectable()
export class myTriggerHandler extends WiServiceHandlerContribution {

    constructor(private injector: Injector, private http: Http) {
                    super(injector, http);
                }

    value = (fieldName: string, context: IContributionTypes): Observable<any> | any => {
        
        switch(fieldName) {
            case "Connection Name":
                return Observable.create(observer => {
                    let connectionRefs = [];
                    WiContributionUtils.getConnections(this.http, "CONNECTION_TYPE").subscribe((data: IConnectorContribution[]) => {
                        data.forEach(connection => {
                            if ((<any>connection).isValid) {
                                for(let i=0; i < connection.settings.length; i++) {
                                    if (connection.settings[i].name === "name") {
                                        connectionRefs.push({
                                            "unique_id": WiContributionUtils.getUniqueId(connection),
                                            "name": connection.settings[i].value
                                        });
                                        break;
                                    }
                                }
                            }
                        });
                        observer.next(connectionRefs);
                    });
                });
            default: 
                return null;
        }
            
    }

    validate = (fieldName: string, context: IContributionTypes): Observable<IValidationResult> | IValidationResult => {
        return Observable.create(observer => {
            let vresult: IValidationResult = ValidationResult.newValidationResult();
            observer.next(vresult);
        });
    }

    action = (actionId: string, context: IContributionTypes): Observable<IActionResult> | IActionResult => {
        return Observable.create(observer => {
            let aresult: IActionResult = ActionResult.newActionResult();
            observer.next(aresult);
        });
    }
}


```