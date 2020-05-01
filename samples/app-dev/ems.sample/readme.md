# Using EMS extension in Flogo leveraging TCI supplement mechanism


## Description

This is EMS sample. It demonstrates how to use EMS extension in Flogo leveraging TCI supplement mechanism.
EMS connector allows you to send or receive message from TIBCO Enterprise Messaging Service (EMS).

## Capabilities included

* Connection - Connection configuration
* Trigger - Receive message(text/object) on topic/queue
* Activity - Send message(text/object) on topic/queue

## Prerequisites

* For connector to work in TCI, Linux EMS native libraries must be uploaded. To upload required libraries, we will be using TCI supplement mechanism using the below command -
* tibcli flogoconnector supplement EMS*

* Upload the connector from this github location - https://github.com/TIBCOSoftware/tci-flogo/tree/master/samples/extensions/EMS 


## Understanding the configuration

Once you have supplemented EMS from tibcli and uploaded extenstion to TCI, then import the attached *ems.sample.json* app in TCI. 


You will need to configure the EMS Connection used in the app. You can either use EMS hosted on public cloud or hosted on your on-premise machines.


In order to use on-prem EMS server in TCI, you will either have to attach VPN Connection to your app or attach Access Key to use Hybrid Connectivity.


For more details on how to use *Hybrid Connectivity/tibtunnel/Proxy Agent*, please refer this TCI documentation - https://integration.cloud.tibco.com/docs/using/hybrid-connectivity/proxy-agent/using-proxy-agent.html


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
