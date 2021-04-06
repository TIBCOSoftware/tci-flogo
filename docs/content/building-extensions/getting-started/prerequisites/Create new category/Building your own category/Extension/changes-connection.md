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

* Add/Edit/Delete fields in connector.json to show on connection ui page base on connection requirements.
* If #1 fields requires for runtime, you have to added them in connection.go connection struct. 
* If you need add validation or new added field, please add into `connection.handle.ts`
* The action code with template just verify to see if there is duplicate connection name already exist.
