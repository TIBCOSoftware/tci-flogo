import {AWS} from 'aws-sdk';

import {Observable} from "rxjs/Observable";
import {Injectable, Injector, Inject} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {
    WiContrib,
    WiServiceHandlerContribution,
    IValidationResult,
    ValidationResult,
    IFieldDefinition
    IActivityContribution,
    IConnectorContribution
    ActionResult,
    IActionResult
} from "wi-studio/app/contrib/wi-contrib";


@WiContrib({})

@Injectable()
export class TibcoSQSConnectorContribution extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector) {
        super(injector);
    }

   
    value = (fieldName: string, context: IConnectorContribution): Observable<any> | any => {
        return null;
    }
 
    validate = (name: string, context: IConnectorContribution): Observable<IValidationResult> | IValidationResult => {
      if( name === "Connect") {
         let accessKeyId: IFieldDefinition = context.getField("accessKeyId");
         let secreteKey: IFieldDefinition = context.getField("secreteAccessKey");
         let region: IFieldDefinition = context.getField("region");
         if( accessKeyId.value && secreteKey.value && region.value) {
            // Enable Connect button
            return ValidationResult.newValidationResult().setReadonly(false)
         }
      }
       return null;
    }

    action = (actionId: string, context: IConnectorContribution): Observable<IActionResult> | IActionResult => {
       if( actionId == "connect") {
         let accessKeyId: IFieldDefinition = context.getField("accessKeyId");
         let secreteKey: IFieldDefinition = context.getField("secreteAccessKey");
         let region: IFieldDefinition = context.getField("region");
         AWS.config.update({
               region: region.value,
               credentials: new AWS.Credentials(accessKeyId.value, secreteKey.value)
         });
         let sqs = new AWS.SQS();
         let params = {};
		 sqs.listQueues(params, function(err, data) {
  		    if (err) {
    		   return ActionResult.newResult().setError("Failed to connect to SQS service due to error: ".concat(err));
  		    } else {
    		  return ActionResult.newResult().setError("Successfully connected to SQS service");
  		    }
		 });
       }
       return null;
    }
}