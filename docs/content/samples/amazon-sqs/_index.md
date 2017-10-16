---
title: Amazon SQS
weight: 4

---

Let's develop a connector for [Amazon Simple Queue Service](https://aws.amazon.com/sqs/), also known as SQS and create two activities that will use the SQS connector to send and receive messages. 

To follow along, please make sure you have:

*   An access key ID for AWS account
*   A Secret Access Key for AWS account
*   SQS service running in your favorite region

If you follow along with the steps your layout at the end should be:

![sqs.png](https://raw.githubusercontent.com/TIBCOSoftware/tci-webintegrator/master/images/sqs.png)

The steps:

* Create the SQS Connector
* Create a SQS Send Message Activity
* Create a SQS Receive Message Activity