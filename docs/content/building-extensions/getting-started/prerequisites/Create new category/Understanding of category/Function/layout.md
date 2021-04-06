---
date: 2016-04-09T16:50:16+02:00
title: Layout
weight: 1
---

#Layout

Function layout as simple as below

## Function
| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [descriptor.json](https://github.com/project-flogo/contrib/tree/master/function/json/descriptor.json)     | The `descriptor.json` describes the model, the meta data, of the activity. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [functioName.go](https://github.com/project-flogo/contrib/tree/master/function/json/path.go)   | Every extension must write the runtime code in Go (`functionName.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`functionName_test.go`) for your extension.
| Runtime dependence  | go.mod | [go.mod](https://github.com/project-flogo/contrib/tree/master/function/json/go.mod) | The `go.mod` file describes all dependencies requires for this function and the function model name. Note here: The module name should be the ref of the contribution.


```
|───functionCategoryName
│   └───descriptor.json
│   └───function.go
│   └───go.mod
```
