---
date: 2016-04-09T16:50:16+02:00
title: Edit Template
weight: 3
---


## Function

Now let's go to function folder ${GOPATH}/src/github.com/tibco/function/math/

* description.json   -> Description file which describe all function and it's arguments
* math.go   -> Runtime code
* go.mod -> Go runtime depedences file, the mod name must suffix with function category name

## Edit
* descriptor.json for only UI. we need make sure that all argument list in descriptor must match the argument define in runtime.
* Adding more functions under math category.

![img.png](../img.png)