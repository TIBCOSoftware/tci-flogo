/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
/// <reference types="aws-sdk" />
import * as AWS from "aws-sdk";
import {Injectable} from "@angular/core";
import {AUTHENTICATION_TYPE, WiContrib, WiServiceHandlerContribution} from "wi-studio/app/contrib/wi-contrib";
import {ActionResult, IActionResult, IConnectorContribution, IFieldDefinition} from "wi-studio/common/models/contrib";
import {Observable} from "rxjs/Observable";
import {IValidationResult, ValidationError, ValidationResult} from "wi-studio/common/models/validation";

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
         let secretKey: IFieldDefinition;
         let region: IFieldDefinition;
         
         for (let configuration of context.settings) {
    		if( configuration.name === "accessKeyId") {
    		   accessKeyId = configuration;
    		} else if( configuration.name === "secretAccessKey") {
    		   secretKey = configuration;
    		} else if( configuration.name === "region") {
    		   region = configuration;
    		}
		 }
		 
         if( accessKeyId.value && secretKey.value && region.value) {
            // Enable Connect button
            return ValidationResult.newValidationResult().setReadOnly(false)
         } else {
            return ValidationResult.newValidationResult().setReadOnly(true)
         }
      }else if (name === "roleArn" || name === "roleSessionName"  || name === "externalId"  || name === "expirationDuration") {
      	 return Observable.create(observer => {
			let assumeRole = false
			let roleSessionName = ""
			let expirationDuration = 0

			for (let setting of context.settings) {
				if (setting.name === "assumeRole") {
					assumeRole = setting.value
				}else if  (setting.name === "roleSessionName") {
					roleSessionName = setting.value
				}else if  (setting.name === "expirationDuration") {
					expirationDuration = setting.value
				}
			}

			let result = ValidationResult.newValidationResult()
			if (assumeRole == true) {
				result.setVisible(true)
				if (name === "roleSessionName") {
					if (roleSessionName.length < 2) {
						result.setError("Role Session Name Error", "Role Session Name must have length greather than or equal to 2");
					}
				}else if (name === "expirationDuration") {
					if (expirationDuration && expirationDuration < 900) {
						result.setError("Expiration Duration Error", "Expiration Duration must bigger than 900 seconds");
					}
				}
			}else {
				result.setVisible(false)
			}
			observer.next(result);
			observer.complete()
		});
      }
		return null;
    }

    action = (actionName: string, context: IConnectorContribution): Observable<IActionResult> | IActionResult => {
       if( actionName == "Connect") {
          return Observable.create(observer => {
			  let vresult = ActionResult.newActionResult();
			  let keyId = "", secretKey = "", region = "";
			  let useAssumeRole = false
			  let roleArn = "", roleSessionName = "", externalId = "";
			  let duration = 60 * 60
			  for (let i = 0; i < context.settings.length; i++) {
				  if (context.settings[i].name === "accessKeyId") {
					  keyId = context.settings[i].value;
				  }
				  if (context.settings[i].name === "secretAccessKey") {
					  secretKey = context.settings[i].value;
				  }
				  if (context.settings[i].name === "region") {
					  region = context.settings[i].value;
				  }
				  if (context.settings[i].name === "assumeRole") {
					  useAssumeRole = context.settings[i].value;
				  }
				  if (context.settings[i].name === "roleArn") {
					  roleArn = context.settings[i].value;
				  }
				  if (context.settings[i].name === "roleSessionName") {
					  roleSessionName = context.settings[i].value;
				  }
				  if (context.settings[i].name === "externalId") {
					  externalId = context.settings[i].value;
				  }
				  if (context.settings[i].name === "expirationDuration") {
					  duration = context.settings[i].value;
				  }
			  }

		  let awsCredential = {
			  accessKeyId: keyId,
			  secretAccessKey: secretKey,
			  region: region,
			  sessionToken:""
		  };

		  if (useAssumeRole == true) {
			  console.log("Assume role")
			  const sts = new AWS.STS(awsCredential);
			  const assumeRoleParam = {
				  RoleArn: roleArn,
				  RoleSessionName: roleSessionName,
				  ExternalId: externalId,
				  DurationSeconds: duration
			  };

			  sts.assumeRole(assumeRoleParam, (err, data) => {
				  if (err) {
					  console.log("assume role error occured...........")
					  vresult.setSuccess(false).setResult(new ValidationError("AWS-SQS-1000","Assume Role Error AWS Assume Role failed:" .concat(err.message)));
					  observer.next(vresult);
					  observer.complete();
				  }else {
					  console.log("Assume role call observer next")
					  awsCredential.accessKeyId = data.Credentials.AccessKeyId
					  awsCredential.secretAccessKey = data.Credentials.SecretAccessKey
					  awsCredential.sessionToken = data.Credentials.SessionToken

					  var params = {};
					  let sqs = new AWS.SQS(awsCredential)
					  sqs.listQueues(params, (err, data) => {
						  if (err) {
							  console.log("error occured...........")
							  vresult.setSuccess(false).setResult(new ValidationError("AWS-SQS-1000","Failed to connect to SQS service due to error: ".concat(err.message)));
						  }else {
							  let actionResult = {
								  context: context,
								  authType: AUTHENTICATION_TYPE.BASIC,
								  authData: {}
							  }
							  vresult.setSuccess(true).setResult(actionResult);
						  }
						  console.log("call observer next")
						  observer.next(vresult);
						  observer.complete();
					  });
				  }
			  });

		  }else {
			  var params = {};
			  let sqs = new AWS.SQS(awsCredential)
			  sqs.listQueues(params, (err, data) => {
				  if (err) {
					  console.log("error occured...........", err)
					 vresult.setSuccess(false).setResult(new ValidationError("AWS-SQS-1000","Failed to connect to SQS service due to error: ".concat(err.message)));
				  }else {
					  let actionResult = {
						  context: context,
						  authType: AUTHENTICATION_TYPE.BASIC,
						  authData: {}
					  }
					  vresult.setSuccess(true).setResult(actionResult);
				  }
				  console.log("call observer next")
				  observer.next(vresult);
				  observer.complete();
			  });
		  }
		 });
       }
       return null;
    }
}
