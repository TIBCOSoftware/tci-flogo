# json.path Sample

## Description

This is json.path sample. It demonstrates, how to get value from JSON object using json.path expression.
json.path mapper function is used to extract a specific element from an Object
JSONPath is an XPath like query language for JSON. 
Reference: https://github.com/oliveagle/jsonpath

For example - if we have Books JSON Object, and we want to get value of category of the 1st book, then we will use json.path function as below -

json.path("$.book[0].category", $flow.body.store)

	* 1st argument - JSONPath syntax of the element
	* 2nd argument - JSON Object in which to find the element

## Operators
referenced from github.com/jayway/JsonPath

Operator | Supported | Description
-------- | --------- | -----------
$ |	Y | The root element to query. This starts all path expressions.
@ | Y | The current node being processed by a filter predicate.
* | X | Wildcard. Available anywhere a name or numeric are required.
.. | X | Deep scan. Available anywhere a name is required.
. | Y | Dot-notated child
['' (, '')] | X | Bracket-notated child or children
[ (, )] | Y | Array index or indexes
[start:end] | Y |Array slice operator
[?()] | Y | Filter expression. Expression must evaluate to a boolean value.



## Examples

1. json.path("$.book[0].category", $flow.body.store)  ---> Will return reference
2. json.path("$.book[?(@.author == 'Nigel Rees')].category[0]", $flow.body.store) ---> Will return reference
3. json.path("$.book[?(@.Availability[?(@.Quantity >= 6000)])].category[0]", $flow.body.store) --> Will return fiction3
4. json.path("$.book[?(@.Availability[?(@.Address[?(@.city == 'sugarland')])])].category[0]", $flow.body.store) ---> Will return fiction2

## Understanding the configuration

In the attached sample *jsonpath.sample.json*, there is a flow *jsonpath example* which takes book store object *bookstore_input.json* as input and returns book category attribute value using json.path function. It also returns book category when book author is 'Nigel Rees', when Availability Quantity is >=6000, when Availability Address city is 'sugarland'
You can also import FLOGO Tester Launch Configuration - *jsonpath_example_Launch_Configuration_1.json*, attached in this sample and start testing in Flow Tester.

## Contributing
If you want to build your own activities for Flogo please read the docs here.

If you want to showcase your project, check out [tci-awesome](https://github.com/TIBCOSoftware/tci-awesome)

You can also send an email to `tci@tibco.com`

## Feedback
If you have feedback, don't hesitate to talk to us!

* Submit feature requests on our [TCI Ideas](https://ideas.tibco.com/?project=TCI) or [FE Ideas](https://ideas.tibco.com/?project=FE) portal
* Ask questions on the [TIBCO Community](https://community.tibco.com/answers/product/344006)
* Send us a note at `tci@tibco.com`


## License
This TCI Flogo SDK and Samples project is licensed under a BSD-type license. See [license.txt](license.txt).
