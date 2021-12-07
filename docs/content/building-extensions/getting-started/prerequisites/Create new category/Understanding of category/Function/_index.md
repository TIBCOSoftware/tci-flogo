---
title: Function
weight: 3
chapter: true
pre: "<i class=\"fa fa-bolt\" aria-hidden=\"true\"></i> "
---

# Function

## Function
| Component       | Technology | Filename                           | Description
| --------------- | ---------- | ---------------------------------- | -----------
| Model           | JSON       | [descriptor.json](./function-model-runtime/#model)     | The `descriptor.json` describes the model, the meta data, of the activity. It describes, among other things, what the input and outputs are, who built it and which version you're using.
| Runtime         | Go         | [functioName.go](./function-model-runtime/#runtime)   | Every extension must write the runtime code in Go (`functionName.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`functionName_test.go`) for your extension.
| Runtime dependence  | go.mod | [go.mod](./function-model-runtime/#runtime) | The `go.mod` file describes all dependencies requires for this function and the function model name. Note here: The module name should be the ref of the contribution.

**Note**
* The suffix of module name in go.mod file must be the function `category` name.  Take [JSON](https://github.com/project-flogo/contrib/tree/master/function/json) as example, the name must be `json`
* The folder name of the function must be `category` name.
* The root name of field in descriptor.json must be `category` name as well.
* Each functions name in descriptor.json must match the name that return from runtime go code `Name` method
```
func (fnPath) Name() string {
  return "path"
  }
```