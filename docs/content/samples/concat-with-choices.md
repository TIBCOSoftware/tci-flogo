---
date: 2016-04-09T16:50:16+02:00
title: Simple concat (3)
weight: 30
---

## Adding more options to the UI
In the [other](https://github.com/TIBCOSoftware/tci/wiki/Concat-activity-with-separator) sample, users had to select a separator. In this example we'll show you what to do if you want to let users decide whether they want to use a separator or not and what to do if you don't want to hardcode the separator list in the JSON file. All of this can be solved with simple TypeScript (ts) code! Check the [UI handling](https://github.com/TIBCOSoftware/tci/wiki/UI-handling) section for details on these templates

We need two TypeScript files for our Concat activity. In those files we'll make the separator field visible only when users wants to use it and we'll also construct and return separator list. The new layout of the folder will look something like this

![concat-activity-updated.png](https://github.com/TIBCOSoftware/tci-webintegrator/blob/master/images/concat-activity-updated.png)

### activity.json
```json
{
    "name": "concat",
    "version": "1.0.0",
    "title": "Concat Activity",
    "author": "TIBCO Software Inc.",
    "type": "flogo:activity",
     
    "display": {
       "category": "TIBCO",
       "visible": true,
       "smallIcon": "concat-small-icon.png",
       "description": "This activity returns concatenation of two strings"
    },
 
    "ref": "github.com/TIBCOSoftware/tci/examples/TIBCO/activity/concat",
    "inputs": [
           {
            "name": "firstString",
            "type": "string",
            "required": true
           },
           {
            "name": "secondString",
            "type": "string",
            "required": true
           },
           {
            "name": "useSeparator",
            "type": "boolean",
            "required": true,
            "display": {
               "name": "Use Separator",
               "description": "Use separator for concatenation"
            },
            "value": false
           },
           {
            "name": "separator",
            "type": "string",
            "required": true,
            "display": {
               "name": "Separator",
               "type": "dropdown",
               "selection": "single",
               "description": "Select a separator for concatenation",
               "visible": false
            },
            "allowed":[]
           }
    ],
  
    "outputs": [
           {
            "name": "result",
            "type": "string"
          }
    ]
}
```

### activity.module.ts
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";





import { ConcatActivityContributionHandler} from "./activity";
import { WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
 ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: ConcatActivityContributionHandler
     }
  ]
})

export default class ConcatActivityModule {

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
    IFieldDefinition,
    IActivityContribution,
    ActionResult,
    IActionResult
} from "wi-studio/app/contrib/wi-contrib";

@WiContrib({})
@Injectable()
export class ConcatActivityContributionHandler extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector) {
        super(injector);
    }

    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        if(fieldName === "separator") {
           let list: Array<string> = ["-", "$", "#"];
           return list;
        } 
        return null;
    }
 
    validate = (fieldName: string, context: IActivityContribution): Observable<IValidationResult> | IValidationResult => {
       if (fieldName === "separator") {
         let vresult: IValidationResult = ValidationResult.newValidationResult();
         let useSeparatorFieldDef: IFieldDefinition = context.getField("useSeparator"); 
         let separatorFieldDef: IFieldDefinition = context.getField("separator");
         if (useSeparatorFieldDef.value && useSeparatorFieldDef.value === true) {
             if (separatorFieldDef.display && separatorFieldDef.display.visible == false) {
                 vresult.setVisible(true);
             } 
             if (separatorFieldDef.value === null || separatorFieldDef.value === "") {
               vresult.setError("TIBCO-CONCAT-1000","Separator must be configured");
             } 
         } else {
            vresult.setVisible(false);
         }
         return vresult;
       }
      return null; 
    }
}
```

### activity.go
```go
package concat

import (
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
	"github.com/TIBCOSoftware/flogo-lib/logger"
)

const (
	ivField1    = "firstString"
	ivField2    = "secondString"
    ivField3    = "separator"
    ivField4    = "useSeparator"
    ovResult    = "result"
)

var activityLog = logger.GetLogger("tibco-activity-concat")

type ConcatActivity struct {
	metadata *activity.Metadata
}

func NewActivity(metadata *activity.Metadata) activity.Activity {
	return &ConcatActivity{metadata: metadata}
}

func (a *ConcatActivity) Metadata() *activity.Metadata {
	return a.metadata
}
func (a *ConcatActivity) Eval(context activity.Context) (done bool, err error) {
    activityLog.Info("Executing Concat activity")
    //Read Inputs
    if context.GetInput(ivField1) == nil {
      // First string is not configured
      // return error to the engine 
      return false, activity.NewError("First string is not configured", "CONCAT-4001", nil)
    }
    field1v := context.GetInput(ivField1).(string)
     
    if context.GetInput(ivField2) == nil {
      // Second string is not configured
      // return error to the engine 
      return false, activity.NewError("Second string is not configured", "CONCAT-4002", nil)
    }
    field2v := context.GetInput(ivField2).(string)


    field4v := context.GetInput(ivField4).(bool)
  
    if field4v && context.GetInput(ivField3) == nil {
      // Separator is not configured
      // return error to the engine 
      return false, activity.NewError("Separator is not configured", "CONCAT-4003", nil)
    }
    field3v := context.GetInput(ivField3).(string)

    if field4v {
      //Use separator in concatenation
      context.SetOutput(ovResult, field1v+field3v+field2v)
    } else {
      //No separator in concatenation
      context.SetOutput(ovResult, field1v+field2v)
    }
	return true, nil
}

```
Try [Concat](../examples/TIBCO) sample.