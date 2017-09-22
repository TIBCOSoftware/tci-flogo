---
date: 2016-04-09T16:50:16+02:00
title: Creating a connector
weight: 30
---

## Connectors
While you can collect user inputs for each individual activity to connect to SaaS applications, you can also use a connector to do that for you! Like activities, a connector has a specific set of files and to create one you need to create the `connector.json`, `connector.module.ts` and `connector.ts` files.

### connector.json
```
{
    // Unique connector name without spaces or special characters
    "name": "demo",
    //Unique connector ID without spaces
    "title": "Demo Connector",
    // Name of the author
    "author": "TIBCO Software Inc.",
    // Indicates that it is a connector model
    "type": "flogo:connector",
    // Version of the connector
    "version": "1.0.0",
 
    // Connector display configuration
    "display": {
       // Connector description
       "description": "This is TIBCO JDBC connector",
       // Category under which this connector will be displayed.
       // Category name must not contain special characters or spaces.
       "category": "TIBCO",
       // Make this connector visible/invisible
       "visible": true,
       // Path to the small icon file.
       // Size Limit:2KB
       // Supported Format: PNG
       "smallIcon": "jdbc-small-icon.png"
    },
 
    // ref value must be unique and should not conflict with any other connectors.
    // It must be category name followed by lower case connector name.
    // Prepend your Github repository path in case you are hosting your contributions on github.com.
    // e.g. "ref": "github.com/TIBCOSoftware/tci/examples/AWS/connector/sqs"
    "ref": "<CATEGORY SPECIFIED IN DISPAY CONFIGURATION>/connector/<LOWER CASE CONNECTOR NAME>",
     
     // Name of the field corresponding to connection name.
     // This is required configuration.
     "keyfield": "name",
     
    // One or more configuration fields
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
            // Name of the field
            "name": "field1",
  
            // Type of the field
            "type": "string",
  
            // Is required field.
            "required": true,
             
            // Optional field display configuration.
            // If present, determines default layout of this field.
            “display”: {
              ....
            }
             
            // Default value based on the type
            "value": "this is default value"
          }
          .....
    ],
    
    // Action buttons to be displayed on the Connector UI
    "actions": [
          {
            // Display label
            "name": "Create",
            // Action Id to be passed to the contribution code
            "actionId": "create",
            // Optional button display configuration.
            // If present, determines default layout of this button.
            “display”: {
              ....
            }
          }

          .....
    ]
}
```

### connector.module.ts
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {SampleConnectorContributionHandler} from "./connector";
import {WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: SampleConnectorContributionHandler
     }
  ]
})

export default class SampleConnectorModule {

}
```

### connector.ts
```typescript
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
export class SampleConnectorContributionHandler extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector, @Inject(Http) http) {
        super(injector, http);
    }

   /** 
    * Return a value for the given field.
    * Input:
    *        fieldName - Name of the field
    *        context   - Connector model(connector.json) with latest values
    * Output: Either a field value or Observable in case of asynchronous operations
    *   any             - Primitive value or Array of primitive values 
    *   Observable<any> - Observable for asynchronous reply(HTTP)
    */ 
    value = (fieldName: string, context: IConnectorContribution): Observable<any> | any => {
        return null;
    }
 
   /** 
    * Validate the field value and/or update visual appearance of the field or button
    * Input:
    *        name     - Name of the field or action
    *        context  - Connector model(connector.json) with latest values
    * Output:
    *       Observable<IValidationResult> - In cases where validation depends on external services (e.g. HTTP), return Observable
    *       IValidationResult             - Result of validation
    */
    validate = (name: string, context: IConnectorContribution): Observable<IValidationResult> | IValidationResult => {
       return null;
    }

   /** 
    * Handle actions defined in the connector.json. 
    * Connector configuration can be updated in this method.
    * Input:
    *        actionId  - Action ID associated with the action
    *        context   - Connector model(connector.json) with latest values
    * Output: Either action result or Observable in case of asynchronous operations
    *        IActionResult             - For synchronous invocations  
    *        Observable<IActionResult> - For asynchronous invocations(e.g. HTTP)
    */ 
    action = (actionId: string, context: IConnectorContribution): Observable<IActionResult> | IActionResult => {
        return null;
    }
}
```