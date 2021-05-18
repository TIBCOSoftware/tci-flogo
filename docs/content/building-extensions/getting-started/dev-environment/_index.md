---
date: 2016-04-09T16:50:16+02:00
title: Set up your environment
weight: 3
---

Let's get started with the setup of your development environment!

## The Go part
TIBCO Cloud<sup>&trade;</sup> Integration - Flogo<sup>&reg;</sup> and TIBCO Flogo<sup>&reg;</sup> Enterprise are powered by [Project Flogo](https://flogo.io), so when you're developing extensions the runtime parts are the same as you would create them for Project Flogo. That also means that extensions for Project Flogo will work in TIBCO Cloud<sup>&trade;</sup> Integration - Flogo<sup>&reg;</sup> or in TIBCO Flogo<sup>&reg;</sup> Enterprise and vice versa.

To install the Project Flogo parts you need to:

* First install the [Go programming language](https://golang.org/doc/install). 

{{% notice info %}}
Don't forget to set your `GOPATH` variable and make sure that `$GOPATH/bin` is part of your path. (see [here](https://golang.org/doc/code.html#GOPATH) or [here](https://github.com/golang/go/wiki/Setting-GOPATH) for more details)
{{% /notice %}}

Assuming that you want to test your extensions, and as a good developer you really should, you'll need a few extra packages:

* [core](https://github.com/project-flogo/core) contains the api and core libraries that are used to create and extend the Flogo Engine.
* [test](https://github.com/project-flogo/contrib/blob/master/activity/rest/activity_test.go) is a simple mechanism to test activity, the Go parts of your extensions

## The TypeScript part
The user interface for your activities can either be generated from the **descriptor.json** files of your extension, or you have the ability to enhance them with a bit of TypeScript.

{{% notice tip %}}
The latest release of the SDK can be found in the **releases** section of the [repository] (https://github.com/TIBCOSoftware/tci-flogo/releases).
{{% /notice %}}

