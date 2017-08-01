# Extensions for TIBCO Cloud Integration - Web Integrator
**Welcome to TIBCO Cloud Integration Web Integrator !!!**

Are you excited to add new contributions to Web Integrator?? 

We are as excited as you to help you develop new cool contributions that will enable application developers do better integration with hundreds of services.

Before we start, you should

*   Create an account on TIBCO Cloud Integration(TCI). Just [sign up](https://www.tibco.com/products/tibco-cloud-integration) for free trial account.
*   Read Web Integrator documentation. Get familiar with key concepts like **_Application_**, **_Flow_**, **_Activity_**, **_Trigger_**, **_Connection_**.
*   Read about [Go Programming Language](https://golang.org/) (1.7 and above). The Web Integrator runtime is powered by Open Source [Project Flogo](http://www.flogo.io/).
*   Read about [Angular TypeScript](https://angular.io/guide/typescript-configuration) concepts like [NgModule](https://angular.io/guide/ngmodule), [Service](https://angular.io/guide/architecture#services), fat [Arrow Functions](https://www.typescriptlang.org/docs/handbook/functions.html), <span>[ReactiveX](http://reactivex.io/rxjs/manual/overview.html)</span>
*   Read about [JSON](http://www.json.org/)

You can add following contributions:

*   Activity - Add new activity to Web Integrator. An activity takes one or more inputs and construct one or more output values.
*   Connector - Add new connection type to Web Integrator. A connector defines one or more configurations and makes connection with external services e.g. Salesforce, Database etc.

Sounds exciting? Want to jump to coding? 

Before that, lets quickly look at files that you would be creating for your contribution.

<table class="wrapped"><colgroup><col><col><col><col><col></colgroup>

<tbody>

<tr>

<th rowspan="2">

Component

</th>

<th rowspan="2">Technology</th>

<th colspan="2">Contribution Type</th>

<th rowspan="2">Description</th>

</tr>

<tr>

<th colspan="1"><span>Activity</span></th>

<th colspan="1"><span>Connector</span></th>

</tr>

<tr>

<td>Model</td>

<td colspan="1">JSON</td>

<td>activity.json</td>

<td>connector.json</td>

<td colspan="1">Every contribution must define the model in JSON format.</td>

</tr>

<tr>

<td>UI(Optional)</td>

<td colspan="1">Angular 2.x TypeScript</td>

<td>

activity.ts

activity.module.ts

</td>

<td>

connector.ts

connector.module.ts

</td>

<td colspan="1">

<div class="content-wrapper">

In situations where the value or display of a field is dependent on values of preceding fields, the contribution should provide typescripts. It consists of _\*.module.ts_ ([Angular Module](https://angular.io/guide/ngmodule)) and _\*.ts_ ([Angular Service](https://angular.io/guide/architecture#services))

> We do not support third-party libraries in typescript code. Recommended using HTTP module wherever possible.

</td>

</tr>

<tr>

<td colspan="1">Runtime</td>

<td colspan="1">Golang</td>

<td colspan="1">

activity.go

activity_test.go

</td>

<td colspan="1">NA</td>

<td colspan="1">

<div class="content-wrapper">

Every activity contribution must write the runtime code in **Go** (_activity.go_).

 You can leverage Go testing framework for writing unit test cases(_activity_test.go_) for your contribution runtime.

> No runtime support for connectors. Connectors just provide set of configuration values to the activity.
</td>
</tr>
</tbody>
</table>

## Contribution Layout 
Your contributions must follow below folder layout.

![](images/layout.png)

where,

\<Category\> - Name of category defined in the model

\<ActivityX\> - Lower case activity name (In accordance with Golang package naming convention)

\<ConnectorX\> -Lower case connector name

## Setup development enviornment
Follow below steps to setup your developement enviornment.
- Design time: Refer [WI Studio SDK](wi-studio-docs/index.html) to develop and test contributions in local enviornment.
- Runtime: Checkout [flogo-lib](https://github.com/TIBCOSoftware/flogo-lib) and [flogo-contrib](https://github.com/TIBCOSoftware/flogo-contrib) from [Project Flogo](http://www.flogo.io/) and add them into your $GOPATH. Refer runtime API docs at:     
	- https://godoc.org/github.com/TIBCOSoftware/flogo-lib/core/activity
	- https://godoc.org/github.com/TIBCOSoftware/flogo-lib/core/data

## Activity Contribution

It is very easy to develop an activity for Web Integrator. Just create the model and runtime files that adhere to following templates:

**activity.json**
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
       // Category under which this activity will be displayed
       "category": "TIBCO",
       // Make this activity visible/invisible under given category
       "visible": true,
       // Path to the small icon file.
       // Size Limit:1KB
       // Format: PNG, SVG
       "smallIcon": "demo-small-icon.png",
       // Path to the small icon file.
       // Size Limit: 2KB
       // Format: PNG, SVG
       "largeIcon": "demo-large-icon.png"
    },
 
    // This value is used by runtime to load the activity implantation.
    // It must follow below naming scheme.
    // Add your Github repository path in case you are hosting your contributions on github.com
    // e.g. "github.com/<GITHUB USERNAME>/wi-contributions/<CATEGORY SPECIFIED IN DISPLAY CONFIGURATION>/activity/<LOWER CASE ACTIVITY NAME>",
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
**activity.go**
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

<td>Any input field with __display__ configuration.</td>

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

<td><span>Any input field with no</span> **display** <span>configuration. It is mapper section where output values from previous activities can be mapped to the field value.</span></td>

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

<td><span>Any input field that has a **display** configuration and contributes a schema to the Input section for the value mapping. The **mappable** flag must be set to true.</span></td>

<td colspan="1">

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

<td><span>Any output field with no</span> **display** <span>configuration. This field value can be used in <span>the Input section</span> of downstream activities in the flow.</span></td>

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

<td colspan="1"><span>Any output field that has a</span> **display** <span>configuration and contributes a schema to the Output section. <span>This field value can be used in the Input section of downstream activities in the flow.</span></span></td>

<td colspan="1">

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

Now that you are familiar with the templates and UI sections, let's create a simple activity(we will call it **Concat**) that takes two input strings and returns a concatenated string.

Create a folder named **concat** in the TIBCO categorywith following files:
![](images/concat-activity.png)

**activity.json**
```json
{
    "name": "concat",
    "title": "Concat Activity",
    "version": "1.0.0",
    "type": "flogo:activity",
    "author": "TIBCO Software Inc.",
    "display": {
       "category": "TIBCO",
       "visible": true,
       "smallIcon": "concat-small-icon.png",
       "largeIcon": "concat-large-icon.png",
       "description": "This activity returns concatenation of two strings",
    },
 
    "ref": "TIBCO/activity/concat",
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
**activity.go**
```go
package concat

import (
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
	"github.com/TIBCOSoftware/flogo-lib/logger"
)

const (
	ivField1    = "firstString"
	ivField2    = "secondString"
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
    
    //Set output
    context.SetOutput(ovResult, field1v+field2v)
	return true, nil
}
```

Let's write runtime unit test cases for Concat activity. We will use Golang [testing](https://golang.org/pkg/testing/) package.

**activity_test.go**
```go
package concat

import (
	"testing"
	"github.com/TIBCOSoftware/flogo-contrib/action/flow/test"
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
    "github.com/stretchr/testify/assert"
	"io/ioutil"
)

var activityMetadata *activity.Metadata

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
	//setup attrs
	tc.SetInput("firstString", "Hello ")
    tc.SetInput("secondString", "World! ")
	done, err := act.Eval(tc)
    assert.Nil(t, err)
    result := tc.GetOutput("result")
    assert.Equal(t, result, "Hello World!")
}
```

You can test your runtime code against [Project Flogo](http://www.flogo.io/) code.

*   Ensure $GOPATH variable is set
*   Ensure your <Category> folder is added to the <span>$GOPATH</span>
*   <span>Pull <span>Flogo</span> code:</span>
    *   <span>go get [github.com/TIBCOSoftware/flogo-lib](http://github.com/TIBCOSoftware/flogo-lib)</span>
    *   <span>go get [github.com/TIBCOSoftware/flogo-contrib](http://github.com/TIBCOSoftware/flogo-contrib)</span>
*   Run '<span style="color: rgb(0,0,255);">_**go test ./..**_</span>' from your <span><Category> folder.</span>

</ac:rich-text-body></ac:structured-macro>

And your _**Concat**_ activity is ready for the use in Web Integrator. Wasn't that easy? 


## Upload your contribution to TIBCO Cloud Integration


Once contribution is ready, you can upload it using your TCI account.

**WIP**

## Advanced Configuration

What we have seen so far is a very simple contribution. How about an activity that displays a dropdown list or displays input/output structure based on a JSON schema?

Do you remember optional **display** configuration in the model json? Well, that is the place where you can configure display settings for your fields.

Lets understand runtime datatypes that you can set to your fields in the model json.

<table class="wrapped"><colgroup><col style="width: 119.0px;"><col style="width: 240.0px;"><col style="width: 570.0px;"></colgroup>

<tbody>

<tr>

<th>Datatype</th>

<th colspan="1">Golang Datatype</th>

<th colspan="1">Description</th>

</tr>

<tr>

<td>string</td>

<td colspan="1">string</td>

<td colspan="1">string field</td>

</tr>

<tr>

<td>integer</td>

<td colspan="1">int64</td>

<td colspan="1">64 bit integer field</td>

</tr>

<tr>

<td>boolean</td>

<td colspan="1">bool</td>

<td colspan="1">boolean field</td>

</tr>

<tr>

<td colspan="1">number</td>

<td colspan="1">float64</td>

<td colspan="1">float64 field</td>

</tr>

<tr>

<td>complex_object</td>

<td colspan="1">

<div class="content-wrapper">

data.ComplexObject

Refer [https://github.com/TIBCOSoftware/flogo-lib/blob/master/core/data/data.go](https://github.com/TIBCOSoftware/flogo-lib/blob/master/core/data/data.go)

</div>

</td>

<td colspan="1">

It has two part:

1.  Metadata - A stringified JSON schema that can be used for the data validation
2.  Value - A JSON data that is being passed to the runtime

Use this type when you need schema and data together for given field.

To use this type, import package [github.com/TIBCOSoftware/flogo-lib/core/data](http://github.com/TIBCOSoftware/flogo-lib/core/data) into your code.

</td>

</tr>

<tr>

<td colspan="1">array</td>

<td colspan="1">

<span class="s1">[]</span>map<span class="s1">[</span><span class="s2">string</span><span class="s1">]</span>interface<span class="s1">{}</span>

</td>

<td colspan="1">A JSON array value like '[{"a":"1", "b":"2"},<span>{"a":"2", "b":"3"},<span>{"a":"4", "b":"5"}]' can be set to array field.</span></span></td>

</tr>

<tr>

<td colspan="1">object</td>

<td colspan="1"><span>map</span><span class="s1">[</span><span class="s2">string</span><span class="s1">]</span><span>interface</span><span class="s1">{}</span></td>

<td colspan="1">A JSON object</td>

</tr>

</tbody>

</table>

Now, lets understand various display configurations that are applicable to contribution(activity, connector) fields.

<table class="wrapped fixed-table"><colgroup><col style="width: 113.0px;"><col style="width: 298.0px;"><col style="width: 376.0px;"><col style="width: 630.0px;"></colgroup>

<tbody>

<tr>

<th>Configuration</th>

<th colspan="1">Description</th>

<th>Model Configuration</th>

<th colspan="1">Example</th>

</tr>

<tr>

<td colspan="1">Invisible</td>

<td colspan="1">Make field invisible in UI</td>

<td colspan="1">

“display”: {

"visible": false

}

</td>

<td colspan="1">

{  
"name": "method",  
"type": "string",  
**"display": {**  
**"visible": false**   
**}**,   
"required": true  
"value": "GET"  
}
</td>

</tr>

<tr>

<td colspan="1">Readonly</td>

<td colspan="1">Make field readonly in UI</td>

<td colspan="1">

“display”: {

"readonly": true
}

</td>

<td colspan="1">

{  
"name": "method",  
"type": "string",  
**"display": {**  
**"readonly": true**   
**}**,   
"required": true  
}
</td>
</tr>

<tr>

<td colspan="1">Text Field</td>

<td colspan="1">

<span>Render field as a text field.</span>

<span><span>The field type must be</span> **string**<span>.</span>  
</span>

</td>

<td colspan="1">

“display”: {  
"name": \<DISPLAY LABEL\>,  
"description": \<DESCRIPTION\>  
}

</td>

<td colspan="1">

{  
"name": "url",  
"type": "string",  
**"display": {**  
**"name": "URL",**  
**"description": "Select service URL"**  
**}**,   
"required": true  
}
</td>
</tr>

<tr>

<td colspan="1">Choice</td>

<td colspan="1">

Render field as a choice field.

The field type must be **boolean.**

Users will be presented with True or False choice.

</td>

<td colspan="1">

“display”: {  
"name": \<DISPLAY LABEL\>,  
"description":\<DESCRIPTION\>
}

"value": <DEFAULT CHOICE>

</td>

<td colspan="1">

{  
"name": "logheaders",  
"type": "boolean",  
"required": true,  
**"display": {**  
**"name":"Log Incoming headers ",**  
**"description": "Log incoming headers"**
**}**

"value": false  
}

</td>

</tr>

<tr>

<td colspan="1">Checkbox</td>

<td colspan="1">

Render field as a checkbox field.

The field type must be **string.**

The field value would be a comma separated string of all options selected by the user.

</td>

<td colspan="1">

<span>“display”: {</span>  
<span>"name": \<DISPLAY LABEL\>,</span>  
<span>"description":\<DESCRIPTION>,</span>

"type": "checkbox"  
<span>}</span>

<span>"allowed": ["OPTION1",<span>"OPTION2",<span>"OPTION3"</span></span> ],</span>

<span>"value": "<span>OPTION2,<span>OPTION3</span></span>"</span>

</td>

<td colspan="1">

<span>{</span>  
<span>"name": "days",</span>  
<span>"type": "string",</span>  
<span>"required": true,</span>  
**“display”: {**  
****"name":"Select a day ",**  
**"description": "Select a day for the audit",****

********"type": "checkbox"********

**}**

"allowed": ["Monday", "Wednesday", "Friday"],

"value": "Monday"  
<span>}</span>

</td>

</tr>

<tr>

<td>Dropdown</td>

<td colspan="1">

Render field as a dropdown list.

The field type must be **string**.

</td>

<td>

<div class="content-wrapper">

“display”: {  
"name": \<DISPLAY LABEL\>,  
"description": \<DESCRIPTION\>,  
"type": "dropdown",  
"selection": "\<single | multi\>"  
}  
"allowed":[\<ZERO OR MORE ITEMS\>]  
"value": \<DEFAULT VALUE TO BE SELECTED\>

</div>

</td>

<td colspan="1">

{  
"name": "method",  
"type": "string",  
"required": true,  
**"display": {**  
**"name":"Method",**  
**"description": "The REST method used for the requests",**  
**"type":"dropdown",**  
**“selection”:”single”**  
**},**  
"allowed": ["GET","POST","PUT","DELETE"],  
"value": "GET"  
}

================================================

{  
"name": "businessobjects",  
"type": "string",  
"required": true,  
**"display": {**  
**"name":"Business Objects",**  
**"description": "The Salesforce Business Objects for given connection",**  
**"type":"dropdown",**  
**"selection":"single"**  
**}**,  
"allowed": []  
}

</td>

</tr>

<tr>

<td>File Selector</td>

<td colspan="1">

Render field as a file selector.

The field type must be **string**.

</td>

<td>

“display”: {  
"name": \<DISPLAY LABEL\>,

"description": \<DESCRIPTION\>,

"type": "fileselector",

"fileExtensions":[\<ONE OR MORE FILE EXTENSIONS\>]

}

</td>

<td colspan="1">

{  
"name": "certificate",  
"type": "string",  
**"display": {**  
**"name": "Server Certificate"**  
**"description": "Self-signed PEM certificate for secure connection",**  
**“type”: "fileselector",**  
**"fileExtensions": [".pem",".cert",".cer",".crt"]**  
**}**  
"required": true  
}

</td>

</tr>

<tr>

<td>Connection Selector</td>

<td colspan="1">

Render field as a connection selector.

The field type must be **object**.

The connection configuration will be stored in this field for the runtime.

</td>

<td>

"type": "object",  
"display": {  
"type":"connection",  
"name": \<DISPLAY LABEL\>,  
"description": \<DESCRIPTION\>  
},

<span>"allowed":[]</span>

</td>

<td colspan="1">

{  
"name": "connection",  
"type": "object",  
**"display": {**  
**"type":"connection",**  
**"name": "Connection Name",**  
**"description": "Select a Marketo connection"**  
**}**,  
"allowed":[]  
"required": true  
}

</td>

</tr>

<tr>

<td>Table</td>

<td colspan="1">

Render field as a table.

The field type must be **array**.

</td>

<td>

"display": {  
“type”: "table",  
“name”: \<DISPLAY LABEL\>,  
"description": \<DESCRIPTION\>,  
"schema": \<JSON BASED TABLE SCHEMA\>

},  
"value":[{\<DEFAULT VALUE1\>},{\<DEFAULT VALUE2\>}, ...]

</td>

<td colspan="1">

{  
"name": "books",  
"type": "array",  
**"display": {**  
**“type”: "table",**  
**“name”:”Pick Books”,**  
**"description": "The headers you want to send",**  
**"schema": "{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"BookName\":{\"type\":{\"enum\":[\"X\",\"Y\",\"Z\"]}},\"Quantity\":{\"type\":\"number\"}}}"}**,  
"value": [{\"BookName\":\"X\",\"Quantity\":0},{\"BookName\":\"Z\",\"Quantity\":0}]
}

</td>

</tr>

<tr>

<td colspan="1"><span>Password</span></td>

<td colspan="1">

Render field as a secrete type.

Value entered will not be displayed in clear text.

The field type must be **string**.

</td>

<td colspan="1">

“display”: {  
"name": \<DISPLAY LABEL\>,

"description": \<DESCRIPTION\>,

"type": "password"

}

</td>

<td colspan="1">

{  
"name": "userpassword",  
"type": "string",  
"required": true,  
**"display": {**  
**"name":"Enter Password",**  
**"description": "Enter Salesforce password",**  
**"type":"password"**  
**}**

}

</td>

</tr>

<tr>

<td colspan="1">Text Editor</td>

<td colspan="1">

Render field as a text editor for given syntax.

This field can be used to configure a JSON schema.

The field type must be **complex object**.

</td>

<td colspan="1">

“display”: {  
"name": \<DISPLAY LABEL\>,

"description": \<DESCRIPTION\>,

"type": "texteditor",

"syntax": "json"

}

</td>

<td colspan="1">

{  
"name": "responseBody",  
"type": "complex_object",  
**"display": {**  
**“type”: "texteditor",**  
**"description": "An example JSON data that you expect back from the REST service",**  
**“name”:”Response Schema”,**  
**“syntax”:”json”**  
**}**  
}

</td>

</tr>

</tbody>

</table>

Now, lets enhance our Concat activity. How about we let users select a separator for concatenation?

**activity.json**
```json

{
    "name": "concat",
    "title": "Concat Activity",
    "author": "TIBCO Software Inc.",
    "version": "1.0.0",
    "type": "flogo:activity",
     
    "display": {
       "category": "TIBCO",
       "visible": true,
       "smallIcon": "concat-small-icon.png",
       "largeIcon": "concat-large-icon.png",
       "description": "This activity returns concatenation of two strings",
    },
 
    "ref": "TIBCO/activity/concat",
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
            "name": "separator",
            "type": "string",
            "required": true,
            "display": {
               "name": "Separator",
               "type": "dropdown",
               "selection": "single",
               "description": "Select a separator for concatenation"
            },
            "allowed":["-","#"]
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
**activity.go**
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
  
    if context.GetInput(ivField3) == nil {
      // Separator is not configured
      // return error to the engine 
      return false, activity.NewError("Separator is not configured", "CONCAT-4003", nil)
    }
    field3v := context.GetInput(ivField3).(string)
    
    //Set output
    context.SetOutput(ovResult, field1v+field3v+field2v)
	return true, nil
}

```
In above example, users must select a separator. How about we let users decide whether to use separator or not? And what if you dont want to hardcode separator list in the json?

Well, all this can be solved with a simple typescript(ts) code that adhere to following templates:

**activity.module.ts**
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SampleActivityUIContributionHandler} from "./activity";
import { WiServiceContribution } from "wi-studio/app/contrib/wi-contrib";


@NgModule({
  imports: [
  	CommonModule,
  	HttpModule,
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: SampleActivityUIContributionHandler
     }
  ]
})

export default class SampleActivityModule {

}
```
**activity.ts**
```typescript
import {Observable} from "rxjs/Observable";
import {Injectable, Injector, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {
    WiContrib,
    WiServiceHandlerContribution,
    IValidationResult,
    ValidationResult,
    IFieldDefinition
    IActivityContribution,
    ActionResult,
    IActionResult
} from "wi-studio/app/contrib/wi-contrib";

@WiContrib({})
@Injectable()
export class SampleActivityUIContributionHandler extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector) {
        super(injector);
    }

   /**
	* Value for the field
    * Arguments:
    *        fieldName - Name of the field for which value should be returned 
    *        context   - Activity model(activity.json) with latest values
    * Returns:
    *       Observable<any> - In cases where return value depends on external services (e.g. HTTP), return Observable 
    *       any             - Primitive value or Array of primitive values
    */
    
    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        return null;
    }
 
   /** 
    * Validate the field value and/or update visual appearance of the field. 
    * Arguments:
    *        fieldName - Name of the field for which value should be returned 
    *        context   - Activity model(activity.json) with latest values
    * Returns:
    *       Observable<IValidationResult> - In cases where validation depends on external services (e.g. HTTP), return Observable 
    *       IValidationResult             - Result of validation
    */
    validate = (fieldName: string, context: IActivityContribution): Observable<IValidationResult> | IValidationResult => {
       return null;
    }
}
```

Now, lets create two type script files for our Concat activity. In type script, we will make the separator field visible only when users want to use it. We will also construct and return separator list.

![](images/concat-activity-updated.png)

**activity.json**
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
       "largeIcon": "concat-large-icon.png",
       "description": "This activity returns concatenation of two strings",
    },
 
    "ref": "TIBCO/activity/concat",
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

**activity.module.ts**
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
       useClass: ConcatActivityUIContributionHandler
     }
  ]
})

