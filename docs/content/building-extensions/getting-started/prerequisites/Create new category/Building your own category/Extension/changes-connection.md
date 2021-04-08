---
date: 2016-04-09T16:50:16+02:00
title: Edit Connection
weight: 3
---


## Connection 

Now let's go to connection folder ${GOPATH}/src/github.com/tibco/Template/src/app/Template

* connector.js   -> Model file which has all fields and actions
* connection.go   -> Connection runtime code
* connection.module.ts -> UI module code
* connection.handle.ts -> UI contribution handle code


## Edit

* Add/Edit/Delete fields in connector.json base on connection requirements.
* If #1 fields requires for runtime, you have to expose connection struct. 
* If you need add fields validation or dynamically change the field value, please add to `connection.handle.ts`
* The action code with the template just verify to see if there is duplicate connection already exist.


