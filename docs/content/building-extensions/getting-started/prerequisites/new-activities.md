---
date: 2016-04-09T16:50:16+02:00
title: Create new activities
weight: 5
---

Creating new activities for the Flogo in TIBCO Cloud<sup>&trade;</sup> Integration and/or TIBCO Flogo<sup>&reg;</sup> Enterprise isn't hard. Depending on your requirements a new activity requires a bit of Go and possibly a bit of TypeScript. The TIBCO Cloud<sup>&trade;</sup> Integration - Flogo<sup>&reg;</sup> and TIBCO Flogo<sup>&reg;</sup> Enterprise are powered by [Project Flogo](https://flogo.io), so when you're developing extensions the runtime parts are the same as you would create them for Flogo. That also means that extensions for Flogo will work in TIBCO Cloud<sup>&trade;</sup> Integration - Flogo<sup>&reg;</sup> or in TIBCO Flogo<sup>&reg;</sup> Enterprise and vice versa! It does lead you to a second choice :)

We use TypeScript to enhance the user experience of the activities you can build. With that you can call out to external services to retrieve additional information (for example the business objects you have access to from Salesforce.com) or validate a zip code. If you want to leverage the out of the box user experience of TIBCO Cloud Integration or TIBCO Flogo Enterprise, the only thing you'll need to worry about is writing the Go code for your extension.

## Let's get started
* Prepare the environment [Here](./../../dev-environment/)
* Organizing the code [Here](../../../organizing-code/)