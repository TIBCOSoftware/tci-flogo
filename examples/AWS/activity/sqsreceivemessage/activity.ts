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
    IActionResult,
    ConnectorUtils,
    CORSUtils
} from "wi-studio/app/contrib/wi-contrib";
import {AWS} from 'aws-sdk';
 
@WiContrib({})
@Injectable()
export class SQSReceiveMessageActivityContributionHandler extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector) {
        super(injector);
    }
 
    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        if(fieldName === "sqsConnection") {
           //Connector ID must match with the name defined in connector.json
           return WIConnectorUtils.getConnectionNames("tibco-sqs");
        } else if(fieldName === "queueUrl") {
           let connectionField: IFieldDefinition = context.getField("sqsConnection");
           // Read connection name
           if(connectionField.value) {
            //Read connection configuration
            let connectionConfig: IConnectionContribution = WIConnectorUtils.getConnectionConfiguration(connectionField.value);
            if(connectionConfig) {
                let accessKeyId: IFieldDefinition = connectionConfig.getField("accessKeyId");
                let secreteKey: IFieldDefinition = connectionConfig.getField("secreteAccessKey");
                let region: IFieldDefinition = connectionConfig.getField("region");
                AWS.config.update({
                    region: region.value,
                    credentials: new AWS.Credentials(accessKeyId.value, secreteKey.value)
                });
                let sqs = new AWS.SQS();
                let params = {};
                sqs.listQueues(params, function(err, data) {
                    if (err) {
                        return string[];
                    } else {
                        return data.QueueUrls;
                    }
                });
            }
           }
        }
        return null;
    }
  
    validate = (fieldName: string, context: IActivityContribution): Observable<IValidationResult> | IValidationResult => {
       if(fieldName === "sqsConnection") {
         let connection: IFieldDefinition = context.getField("sqsConnection")
         if (connection.value === null) {
              return ValidationResult.newValidationResult().setError("SQS Connection must be configured");
         }
       } else if(fieldName === "queueUrl") {
         let queueUrl: IFieldDefinition = context.getField("queueUrl")
         if (queueUrl.value === null) {
              return ValidationResult.newValidationResult().setError("Queue URL must be configured");
         }
       }
      return null;
    }
}