---
date: 2016-04-09T16:50:16+02:00
title: Using TypeScript for your UI
weight: 50
---

## Using TypeScript for your UI

As laid out in the [Code organization](https://github.com/TIBCOSoftware/tci/wiki/Code-organization), you can use TypeScript to create a much richer UI. There are two files that you need to have to display a nice looking interface

### activity.module.ts
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SampleActivityUIContributionHandler} from "./activity";
import { WiServiceContribution } from "wi-studio/app/contrib/wi-contrib";


@NgModule({
  imports: [
  	CommonModule,
  	HttpModule,
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: SampleActivityUIContributionHandler
     }
  ]
})

export default class SampleActivityModule {

}
```

### activity.ts
```typescript
import {Observable} from "rxjs/Observable";
import {Injectable, Injector, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {
    WiContrib,
    WiServiceHandlerContribution,
    IValidationResult,
    ValidationResult,
    IFieldDefinition
    IActivityContribution,
    ActionResult,
    IActionResult
} from "wi-studio/app/contrib/wi-contrib";

@WiContrib({})
@Injectable()
export class SampleActivityUIContributionHandler extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector) {
        super(injector);
    }

   /**
	* Value for the field
    * Arguments:
    *        fieldName - Name of the field for which value should be returned 
    *        context   - Activity model(activity.json) with latest values
    * Returns:
    *       Observable<any> - In cases where return value depends on external services (e.g. HTTP), return Observable 
    *       any             - Primitive value or Array of primitive values
    */
    
    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        return null;
    }
 
   /** 
    * Validate the field value and/or update visual appearance of the field. 
    * Arguments:
    *        fieldName - Name of the field for which value should be returned 
    *        context   - Activity model(activity.json) with latest values
    * Returns:
    *       Observable<IValidationResult> - In cases where validation depends on external services (e.g. HTTP), return Observable 
    *       IValidationResult             - Result of validation
    */
    validate = (fieldName: string, context: IActivityContribution): Observable<IValidationResult> | IValidationResult => {
       return null;
    }
}
```