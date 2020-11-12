# Hello World Sample


This sample is a simple Flogo app that prints and returns a greeting based on the input you provide to it. It uses a HTTP trigger to receive a HTTP message with the following parameters:
* Port: 9999
* Method: GET
* Resource path: `/hello/{name}`

The trigger of this sample retrieves the value of the path parameter `name` which is passed to the activities of the flow named sayHello. This flow includes two activities:
1. Log activity: it prints `Name: {name}` in the logs. Ex: `Name: world` if you entered 'world' as a path parameter.
2. Return activity: it returns a JSON object `{ "message": "Hello world"}` if you entered 'world' as a path parameter.

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
