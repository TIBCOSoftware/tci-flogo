---
date: 2016-04-09T16:50:16+02:00
title: Prerequisites
weight: 6
---

We are as excited as you to help you develop new cool contributions that will enable application developers do better integration with hundreds of services.

Before we start, you should

* Create an account on TIBCO Cloud Integration(TCI). Just sign up for free trial account.
* Read Flogo documentation. Get familiar with key concepts like Application, Flow, Activity, Trigger, Connection.
* Read about Go Programming Language (1.14 and above). The Flogo runtime is powered by Open Source Project Flogo.
* Read about Angular TypeScript concepts like NgModule, Service, fat Arrow Functions, ReactiveX
* Read about JSON
* Read Flogo Typescript SDK


You can add following contributions:

* `Activity` - Add new activity to Flogo. An activity takes one or more inputs and construct one or more output values.
* `Trigger` - Add new trigger to Flogo. An trigger can receive event and trigger flows
* `Connection` - Add new connection type to Flogo. A connector defines one or more configurations and makes connection with external services e.g. Salesforce, Database etc.
* `Function` -Add new function to Flogo.  A function define a specific function that does a specific job

Sounds exciting? Want to jump to coding?

Before you start you need to make a few choices, but don't worry we'll be here to help you!

## Build or Reuse?
Extensions for TIBCO Cloud<sup>&trade;</sup> Integration - Flogo<sup>&reg;</sup> and TIBCO Flogo<sup>&reg;</sup> Enterprise follow the same model as [Project Flogo](https://flogo.io) does for the runtime parts and can be extended with TypeScript to enhance the user experience in the browser. For example, you might want to retrieve the business objects from Salesforce.com based on the connection details or show a series of checkboxes based on other configuration data. The choice you have to make is how you want to get started:

* [Reuse Project Flogo activities](use-project-flogo): Because the Flogo in TIBCO<sup>&reg;</sup> Cloud Integration and TIBCO Flogo<sup>&reg;</sup> Enterprise is powered by Project Flogo you can use activities you find on GitHub in Flogo as well!
* [Create new activities](./create-new): You can also create brand new activities and you have a choice to enhance the user experience there with TypeScript or simply rely on Flogo to generate the user experience for you.

## An account for TIBCO Cloud Integration or TIBCO Flogo Enterprise setup

If you want to test the extensions you build, you'll need an account for TIBCO Cloud Integration or TIBCO Flogo Enterprise setup. You can [sign up](https://www.tibco.com/products/tibco-cloud-integration) for a 30 day free trial account for TIBCO Cloud Integration!