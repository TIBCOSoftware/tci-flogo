    ---
date: 2016-04-09T16:50:16+02:00
title: Organizing your code
weight: 51
pre: "<i class=\"fa fa-folder-open\" aria-hidden=\"true\"></i> "
---

This page describe how to develop single independent Project FLOGO contribution

The contribution includes `activity`, `trigger`, `function`, 

I will take [Log](https://github.com/project-flogo/contrib/blob/master/activity/log) activity, [REST](https://github.com/project-flogo/contrib/tree/master/trigger/rest) Trigger and [JSON](https://github.com/project-flogo/contrib/tree/master/function/json) function as example below.

## Activity
| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [descriptor.json](https://github.com/project-flogo/contrib/blob/master/activity/log/descriptor.json)                    | The `descriptor.json` describes the model, the meta data, of the activity. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [activity.go<br/>activity_test.go](https://github.com/project-flogo/contrib/blob/master/activity/log/activity.go)   | Every extension must write the runtime code in Go (`activity.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`activity_test.go`) for your extension.
| Runtime dependence | go.mod | [go.mod](https://github.com/project-flogo/contrib/blob/master/activity/log/go.mod) | The `go.mod` file describes all dependencies requires for this activity and the model name. Note here: The module name should be the ref of the contribution. 

## Trigger
| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [descriptor.json](https://github.com/project-flogo/contrib/blob/master/trigger/rest/descriptor.json)                    | The `descriptor.json` describes the model, the meta data, of the activity. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [activity.go<br/>activity_test.go](https://github.com/project-flogo/contrib/blob/master/trigger/rest/trigger.go)   | Every extension must write the runtime code in Go (`trigger.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`trigger.go`) for your extension.
| Runtime dependence | go.mod | [go.mod](https://github.com/project-flogo/contrib/blob/master/trigger/rest/go.mod) | The `go.mod` file describes all dependencies requires for this trigger and the contribution model name. Note here: The module name should be the ref of the contribution.

**Note** For activity and trigger
* The suffix of module name in go.mod file must be the activity or trigger name.  Take [JSON](https://github.com/project-flogo/contrib/blob/master/activity/log/go.mod) as example, the name must be `log`

## Function
| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [descriptor.json](https://github.com/project-flogo/contrib/tree/master/function/json/descriptor.json)     | The `descriptor.json` describes the model, the meta data, of the activity. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [functioName.go](https://github.com/project-flogo/contrib/tree/master/function/json/path.go)   | Every extension must write the runtime code in Go (`functionName.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`functionName_test.go`) for your extension.
| Runtime dependence  | go.mod | [go.mod](https://github.com/project-flogo/contrib/tree/master/function/json/go.mod) | The `go.mod` file describes all dependencies requires for this function and the function model name. Note here: The module name should be the ref of the contribution.

**Note**
* The suffix of module name in go.mod file must be the function `category` *json* name.  Take [JSON](https://github.com/project-flogo/contrib/tree/master/function/json as example, the name must be `json`
* The folder name of the function must be `category` name.
* The root name of field in descriptor.json must be `category` name as well. 
* Each functions name in descriptor.json must match the name that return from runtime go code `Name` method 
```
func (fnPath) Name() string {
  return "path"
  }
```

## Folder Layout 

The layout of your folder has to follow a specific structure.
```
│ <activity name>
│        └───activity.go
│        └───descriptor.json
│        └───go.mod

```

```
│ <trigger name>
│        └───activity.go
│        └───descriptor.json
│        └───go.mod

```

```
|───functionCategoryName
│   └───descriptor.json
│   └───function.go
│   └───go.mod
```

**Note**
Please note that names of activities and connectors should be in lowercase