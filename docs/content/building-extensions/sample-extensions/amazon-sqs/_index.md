---
date: 2016-04-09T16:50:16+02:00
title: Amazon SQS
weight: 255
---

Let's develop a connector for [Amazon Simple Queue Service](https://aws.amazon.com/sqs/), also known as SQS by creating one activity and one trigger that will use the SQS connector to send and receive messages. 

To follow along, please make sure you have:

* An access key ID for your AWS account
* A Secret Access Key for your AWS account
* Access to SQS in your favorite region

If you follow along with the steps your layout at the end should be:

```
AWSSQS
├───activity
│   └───sqssendmessage
│       ├───descriptor.json
│       |───activity.go
│       |───activity_test.go
│       |───activity.ts
│       |───activity.module.ts
│       └───sqssendmessage.png
│───connector
│    └───sqs
│        ├───descriptor.json
│        ├───connection.go
│        |───connector.ts
│        |───connector.module.ts
│        └───sqs.png
│        └───connector
│───trigger
│    └───sqsreceivemessage
│        ├───descriptor.json
│        |───trigger.ts
│        |───trigger.go
│        |───metadata.go
│        |───trigger.module.ts
│        └───sqsreceivemessage.png
│───contribution.json
```

The complete code of this connector and the two activities can be found in our [GitHub](https://github.com/TIBCOSoftware/tci-flogo/tree/master/samples/extensions/AWSSQS) repo too.
