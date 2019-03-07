---
date: 2016-04-09T16:50:16+02:00
title: Connector
weight: 256
---

The connector will use a bunch of files `connector.json` for the model and `connector.module.ts` and `connector.ts` for the UI

## connector.json
```
{
    "name": "tibco-sqs",
    "title": "TIBCO SQS Connector",
    "author": "TIBCO Software Inc.",
    "type": "flogo:connector",
    "version": "1.0.0",
 
    "display": {
       "description": "This is Amazon SQS connector",
       "category": "AWSSQS",
       "visible": true,
       "smallIcon": "sqs.png"
    },
 
    "ref": "github.com/TIBCOSoftware/tci/examples/AWSSQS/connector/sqs",
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
           }, 
           {
            "name": "accessKeyId",
            "type": "string",
            "required": true,
            “display”: {
              "name": "Access Key ID",
              "description": "AWS Access key ID for the user",
              // Onlookers should not see your access key id value
              "type": "password" 
            }
          },
          {
            "name": "secreteAccessKey",
            "type": "string",
            "required": true,
            “display”: {
              "name": "Secrete Access Key",
              "description": "AWS Secrete Access Key for the user",
              // Onlookers should not see your secrete key value
              "type": "password" 
            }
          },
          {
            "name": "region",
            "type": "string",
            "required": true,
            “display”: {
              "name": "Region",
              "description": "Name of the region where SQS service is running"
            }
          }
    ],
    
    "actions": [
          {
            // Lets validate the configuration by querying queues in the given region
            "name": "Connect",
            "actionId": "connect",
            “display”: {
              // Connect button will be disabled until all configuration values are provided 
              "readonly": true
            }
          }
    ]
}
```

## connector.module.ts
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {TibcoSQSConnectorContribution} from "./connector";
import {WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";

@NgModule({
  imports: [
  	CommonModule,
  	HttpModule,
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: TibcoSQSConnectorContribution
     }
  ]
})

export default class TibcoSQSConnectorModule {

}
```

## connector.ts
```typescript
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
            return ValidationResult.newValidationResult().setReadonly(false);
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
    		   return ActionResult.newResult().setError("AWS-SQS-4000","Failed to connect to SQS service due to error: ".concat(err));
  		    } else {
    		  return ActionResult.newResult().setError("AWS-SQS-1000", "Successfully connected to SQS service");
  		    }
		 });
       }
       return null;
    }
}
```