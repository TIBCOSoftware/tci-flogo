/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */

module.exports.connectorTemplate = {
  "name": "",
  "title": "",
  "author": "",
  "type": "flogo:connector",
  "version": "",
  "display": {
    "description": "",
    "category": "",
    "visible": true,
    "smallIcon": ""
  },
  "ref": "",
  "keyfield": "name",
  "settings": [
    {
      "name": "name",
      "type": "string",
      "required": true,
      "display": {
        "name": "Connection Name",
        "description": "Name of the connection"
      }
    },
    {
      "name": "description",
      "type": "string",
      "display": {
        "name": "Description",
        "description": "Connection description"
      }
    }
  ],
  "actions": [
    {
      "name": "Connect",
      "display": {
        "readonly": true
      }
    }
  ]
};

module.exports.connectorTypeScriptTemplate = `
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
export class TemplateConnectorContribution extends WiServiceHandlerContribution {
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
        if (name === "Connect") {

        }
        return null;
    }

    /**
     * Action method that is triggered when an action occurs (e.g. a button is clicked)
     */
    action = (actionName: string, context: IConnectorContribution): Observable<IActionResult> | IActionResult => {
        if (actionName == "Connect") {

        }
        return null;
    }
}
`;

module.exports.connectorTypeScriptModuleTemplate = `
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {TemplateConnectorContribution} from "./connector";
import {WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";

@NgModule({
  imports: [
  	CommonModule,
  	HttpModule,
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: TemplateConnectorContribution
     }
  ]
})

export default class TemplateConnectorModule {

}
`;

module.exports.activityTemplate = {
  "name": "",
  "title": "",
  "version": "",
  "type": "flogo:activity",
  "author": "",
  "display": {
    "category": "",
    "visible": true,
    "smallIcon": "",
    "description": ""
  },
  "ref": "",
  "inputs": [],
  "outputs": []
};

module.exports.activityGoTemplate = `
package %%name%%

// Imports
import (
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
	"github.com/TIBCOSoftware/flogo-lib/logger"
)

// activityLog is the default logger for this class
var activityLog = logger.GetLogger("%%name%%")

type %%name%%Activity struct {
	metadata *activity.Metadata
}

func NewActivity(metadata *activity.Metadata) activity.Activity {
	return &%%name%%Activity{metadata: metadata}
}

func (a *%%name%%Activity) Metadata() *activity.Metadata {
	return a.metadata
}

func (a *%%name%%Activity) Eval(context activity.Context) (done bool, err error) {

	// Return value
	return true, nil
}
`;

module.exports.activityTestGoTemplate = `
package %%name%%

// Imports
import (
	"io/ioutil"
	"testing"

	"github.com/TIBCOSoftware/flogo-contrib/action/flow/test"
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
	"github.com/stretchr/testify/assert"
)

// activityMetadata is the metadata of the activity as described in activity.json
// We'll store it as a variable to reuse it across multiple testcases
var activityMetadata *activity.Metadata

// getActivityMetadata reads the activity.json file and sets the activityMetadata variable
// if the variable already contains metadata it simply returns the current value rather than reading the file again
func getActivityMetadata() *activity.Metadata {
	if activityMetadata == nil {
		jsonMetadataBytes, err := ioutil.ReadFile("activity.json")
		if err != nil {
			panic("No Json Metadata found for activity.json path")
		}
		activityMetadata = activity.NewMetadata(string(jsonMetadataBytes))
	}
	return activityMetadata
}

// TestActivityRegistration checks whether the activity can be registered, and is registered in the engine
func TestActivityRegistration(t *testing.T) {
	act := NewActivity(getActivityMetadata())
	if act == nil {
		t.Error("Activity Not Registered")
		t.Fail()
		return
	}
}

func TestEval(t *testing.T) {
	act := NewActivity(getActivityMetadata())
	tc := test.NewTestActivityContext(act.Metadata())


}
`;

module.exports.activityTypeScriptTemplate = `
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
 export class TemplateActivityContribution extends WiServiceHandlerContribution {
	 constructor( @Inject(Injector) injector, private http: Http) {
		 super(injector, http);
	 }
 
	 /**
	  * The value object allows you to specify what types of values you can pick for a certain field
	  */
	 value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
		 return null;
	 }
 
	 /**
	  * The validate object can be used to validate the input of certain fields
	  */
	 validate = (fieldName: string, context: IActivityContribution): Observable<IValidationResult> | IValidationResult => {
		 return null;
	 }
 }
`;

module.exports.activityTypeScriptModuleTemplate = `
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TemplateActivityContribution} from "./activity";
import { WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: TemplateActivityContribution
     }
  ]
})

export default class TemplateActivityModule {

}
`;
