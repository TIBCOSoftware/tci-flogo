---
date: 2016-04-09T16:50:16+02:00
title: Adding more UI options
weight: 254
---

Now the user can choose the separator token, but what to do if you want to let users decide whether they want to use a separator or not and what to do if you don't want to hardcode the separator list in the JSON file? All of this can be solved with simple TypeScript (ts) code! 

## The folder
We need two TypeScript files for our Concat activity. In those files we'll make the separator field visible only when users wants to use it and we'll also construct and return separator list. The new layout of the folder will look something like this
```
TIBCO
└───activity
    └───concat
        ├───activity.json
        |───activity.go
        |───activity_test.go
        |───activity.ts
        |───activity.module.ts
        └───concat.png
```

## activity.json
The activity.json file needs a few small changes and now has a boolean to tell if the separator should be used and the separator is now invisible by default.
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
 
    "ref": "github.com/TIBCOSoftware/tci-flogo/samples/extensions/TIBCO/activity/concat",
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

## activity.module.ts
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

## activity.ts
The activity.ts file handles the validation and actions for the fields described in the model. For example it validates that a valid connection has been chosen, or retrieves additional information based on values in certain fields.
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

## activity.go
The activity.go has a few new pieces. We've commented the parts that have been changed from the previous version.
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
    // Adding a new input field
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
    if context.GetInput(ivField1) == nil {
      return false, activity.NewError("First string is not configured", "CONCAT-4001", nil)
    }
    field1v := context.GetInput(ivField1).(string)
     
    if context.GetInput(ivField2) == nil {
      return false, activity.NewError("Second string is not configured", "CONCAT-4002", nil)
    }
    field2v := context.GetInput(ivField2).(string)

    // Get the new boolean value if we need to use a separator or not
    field4v := context.GetInput(ivField4).(bool)
  
    // The validation has changed slightly
    if field4v && context.GetInput(ivField3) == nil {
      return false, activity.NewError("Separator is not configured", "CONCAT-4003", nil)
    }
    field3v := context.GetInput(ivField3).(string)

    // Set the output value depending on whether we need a separator or not
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
