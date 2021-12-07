---
date: 2016-04-09T16:50:16+02:00
title: Function model and runtime
weight: 2
---

## Model

Function model describe as json
```json
{
  "name": "json",
  "type": "flogo:function",
  "version": "0.10.0",
  "title": "Json Functions",
  "description": "Json Functions",
  "homepage": "https://github.com/prject-flogo/contrib/tree/master/function/json",
  "functions": [
    {
      "name": "path",
      "description": "Use JSONPath expression to get value from JSON object. Refer https://github.com/oliveagle/jsonpath for expression format.",
      "example": "json.path(\"$.key\",$activity[xxx].data) => value",
      "args": [
        {
          "name": "path",
          "type": "string"
        },
        {
          "name": "object",
          "type": "any"
        }
      ],
      "return": {
        "type": "any"
      }
    }
  ]
}

```

**Note**
* The suffix of module name in go.mod file must be the function `category` name.  Take above example, the name must be `json`
* The folder name of the function must be `category` name, Take above example, the name must be `json`
* The root name of field in descriptor.json must be `category` name as well, Take above example, the name must be `json`
* Each functions name in descriptor.json must match the name that return from runtime go code `Name` method

```
func (fnPath) Name() string {
  return "path"
  }
```

# Runtime

* Function interface [Here](https://github.com/project-flogo/core/blob/master/data/expression/function/function.go#L10)
* The function name returned by `name()` method must match the name in descripor.json
* Argument types in `Sig` method should also match types that defined in descriptor.json

```go
package json

import (
	"github.com/oliveagle/jsonpath"
	"github.com/project-flogo/core/data"
	"github.com/project-flogo/core/data/expression/function"
	"strings"
)

func init() {
	_ = function.Register(&fnPath{})
}

type fnPath struct {
}

// Name returns the name of the function
func (fnPath) Name() string {
	return "path"
}

// Sig returns the function signature
func (fnPath) Sig() (paramTypes []data.Type, isVariadic bool) {
	return []data.Type{data.TypeString, data.TypeAny}, false
}

// Eval executes the function
func (fnPath) Eval(params ...interface{}) (interface{}, error) {
	expression := params[0].(string)
	//tmp fix to take $loop as $. for now
	if strings.HasPrefix(strings.TrimSpace(expression), "$loop.") {
		expression = strings.Replace(expression, "$loop", "$", -1)
	}
	return jsonpath.JsonPathLookup(params[1], expression)
}
```