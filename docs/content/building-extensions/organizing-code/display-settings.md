---
date: 2016-04-09T16:50:16+02:00
title: Display settings
weight: 60
---

The **display** element in the `activity.json`, `connector.json` and the `trigger.json` files can be used to enhance the user experience even more!

## Types
Each display element has a type associated with it. The below table displays the types you can use and the **Go type** column shows how that translates into Go data types you can use in your `activity.go` file

| Type           | Go type                  | Description 
| -------------- | ------------------------ | ----------- 
| string         | string                   | A string        
| integer        | int64                    | A 64-bit integer
| boolean        | bool                     | A boolean
| number         | float64                  | A 64-bit float
| complex_object | [data.ComplexObject](https://godoc.org/github.com/TIBCOSoftware/flogo-lib/core/data#ComplexObject) | It has two parts: 1. Metadata - A `stringified` JSON schema that can be used for the data validation 2. Value - A JSON data that is being passed to the runtime Use this type when you need schema and data together for given field. To use this type, import package [github.com/TIBCOSoftware/flogo-lib/core/data](http://github.com/TIBCOSoftware/flogo-lib/core/data) into your code.
| array          | []map[string]interface{} | A JSON array value like `'[{"a":"1", "b":"2"},{"a":"2", "b":"3"},{"a":"4", "b":"5"}]'` can be set to array field.
| object         | map[string]interface{}   | A JSON object

## Special types
There are a few special types that you can use in your `activity.json` and `connector.json` files to enhance the user experience even further. These special types drive the user interface and are "translated" to the type you selected for it during runtime.

| Type         | Description                                                                              | Example 
| ------------ | ---------------------------------------------------------------------------------------- | --------
| TextField    | Renders a text field on the screen (the type must be string)                             | <pre>{ &quot;name&quot;: &quot;url&quot;, &quot;type&quot;: &quot;string&quot;, &quot;display&quot;: {&quot;name&quot;: &quot;URL&quot;, &quot;description&quot;: &quot;Select service URL&quot; }, &quot;required&quot;: true}</pre>
| Choice       | Renders true and false radio buttons (the type must be bool)                             | <pre>{ &quot;name&quot;: &quot;logheaders&quot;, &quot;type&quot;: &quot;boolean&quot;, &quot;required&quot;: true, &quot;display&quot;: { &quot;name&quot;:&quot;Log Incoming headers &quot;, &quot;description&quot;: &quot;Log incoming headers&quot; } &quot;value&quot;: false }</pre>
| Dropdown     | Renders a dropdown list (the type must be string)                                        | <pre>{ &quot;name&quot;: &quot;method&quot;, &quot;type&quot;: &quot;string&quot;, &quot;required&quot;: true, &quot;display&quot;: { &quot;name&quot;:&quot;Method&quot;, &quot;description&quot;: &quot;The REST method used for the requests&quot;, &quot;type&quot;:&quot;dropdown&quot;, “selection”:”single” }, &quot;allowed&quot;: [&quot;GET&quot;,&quot;POST&quot;,&quot;PUT&quot;,&quot;DELETE&quot;], &quot;value&quot;: &quot;GET&quot; }</pre> or <pre> { &quot;name&quot;: &quot;businessobjects&quot;, &quot;type&quot;: &quot;string&quot;, &quot;required&quot;: true, &quot;display&quot;: { &quot;name&quot;:&quot;Business Objects&quot;, &quot;description&quot;: &quot;The Salesforce Business Objects for given connection&quot;, &quot;type&quot;:&quot;dropdown&quot;, &quot;selection&quot;:&quot;single&quot; }, &quot;allowed&quot;: [] }</pre>
| FileSelector | Renders a file selector (the type must be string)                                        | <pre>{ &quot;name&quot;: &quot;certificate&quot;, &quot;type&quot;: &quot;string&quot;, &quot;display&quot;: { &quot;name&quot;: &quot;Server Certificate&quot; &quot;description&quot;: &quot;Self-signed PEM certificate for secure connection&quot;, “type”: &quot;fileselector&quot;, &quot;fileExtensions&quot;: [&quot;.pem&quot;,&quot;.cert&quot;,&quot;.cer&quot;,&quot;.crt&quot;] } &quot;required&quot;: true }</pre>
| Connector    | Renders a dropdown which only picks connectors (the type must be object)                 | <pre>{ &quot;name&quot;: &quot;connection&quot;, &quot;type&quot;: &quot;object&quot;, &quot;display&quot;: { &quot;type&quot;:&quot;connection&quot;, &quot;name&quot;: &quot;Connection Name&quot;, &quot;description&quot;: &quot;Select a Marketo connection&quot; }, &quot;allowed&quot;:[] &quot;required&quot;: true }</pre>
| Table        | Renders a table (the type must be array)                                                 | <pre>{ &quot;name&quot;: &quot;books&quot;, &quot;type&quot;: &quot;array&quot;, &quot;display&quot;: { &quot;type&quot;: &quot;table&quot;, &quot;name&quot;:&quot;Pick Books&quot;, &quot;description&quot;: &quot;The headers you want to send&quot;, &quot;schema&quot;: &quot;{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"BookName\":{\"type\":{\"enum\":[\"X\",\"Y\",\"Z\"]}},\"Quantity\":{\"type\":\"number\"}}}&quot;}, &quot;value&quot;: [{\"BookName\":\"X\",\"Quantity\":0},{\"BookName\":\"Z\",\"Quantity\":0}] }</pre>
| Password     | Renders a password field (the type must be string)                                       | <pre>{ &quot;name&quot;: &quot;userpassword&quot;, &quot;type&quot;: &quot;string&quot;, &quot;required&quot;: true, &quot;display&quot;: { &quot;name&quot;:&quot;Enter Password&quot;, &quot;description&quot;: &quot;Enter Salesforce password&quot;, &quot;type&quot;:&quot;password&quot; } }</pre>
| TextEditor   | Renders a text editor to paste JSON schemas or objects (the type must be complex_object) | <pre>{ &quot;name&quot;: &quot;responseBody&quot;, &quot;type&quot;: &quot;complex_object&quot;, &quot;display&quot;: { &quot;type&quot;: &quot;texteditor&quot;, &quot;description&quot;: &quot;An example JSON data that you expect back from the REST service&quot;, &quot;name&quot;:&quot;Response Schema&quot;, &quot;syntax&quot;:&quot;json&quot; } }</pre>

## Other settings
Apart from the type, you can also set a two other elements in the display setting of your `activity.json` and `connector.json` files:

| Element  | Explanation                                                           | Example 
| -------- | --------------------------------------------------------------------- | ----------- 
| visible  | Toggles the visibility of the field (default sets visibility to true) | `"display": { "visible": false }`
| readonly | Toggles the editability of the field (default sets readonly to false) | `"display": { "readonly": true }`