export default class ConcatActivityModule {

}
```
**activity.ts**
```typescript
import {Observable} from "rxjs/Observable";
import {Injectable, Injector, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {
    WiContrib,
    WiServiceHandlerContribution,
    IValidationResult,
    ValidationResult,
    IFieldDefinition
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
         let useSeparatorFieldDef: IFieldDefinition = context.getField("useSeparator") 
         let separatorFieldDef: IFieldDefinition = context.getField("separator")
         if (useSeparatorFieldDef.value && useSeparatorFieldDef.value === true) {
             if (separatorFieldDef.display && separatorFieldDef.display.visible == false {
                 vresult.setVisible(true);
             } 
             if (separatorFieldDef.value === null || separatorFieldDef.value === "") {
               vresult.setError("Separator must be configured");
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
**activity.go**
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
## Connector Contribution

Do you need to integrate with a SAAS service?  Then, you would need a connector to manage connectivity with the SAAS provider.

Like activities, contributing a connector is very easy.

To contribute a connector, create model and typescript files that adhere to following template:

**connector.json**
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
       // Category under which this connector will be displayed
       "category": "TIBCO",
       // Make this connector visible/invisible
       "visible": true,
       // Path to the small icon file.
       // Size Limit:1KB
       // Format: PNG, SVG
       "smallIcon": "jdbc-small-icon.png",
       // Path to the small icon file.
       // Size Limit: 2KB
       // Format: PNG, SVG
       "largeIcon": "jdbc-large-icon.png"
    },
 
    // ref value must be unique and should not conflict with any other connectors.
    // It must be category name followed by lower case connector name.
    // Add your Github repository path in case you are hosting your contributions on github.com
    // e.g. "github.com/<GITHUB USERNAME>/wi-contributions/<CATEGORY SPECIFIED IN DISPLAY CONFIGURATION>/connector/<LOWER CASE CONNECTOR NAME>",
    "ref": "<CATEGORY SPECIFIED IN DISPAY CONFIGURATION>/connector/<LOWER CASE CONNECTOR NAME>",
     
    // One or more configuration fields
    "settings": [
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
**connector.module.ts**
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
**connector.ts**
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
Are you ready to develop some real world connectors?

In the next example, we are going to develop a connector for [Amazon Simple Queue Service](https://aws.amazon.com/sqs/) aka SQS. We will also develop two activities that will use SQS connector to send and receive messages from the SQS. 

Before we start, make sure you have:

*   Access key ID for AWS account
*   Secrete Access Key for AWS account
*   SQS service running in your favorite region

Lets start with the layout. We will create contribution related files as shown below:

![](images/sqs.png)

Now, lets begin with the connector model.

**connector.json**
```typescript
{
    "name": "tibco-sqs",
    "title": "TIBCO SQS Connector",
    "author": "TIBCO Software Inc.",
    "type": "flogo:connector",
    "version": "1.0.0",
 
    "display": {
       "description": "This is Amazon SQS connector",
       "category": "AWS",
       "visible": true,
       "smallIcon": "sqs-small-icon.png",
       "largeIcon": "sqs-large-icon.png"
    },
 
    "ref": "AWS/connector/sqs",
     
    "settings": [
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
Now, lets write type script code for SQS connector.
**connector.module.ts**
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
**connector.ts**
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
```
Now, lets create the activity that will send a message on the queue.

Lets begin with the model. We will refer [http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SendMessage.html) to model our activity.

**activity.json**
```json
{
    "name": "sqssendmessage",
    "version": "1.0.0",
    "author": "TIBCO Software Inc.",
    "type": "flogo:activity",
    "title": "Send SQS Message",
     
    "display": {
       "category": "AWS",
       "visible": true,
       "smallIcon": "sqssendmessage-small-icon.png",
       "largeIcon": "sqssendmessage-large-icon.png",
       "description": "This activity sends a message to the queue",
    },
 
    "ref": "AWS/activity/sqssendmessage",
    "inputs": [
           {
            //Select SQS connection from the list
            "name": "sqsConnection",
            "type": "object",
            "required": true,
            "display":{
              "name": "SQS Connection",
              "description": "Select SQS Connection",
              "type": "connection"
            },
            "allowed":[]
           },
           {
            //Select Queue URL from the list
            "name": "queueUrl",
            "type": "string",
            "required": true,
            "display":{
              "name": "Queue URL",
              "description": "Select Queue URL"
            },
            "allowed":[]
           },
           {
            //Set message attributes
            //JSON should be in the below format
            //{
  		// "<Attrubute1Name>": {
    		//	DataType: "",
    		//	StringValue: ""
   		// },
  		// "<Attrubute2Name>": {
    		//	DataType: "",
    		//	StringValue: ""
   		// },
  		//	...
 	    //}
            "name": "MessageAttribute",
            "type": "complex_type",
            "required": false,
            "display": {
               "name": "Message Attributes",
               "description": "Set message attributes",
               "type": "texteditor",
               "syntax": "json",
               "mappable": true
            },
            //Sample attributes that users can update
            "value": {
              "metadata": "",
              "value": "{ \"Attr1\": {DataType: \"String\",StringValue: \"value1\"},\"Attr2\": {DataType: \"String\",StringValue: \"value2\"}}"
           },
           {
            "name": "DelaySeconds",
            "type": "number",
            "required": false
           },
           {
            "name": "MessageBody",
            "type": "string",
            "required": true
           }
    ],
  
    "outputs": [
           {
            "name": "MessageId",
            "type": "string"
          }
    ]
}
```

Now, lets create type script code to fetch SQS connection and Queue URLs.

**activity.module.ts**
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SQSSendMessageActivityContributionHandler} from "./activity";
import { WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";


@NgModule({
  imports: [
  	CommonModule,
  	HttpModule,
  ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: SQSSendMessageActivityContributionHandler
     }
  ]
})

export default class ConcatActivityModule {

}
```
**activity.ts**
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
    IActionResult,
    ConnectorUtils,
    CORSUtils
} from "wi-studio/app/contrib/wi-contrib";
import {AWS} from 'aws-sdk';

@WiContrib({})
@Injectable()
export class SQSSendMessageActivityContributionHandler extends WiServiceHandlerContribution {
    constructor( @Inject(Injector) injector) {
        super(injector);
    }

    value = (fieldName: string, context: IActivityContribution): Observable<any> | any => {
        if(fieldName === "sqsConnection") {
           //Connector ID must match with the name defined in connector.json
           return ConnectorUtils.getConnectionNames("tibco-sqs");
        } else if(fieldName === "queueUrl") {
           let connectionField: IFieldDefinition = context.getField("sqsConnection");
           // Read connection name 
           if(connectionField.value) {
            //Read connection configuration
            let connectionConfig: IConnectionContribution = ConnectorUtils.getConnectionConfiguration(connectionField.value);
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
```
Now, lets write runtime for the activity.

**activity.go**
```go
package sqssendmessage

import (
    "github.com/TIBCOSoftware/flogo-lib/core/activity"
    "github.com/TIBCOSoftware/flogo-lib/logger"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/credentials"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/sqs"
    "github.com/TIBCOSoftware/flogo-lib/core/data"
)

const (
    ivConnection         = "sqsConnection"
    ivQueueUrl           = "queueUrl"
    ivMessageAttributes  = "MessageAttributes"
    ivDelaySeconds       = "DelaySeconds"
    ivMessageBody        = "MessageBody"
    ovMessageId          = "MessageId"
)

var activityLog = logger.GetLogger("aws-activity-sqssendmessage")

type SQSSendMessageActivity struct {
	metadata *activity.Metadata
}

func NewActivity(metadata *activity.Metadata) activity.Activity {
	return &SQSSendMessageActivity{metadata: metadata}
}

func (a *SQSSendMessageActivity) Metadata() *activity.Metadata {
	return a.metadata
}
func (a *SQSSendMessageActivity) Eval(context activity.Context) (done bool, err error) {
    activityLog.Info("Executing SQS Send Message activity")
    //Read Inputs
    if context.GetInput(ivConnection) == nil {
      return false, activity.NewError("SQS connection is not configured", "SQS-SENDMESSAGE-4001", nil)
    }
    
    if context.GetInput(ivQueueUrl) == nil {
      return false, activity.NewError("SQS Queue URL is not configured", "SQS-SENDMESSAGE-4002", nil)
    }
    
    if context.GetInput(ivMessageBody) == nil {
      return false, activity.NewError("Message body is not configured", "SQS-SENDMESSAGE-4003", nil)
    }


    //Read connection details
    connectionInfo := context.GetInput(ivConnection).(map[string]interface{})
    session, err := session.NewSession(aws.NewConfig().WithRegion(connectionInfo["region"].(string)).WithCredentials(credentials.NewStaticCredentials(connectionInfo["accessKeyId"].(string), connectionInfo["secreteAccessKey"].(string), "")))
    if err != nil {
      return false, activity.NewError(fmt.Sprintf("Failed to connect to AWS due to error:%s. Check credentials configured in the connection:%s.",err.Error(),connectionInfo["name"].(string)), "SQS-SENDMESSAGE-4004", nil)
    }
    //Create SQS service instance
    sqsSvc := sqs.New(session)
    sendMessageInput := &sqs.SendMessageInput{}
    sendMessageInput.QueueUrl = aws.String(context.GetInput(ivQueueUrl).(string))
    sendMessageInput.MessageBody = aws.String(context.GetInput(ivMessageBody).(string))
    
    messageAttributes := context.GetInput(ivMessageAttributes).(*data.ComplexObject)
    if context.GetInput(ivMessageAttributes) != nil {
      //Add message attributes
      messageAttributes := context.GetInput(ivMessageAttributes).(*data.ComplexObject)
      attrs := make(map[string]*sqs.MessageAttributeValue, len(messageAttributes.Value))
      for k, v := range messageAttributes.Value { 
        attrs[k] = &sqs.MessageAttributeValue{
          DataType: aws.String(v["DataType"].(string)),
          StringValue:  aws.String(v["StringValue"].(string)),
        }
      }
      sendMessageInput.MessageAttributes = attrs
    }

    delaySeconds := context.GetInput(ivDelaySeconds)
    if delaySeconds != nil {
      sendMessageInput.DelaySeconds = aws.Int64(delaySeconds.(int64))
    }

    //Send message to SQS
    response, err1 := sqsSvc.SendMessage(sendMessageInput)
    if err1 != nil {
       return false, activity.NewError(fmt.Sprintf("Failed to send message to SQS due to error:%s",err1.Error()), "SQS-SENDMESSAGE-4005", nil)
    }

    //Set Message ID in the output
    context.SetOutput(ovMessageId,*response.MessageId)    
	return true, nil
}
```
**activity_test.go**
```go
package sqssendmessage

import (
	"testing"
	"github.com/TIBCOSoftware/flogo-contrib/action/flow/test"
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
        "github.com/stretchr/testify/assert"
	"io/ioutil"
        "github.com/TIBCOSoftware/flogo-lib/core/data" 
)

var activityMetadata *activity.Metadata
var connectionData = ``
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


    dummyConnectionData := make(map[string]string, 4)
    //Use your AWS information
    dummyConnectionData["name"] = "My SQS Connection"
    dummyConnectionData["accesskeyId"] = "<YOUR ACCESS KEY ID>"
    dummyConnectionData["secreteAccessKey"] = "<YOUR SECRETE ACCESS KEY>"
    dummyConnectionData["region"] = "<REGION NAME WHERE SQS IS RUNNING>"


	tc.SetInput(ivConnection, dummyConnectionData)
    tc.SetInput(ivQueueUrl, <YOUR SQS QUEUE URL>)
    tc.SetInput(ivMessageBody, "Message from TIBCO")


	done, err := act.Eval(tc)
    assert.Nil(t, err)
}
```
Now, lets create the activity that will receive a message from the queue.

Lets begin with the model. We will refer [http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html) to model our activity.

**activity.json**
```json
{
    "name": "sqsreceivemessage",
    "title": "Receive SQS Message",
    "version": "1.0.0",
    "author": "TIBCO Software Inc.",
    "type": "flogo:activity",
      
    "display": {
       "category": "AWS",
       "visible": true,
       "smallIcon": "sqsreceivemessage-small-icon.png",
       "largeIcon": "sqsreceivemessage-large-icon.png",
       "description": "This activity receives a message from the queue",
    },
  
    "ref": "AWS/activity/sqsreceivemessage",
    "inputs": [
           {
            //Select SQS connection from the list
            "name": "sqsConnection",
            "type": "object",
            "required": true,
            "display":{
              "name": "SQS Connection",
              "description": "Select SQS Connection",
              "type": "connection"
            },
            "allowed":[]
           },
           {
            //Select Queue URL from the list
            "name": "queueUrl",
            "type": "string",
            "required": true,
            "display":{
              "name": "Queue URL",
              "description": "Select Queue URL"
            },
            "allowed":[]
           },
           {
            "name": "AttributeNames",
            "type": "array",
            "required": false,
            "display" {
              "name": "Attribute Names",
              "type": "table",
               // Draw table with single column named "AttributeName"
              "schema": "{\r\n    \"$schema\": \"http:\/\/json-schema.org\/draft-04\/schema#\",\r\n    \"definitions\": {},\r\n    \"id\": \"http:\/\/example.com\/example.json\",\r\n    \"items\": {\r\n        \"id\": \"\/items\",\r\n        \"properties\": {\r\n            \"AttributeName\": {\r\n                \"id\": \"\/items\/properties\/AttributeName\",\r\n                \"type\": \"string\"\r\n            }\r\n        },\r\n        \"type\": \"object\"\r\n    },\r\n    \"type\": \"array\"\r\n}"
            }
           },
           {
            "name": "MessageAttributeNames",
            "type": "array",
            "required": false,
            "display" {
              "name": "Message Attributes",
              "type": "table",
               // Draw table with single column named "MessageAttributeName"
              "schema": "{\r\n    \"$schema\": \"http:\/\/json-schema.org\/draft-04\/schema#\",\r\n    \"definitions\": {},\r\n    \"id\": \"http:\/\/example.com\/example.json\",\r\n    \"items\": {\r\n        \"id\": \"\/items\",\r\n        \"properties\": {\r\n            \"AttributeName\": {\r\n                \"id\": \"\/items\/properties\/MessageAttributeName\",\r\n                \"type\": \"string\"\r\n            }\r\n        },\r\n        \"type\": \"object\"\r\n    },\r\n    \"type\": \"array\"\r\n}"
            }
           }
           {
            "name": "MaxNumberOfMessages",
            "type": "integer",
            "required": false,
            "value": 1
           },
           {
            "name": "VisibilityTimeout",
            "type": "integer",
            "required": false
           },
           {
            "name": "WaitTimeSeconds",
            "type": "integer",
            "required": false
           }
    ],
   
    "outputs": [
           {
            "name": "Message",
            "type": "complex_object",
            //JSON object based on receive message output
            "value": {
               "metadata": "",
               "value": "[\r\n  {\r\n    \"Attributes\": {},\r\n    \"Body\": \"\",\r\n    \"MD5OfBody\": \"\",\r\n    \"MD5OfMessageAttributes\": \"\",\r\n    \"MessageAttributes\": {},\r\n    \"MessageId\": \"\",\r\n    \"ReceiptHandle\": \"\"\r\n  }\r\n]"
            }
          }
    ]
}
```

Now, lets create type script code to fetch SQS connection and Queue URLs.

**activity.module.ts**
```typescript
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SQSReceiveMessageActivityContributionHandler} from "./activity";
import { WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";
 
 
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: SQSReceiveMessageActivityContributionHandler
     }
  ]
})
 
export default class ConcatActivityModule {
 
}
```
**activity.ts**
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
```
Now, lets write runtime for the activity.

**activity.go**
```go
package sqsreceivemessage
 
import (
    "github.com/TIBCOSoftware/flogo-lib/core/activity"
    "github.com/TIBCOSoftware/flogo-lib/logger"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/credentials"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/sqs"
    "github.com/TIBCOSoftware/flogo-lib/core/data"
)
 
const (
    ivConnection             = "sqsConnection"
    ivQueueUrl               = "queueUrl"
    ivMessageAttributeNames  = "MessageAttributeNames"
    ivAttributeNames         = "AttributeNames"
    ivMaxNumberOfMessages    = "MaxNumberOfMessages"
    ivVisibilityTimeout      = "VisibilityTimeout"
    ivWaitTimeSeconds        = "WaitTimeSeconds"
    ovMessage                = "Message"
)
 
var activityLog = logger.GetLogger("aws-activity-sqsreceivemessage")
 
type SQSReceiveMessageActivity struct {
    metadata *activity.Metadata
}
 
func NewActivity(metadata *activity.Metadata) activity.Activity {
    return &SQSReceiveMessageActivity{metadata: metadata}
}
 
func (a *SQSReceiveMessageActivity) Metadata() *activity.Metadata {
    return a.metadata
}
func (a *SQSReceiveMessageActivity) Eval(context activity.Context) (done bool, err error) {
    activityLog.Info("Executing SQS Send Message activity")
    //Read Inputs
    if context.GetInput(ivConnection) == nil {
      return false, activity.NewError("SQS connection is not configured", "SQS-RECEIVEMESSAGE-4001", nil)
    }
     
    if context.GetInput(ivQueueUrl) == nil {
      return false, activity.NewError("SQS Queue URL is not configured", "SQS-RECEIVEMESSAGE-4002", nil)
    }
 
 
    //Read connection details
    connectionInfo := context.GetInput(ivConnection).(map[string]interface{})
    session, err := session.NewSession(aws.NewConfig().WithRegion(connectionInfo["region"].(string)).WithCredentials(credentials.NewStaticCredentials(connectionInfo["accessKeyId"].(string), connectionInfo["secreteAccessKey"].(string), "")))
    if err != nil {
      return false, activity.NewError(fmt.Sprintf("Failed to connect to AWS due to error:%s. Check credentials configured in the connection:%s.",err.Error(),connectionInfo["name"].(string)), "SQS-RECEIVEMESSAGE-4003", nil)
    }
    //Create SQS service instance
    sqsSvc := sqs.New(session)
    receiveMessageInput := &sqs.ReceiveMessageInput{}
    receiveMessageInput.QueueUrl = aws.String(context.GetInput(ivQueueUrl).(string))
     
    if context.GetInput(ivAttributeNames) != nil {
      //Add attribute names
      attrs := make([]string, len(context.GetInput(ivAttributeNames)))
      for i, v := range context.GetInput(ivAttributeNames).([]interface{}) {
        attrs[i] = aws.String(v.(string))
      }
      receiveMessageInput.AttributeNames = attrs
    }
   
    if context.GetInput(ivMessageAttributeNames) != nil {
     //Add message attribute names
      attrs := make([]string, len(context.GetInput(ivMessageAttributeNames)))
      for i, v := range context.GetInput(ivMessageAttributeNames).([]interface{}) {
        attrs[i] = aws.String(v.(string))
      }
      receiveMessageInput.MessageAttributeNames = attrs
    }
 
    maxNumberOfMessages := context.GetInput(ivMaxNumberOfMessages)
    if maxNumberOfMessages != nil {
      receiveMessageInput.MaxNumberOfMessages = aws.Int64(maxNumberOfMessages.(int64))
    }
     
    visibilityTimeout := context.GetInput(ivVisibilityTimeout)
    if visibilityTimeout != nil {
      receiveMessageInput.VisibilityTimeout = aws.Int64(visibilityTimeout.(int64))
    }
 
 
    waitTimeSeconds := context.GetInput(ivWaitTimeSeconds)
    if waitTimeSeconds != nil {
      receiveMessageInput.WaitTimeSeconds = aws.Int64(waitTimeSeconds.(int64))
    }
 
    //Receive message from SQS
    response, err1 := sqsSvc.ReceiveMessage(receiveMessageInput)
    if err1 != nil {
       return false, activity.NewError(fmt.Sprintf("Failed to receive message from SQS due to error:%s",err1.Error()), "SQS-RECEIVEMESSAGE-4004", nil)
    }
 
    //Set Message details in the output
    msgs := make([]map[string]interface{}, len(response.Messages))
    if len(response.Messages) > 0 {
      for i, msg := range response.Messages {
       //read attributes
       if len(msg.Attributes) > 0 {
         msgs[i]["Attribute"] = make(map[string]string,len(msg.Attributes) )
         attrs := msgs[i]["Attribute"].(map[string]string)
         for k, v := range msg.Attributes {
          attrs[k] = *v
         }
       }
       //read message attributes
       if len(msg.MessageAttributes) > 0 {
         msgs[i]["MessageAttributes"] = make(map[string]string,len(msg.MessageAttributes) )
         attrs := msgs[i]["MessageAttributes"].(map[string]string)
         for k, v := range msg.MessageAttributes {
          attrs[k] = *v.StringValue
         }
       }
       msgs[i]["Body"] = *msg.Body
       msgs[i]["MD5OfBody"] = *msg.MD5OfBody
       msgs[i]["MD5OfMessageAttributes"] = *msg.MD5OfMessageAttributes
       msgs[i]["MessageId"] = *msg.MessageId
       msgs[i]["ReceiptHandle"] = *msg.ReceiptHandle
     }
    }
    output := &data.ComplexObject{Metadata:"", Value: msgs}
    context.SetOutput(ovMessage,output)   
    return true, nil
}
```

**activity_test.go**
```go
package sqsreceivemessage
 
import (
    "testing"
    "github.com/TIBCOSoftware/flogo-contrib/action/flow/test"
    "github.com/TIBCOSoftware/flogo-lib/core/activity"
    "github.com/stretchr/testify/assert"
    "io/ioutil"
    "github.com/TIBCOSoftware/flogo-lib/core/data"
)
 
var activityMetadata *activity.Metadata
var connectionData = ``
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
 
 
    dummyConnectionData := make(map[string]string, 4)
    //Use your AWS information
    dummyConnectionData["name"] = "My SQS Connection"
    dummyConnectionData["accesskeyId"] = "<YOUR ACCESS KEY ID>"
    dummyConnectionData["secreteAccessKey"] = "<YOUR SECRETE ACCESS KEY>"
    dummyConnectionData["region"] = "<REGION NAME WHERE SQS IS RUNNING>"
 
    tc.SetInput(ivConnection, dummyConnectionData)
    tc.SetInput(ivQueueUrl, <YOUR SQS QUEUE URL>)
    done, err := act.Eval(tc)
    assert.Nil(t, err)
     
}
```









# [Connectors for TIBCO Business Studio - Cloud Edition](https://github.com/TIBCOSoftware/tci-studio-samples)
## Sample connectors
* [GloSS](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/GloSS)
* [Sample for Amazon SNS](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Amazon%20SNS)
* [Sample for Amazon SQS](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Amazon%20SQS)
* [Sample for Dropbox](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Dropbox)
* [Sample for Elastic Cloud](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Elastic%20Cloud)
* [Sample for Google Apps](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Google%20Apps)
* [Sample for IBM Watson](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20IBM%20Watson)
* [Sample for IBM Watson Retrieve & Rank](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20IBM%20Watson%20Retrieve%20%26%20Rank)
* [Sample for LinkedIn](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20LinkedIn)
* [Sample for Microsoft DCRM](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Microsoft%20DCRM)
* [Sample for Microsoft Translator](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Microsoft%20Translator)
* [Sample for Microsoft Yammer](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Microsoft%20Yammer)
* [Sample for MongoDB](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20MongoDB)
* [Sample for Nats.io](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Nats.io)
* [Sample for Slack](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Slack)
* [Sample for Splunk](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Splunk)
* [Sample for Stripe](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Stripe)
* [Sample for SugarCRM](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20SugarCRM)
* [Sample for SurveyMonkey](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20SurveyMonkey)
* [Sample for Twilio](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Twilio)
* [Sample for Zendesk](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Zendesk)
* [Sample for Zuora](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Zuora)

## Sample projects
* [Sample for Netsuite](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Netsuite)
* [Sample for SOAP Currency Converter](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20SOAP%20Currency%20Converter)
* [Sample for Salesforce](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Salesforce)
* [Sample for Salesforce to Marketo](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Salesforce%20to%20Marketo)
* [Sample for Marketo](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Marketo)
* [Sample for Cloud Messaging](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Sample%20for%20Cloud%20Messaging)
* [Petstore Sample](https://github.com/TIBCOSoftware/tci-studio-samples/tree/master/TIBCO%20Business%20Studio-Cloud%20Edition/Petstore%20Sample)

# Contribute your own?
In order to have your connector or extension listed here, please follow the instructions below.
* Fork this repo
* Update the section you want to have your submission listed
* Create a PR against and one of the admins will review it

You can also send an email to tci@tibco.com

# Note

_The third-party projects available via these links are available under separate software license terms and are not part of any TIBCO product. TIBCO makes no representations or warranties concerning these projects and they are not covered by the terms of any agreement you may have with TIBCO, including any terms concerning support, maintenance, warranties, and indemnities.  Download and use of these projects is solely at your own discretion and subject to the license terms applicable to them._
