# array.forEach Sample



This is array.forEach sample. It demonstrates how to filter arrays based on certain condition.

array.forEach function is used for array to array mapping or filter an array based on condition

For example - if we want to filter cakes array based on type “donut”, we can use below expression

array.forEach($flow.body.cakes,"cakes",$loop.type=="donut")

1st argument - source array to iterate over,
2nd argument - the scopeName
3rd argument - the condition to filter an array elements.

Few Examples:
array.forEach($flow.body.cakes,"cakes",$loop.type=="donut") ==> If you want to filter cakes array on its type "donut"

array.forEach($loop[cakes].batters.batter,"batter",$loop.type=="Regular") ==> If you want to filter batter array inside cakes array based on its type "Regular"

array.forEach($loop[cakes].topping,"topping",$loop.type=="Powdered Sugar") ==> If you want to filter topping array inside cakes array based on its type "Powdered Sugar"

In the attached sample (array.foreach.sample.json), there is a flow "FilterCakesNestedArray" which cakes array (cakes_input.json) as input and filters it based on cakes type, batter type and topping type. 

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
