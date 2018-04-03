---
date: 2016-04-09T16:50:16+02:00
title: Amazon SQS
weight: 255
---

Let's develop a connector for [Amazon Simple Queue Service](https://aws.amazon.com/sqs/), also known as SQS and create two activities that will use the SQS connector to send and receive messages. 

To follow along, please make sure you have:

* An access key ID for your AWS account
* A Secret Access Key for your AWS account
* Access to SQS in your favorite region

If you follow along with the steps your layout at the end should be:

```
AWS
├───activity
│   ├───sqsreceivemessage
│   |   ├───activity.json
│   |   |───activity.go
│   |   |───activity_test.go
│   |   |───activity.ts
│   |   |───activity.module.ts
│   |   └───sqsreceivemessage.png
│   └───sqssendmessage
│       ├───activity.json
│       |───activity.go
│       |───activity_test.go
│       |───activity.ts
│       |───activity.module.ts
│       └───sqssendmessage.png
└───connector
    └───sqs
        ├───connector.json
        |───connector.ts
        |───connector.module.ts
        └───sqs.png
```

The complete code of this connector and the two activities can be found in our [GitHub](https://github.com/TIBCOSoftware/tci-flogo/tree/master/examples/AWS) repo too.