---
date: 2016-04-09T16:50:16+02:00
title: activity.ts
weight: 56
---

The activity.ts file handles the validation and actions for the fields described in the model. For example it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields. This part is optional and you can rely on the out of the box UI as well! The activity.module.ts makes sure that Flogo knows about your extension and injects the validation rules into it. This isn't the full code, so if you want to see a sample check out the samples section!

## activity.ts
```typescript
/**
 * Imports
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

/**
 * Main
 */
@WiContrib({})
@Injectable()
export class IFTTTActivityContribution extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector, private http: Http) {
        super(injector, http);
    }

    /**
     * The value object allows you to specify what types of values you can pick for a certain field
     */
    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        /**
         * For the field iftttConnection the only allowed types are connections that
         * are created as an iftttConnector (the connector category as specified in the 
         * connector.json must match what we specify here)
         */
        if (fieldName === "iftttConnection") {
            return Observable.create(observer => {
                let connectionRefs = [];
                /**
                 * The category is IFTTT
                 */
                WiContributionUtils.getConnections(this.http, "IFTTT").subscribe((data: IConnectorContribution[]) => {
                    data.forEach(connection => {
                        /**
                         * Create a list with all IFTTT connectors that have been created by the user 
                         */
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
        }
        return null;
    }

    /**
     * The validate object can be used to validate the input of certain fields
     */
    validate = (fieldName: string, context: IActivityContribution): Observable<IValidationResult> | IValidationResult => {
        /**
         * For the field iftttConnection check that the connection has been set, otherwise
         * display the errormessage
         */
        if (fieldName === "iftttConnection") {
            let connection: IFieldDefinition = context.getField("iftttConnection")
            if (connection.value === null) {
                return ValidationResult.newValidationResult().setError("IFTTT-1000", "IFTTT Connection must be configured");
            }
        }
        return null;
    }
}
```

## activity.module.ts
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IFTTTActivityContribution} from "./activity";
import { WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: IFTTTActivityContribution
     }
  ]
})

export default class IFTTTActivityModule {

}
```