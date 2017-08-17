/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
/// <reference types="aws-sdk" />
// import {SQS, Credentials} from 'aws-sdk';
import * as AWS from "aws-sdk";
import {Injectable} from "@angular/core";
import {WiContrib, WiServiceHandlerContribution, AUTHENTICATION_TYPE} from "wi-studio/app/contrib/wi-contrib";
import {IConnectorContribution, IFieldDefinition, IActionResult, ActionResult} from "wi-studio/common/models/contrib";
import {Observable} from "rxjs/Observable";
import {IValidationResult, ValidationResult, ValidationError} from "wi-studio/common/models/validation";

// declare var window: any;
// let AWSInstance: any = window.AWS;

@WiContrib({})
@Injectable()
export class TibcoSQSConnectorContribution extends WiServiceHandlerContribution {
    constructor() {
        super();
    }

   
    value = (fieldName: string, context: IConnectorContribution): Observable<any> | any => {
        return null;
    }
 
    validate = (name: string, context: IConnectorContribution): Observable<IValidationResult> | IValidationResult => {
      if( name === "Connect") {
         let accessKeyId: IFieldDefinition;
         let secreteKey: IFieldDefinition;
         let region: IFieldDefinition;
         
         for (let configuration of context.settings) {
    		if( configuration.name === "accessKeyId") {
    		   accessKeyId = configuration
    		} else if( configuration.name === "secreteAccessKey") {
    		   secreteKey = configuration
    		} else if( configuration.name === "region") {
    		   region = configuration
    		}
		 }
		 
         if( accessKeyId.value && secreteKey.value && region.value) {
            // Enable Connect button
            return ValidationResult.newValidationResult().setReadOnly(false)
         } else {
            return ValidationResult.newValidationResult().setReadOnly(true)
         }
      }
       return null;
    }

    action = (actionName: string, context: IConnectorContribution): Observable<IActionResult> | IActionResult => {
       if( actionName == "Connect") {
          return Observable.create(observer => {
         	let accessKeyId: IFieldDefinition;
         	let secreteKey: IFieldDefinition;
         	let region: IFieldDefinition;
         
         	for (let configuration of context.settings) {
    			if( configuration.name === "accessKeyId") {
    		   		accessKeyId = configuration;
    			} else if( configuration.name === "secreteAccessKey") {
    		   		secreteKey = configuration;
    			} else if( configuration.name === "region") {
    		   		region = configuration;
    			}
		 	}
		 
			var sqs =  new AWS.SQS({
  				credentials: new AWS.Credentials(accessKeyId.value, secreteKey.value), region: region.value
			});
         	var params = {};
		 	sqs.listQueues(params, function(err, data) {
  		    	if (err) {
    		   		observer.next(ActionResult.newActionResult().setResult(new ValidationError("AWS-SQS-1000","Failed to connect to SQS service due to error: ".concat(err.message))));
  		    	} else {
  		    		let actionResult = {
                				context: context,
                				authType: AUTHENTICATION_TYPE.BASIC,
                				authData: {}
            			}
            		observer.next(ActionResult.newActionResult().setResult(actionResult));
            	}
		 	});
		 });
       }
       return null;
    }
}