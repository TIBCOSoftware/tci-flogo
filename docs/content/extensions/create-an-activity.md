---
date: 2016-04-09T16:50:16+02:00
title: Creating an activity
weight: 20
---

It is very easy to develop an activity for Web Integrator. Just create the model and runtime files that follow the below templates

### activity.json
```
{
    //Unique activity name without spaces or special characters
    "name": "demo",
     
    // Name of the author
    "author": "TIBCO Software Inc.",
     
    // Indicates that it is an activity model
    "type": "flogo:activity",
 
    // Version of the activity
    "version": "1.0.0",
 
 
    // Display name
    "title": "Demo Activity",
 
    // Mandatory activity display configuration
    "display": {
       // Activity description
       "description": "This is demo activity",
       // Category under which this activity will be displayed.
       // Category name must not contain special characters or spaces.
       "category": "TIBCO",
       // Make this activity visible/invisible under given category
       "visible": true,
       // Path to the small icon file.
       // Size Limit:2KB
       // Supported Format: PNG
       "smallIcon": "demo-small-icon.png"
    },
 
    // This value is used by runtime to load the activity implementation.
    // It must include category name followed by lower case activity name.
    // Prepend your Github repository path in case you are hosting your contributions on github.com.
    // e.g. "ref": "github.com/TIBCOSoftware/tci/examples/TIBCO/activity/concat"
    "ref":  "<CATEGORY SPECIFIED IN DISPLAY CONFIGURATION>/activity/<LOWER CASE ACTIVITY NAME>",
     
    // One or more activity inputs
    "inputs": [
           {
            // Name of the field that would be set in the activity input.
            "name": "field1",
 
            // Runtime datatype of the field. Supported types are: string, integer, boolean, complex_object
            "type": "string",
 
            // Is required field.
            "required": true,
             
            // Optional field display configuration.
            // If present, determines layout of this field.
            “display”: {
              ....
            },
             
            // Default value for the field based on the type.
            "value": "this is default value"
          }
          .....
    ],
 
    // One or more activity outputs
    "outputs": [
           {
            // Name of the field that would be set in the activity input.
            "name": "field1",
 
            // Runtime datatype of the field. Supported types are: string, integer, boolean, complex_object
            "type": "string",
 
            // Is required field.
            "required": true,
             
            // Optional field display configuration.
            // If present, determines default layout of this field.
            “display”: {
              ....
            },
             
            // Default value for the field based on the type. This can be overridden at runtime.
            "value": "this is default value"
          }
          .....
    ]
}
```

### activity.go
```go
package demo
 
import (
    "github.com/TIBCOSoftware/flogo-lib/core/activity"
    "github.com/TIBCOSoftware/flogo-lib/logger"
)
 
// Create a logger for the Sample Activity
// Logger Name : <category>-activity-<type>
var activityLog = logger.GetLogger("tibco-activity-demo")
 
// This must be defined by the activity implementation.
type DemoActivity struct {
    metadata *activity.Metadata
}
 
// Creates an activity instance with the metadata defined in the activity.json
// This must be defined by the activity implementation.
// It is called during package initialization.
func NewActivity(metadata *activity.Metadata) activity.Activity {
    return &DemoActivity{metadata: metadata}
}
 
// Metadata returns the activity's metadata.
// This must be defined by the activity implementation.
func (a *DemoActivity) Metadata() *activity.Metadata {
    return a.metadata
}
 
// Eval is called when an Activity is being executed. 
// Returning true indicates that the activity is done.
// Activity Name, Flow Name, Input(s) and Output(s) can be accessed through activity.Context.
// Refer https://github.com/TIBCOSoftware/flogo-lib/blob/master/core/activity/context.go for more details.
func (a *DemoActivity) Eval(context activity.Context) (done bool, err error) {
    //Return true for successful execution else false indicating error
    return true, nil
}
```
The activity UI is divided into following 5 main sections. Based on definition in the model(activity.json), fields will be displayed on the appropriate section.

<table class="relative-table wrapped" style="width: 58.5214%;"><colgroup><col style="width: 15.4461%;"><col style="width: 62.4501%;"><col style="width: 22.1039%;"></colgroup>

<tbody>

<tr>

<th>Section</th>

<th>Description</th>

<th>Example</th>

</tr>

<tr>

<td>Configuration</td>

<td>Any input field with <b>display</b> configuration.</td>

<td colspan="1">

{  
 "name": "field1",  
 "type": "string",  
 "required": true,  
**"display": {** 

 **....** 
 
**}**  
}
</td>
</tr>

<tr>

<td>Input</td>

<td>Any input field with no <b>display</b> configuration. It is mapper section where output values from previous activities can be mapped to the field value.</td>

<td colspan="1">

{  
 "name": "field1",
 
 "type": "string",
 
 "required": true  
}
</td>
</tr>

<tr>

<td>Input Settings</td>

<td>Any input field that has a <b>display</b> configuration and contributes a schema to the Input section for the value mapping. The <b>mappable</b> flag must be set to true.</td>

<td colspan="2">

{  
 "name": "field1",  
 "type": "string", 
 "required": true, 
**"display": {**  

 **....**,
 
 **"mappable": true**
**}**

}

</td>

</tr>

<tr>

<td>Output</td>

<td>Any output field with no <b>display</b> configuration. This field value can be used in the Input section of downstream activities in the flow.</td>

<td colspan="1">

{  
 "name": "output",
 
 "type": "string", 
 
 "required": true  
}

</td>
</tr>

<tr>

<td colspan="1">Output Settings</td>

<td>Any output field that has a <b>display</b> configuration and contributes a schema to the Output section. This field value can be used in the Input section of downstream activities in the flow.</td>

<td colspan="2">

{  
"name": "output",  
"type": "string",  
"required": true,  
**"display": {**  
**....**

**}**

}

</td>

</tr>

</tbody>

</table>
