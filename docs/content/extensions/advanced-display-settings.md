---
date: 2016-04-09T16:50:16+02:00
title: Advanced display configuration options
weight: 40
---

## Advanced configuration options
What we have seen so far is a fairly simple contribution. How about an activity that displays a dropdown list or displays input/output structure based on a JSON schema? The good news is that you can use the **display** configuration in the model `activity.json` file to do just that!

### Data types
There are a few different data types that you can use in your configuration

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

[data.ComplexObject](https://godoc.org/github.com/TIBCOSoftware/flogo-lib/core/data#ComplexObject)

</div>

</td>

<td colspan="1">

It has two parts:

1.  Metadata - A `stringified` JSON schema that can be used for the data validation
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

### Display settings
Each field has various display settings that will determine how they show up in the UI.

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