---
date: 2016-04-09T16:50:16+02:00
title: Simple concat
weight: 10
---

## Creating "Concat" activity

Now that you are familiar with the the layout of the different [files](https://github.com/TIBCOSoftware/tci/wiki/Create-an-Activity), let's create a simple `concat` activity. The activity takes two input strings and returns a single string which will be the concatenation of the input. To structure our extensions we'll put them in the `TIBCO` category, but you're free to choose your own 😄 

### The folder
The first step is tocCreate a folder named **concat** in the TIBCO category with following files:
![concat-activity.png](https://raw.githubusercontent.com/TIBCOSoftware/tci-webintegrator/master/images/concat-activity.png)

### activity.json
```json
{
    "name": "concat",
    "title": "Concat Activity",
    "version": "1.0.0",
    "type": "flogo:activity",
    "author": "TIBCO Software Inc.",
    "display": {
       "category": "TIBCO",
       "visible": true,
       "smallIcon": "concat.png",
       "description": "This activity returns concatenation of two strings"
    },
 
    "ref": "github.com/TIBCOSoftware/tci/examples/TIBCO/activity/concat",
    "inputs": [
           {
            "name": "firstString",
            "type": "string",
            "required": true
           },
           {
            "name": "secondString",
            "type": "string",
            "required": true
           }
    ],
  
    "outputs": [
           {
            "name": "result",
            "type": "string"
          }
    ]
}
```

### activity.go
```go
package concat

import (
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
	"github.com/TIBCOSoftware/flogo-lib/logger"
)

const (
	ivField1    = "firstString"
	ivField2    = "secondString"
    ovResult    = "result"
)

var activityLog = logger.GetLogger("tibco-activity-concat")

type ConcatActivity struct {
	metadata *activity.Metadata
}

func NewActivity(metadata *activity.Metadata) activity.Activity {
	return &ConcatActivity{metadata: metadata}
}

func (a *ConcatActivity) Metadata() *activity.Metadata {
	return a.metadata
}
func (a *ConcatActivity) Eval(context activity.Context) (done bool, err error) {
    activityLog.Info("Executing Concat activity")
    //Read Inputs
    if context.GetInput(ivField1) == nil {
      // First string is not configured
      // return error to the engine 
      return false, activity.NewError("First string is not configured", "CONCAT-4001", nil)
    }
    field1v := context.GetInput(ivField1).(string)
     
    if context.GetInput(ivField2) == nil {
      // Second string is not configured
      // return error to the engine 
      return false, activity.NewError("Second string is not configured", "CONCAT-4002", nil)
    }
    field2v := context.GetInput(ivField2).(string)  
    
    //Set output
    context.SetOutput(ovResult, field1v+field2v)
	return true, nil
}
```

### Unit testing
As a good practice you should always have runtime unit test cases. For our activitieswWe will use the Golang [testing](https://golang.org/pkg/testing/) package.

### activity_test.go
```go
package concat

import (
	"testing"
	"github.com/TIBCOSoftware/flogo-contrib/action/flow/test"
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
        "github.com/stretchr/testify/assert"
	"io/ioutil"
)

var activityMetadata *activity.Metadata

func getActivityMetadata() *activity.Metadata {
	if activityMetadata == nil {
		jsonMetadataBytes, err := ioutil.ReadFile("activity.json")
		if err != nil {
			panic("No Json Metadata found for activity.json path")
		}
		activityMetadata = activity.NewMetadata(string(jsonMetadataBytes))
	}
	return activityMetadata
}

func TestActivityRegistration(t *testing.T) {
	act := NewActivity(getActivityMetadata())
	if act == nil {
		t.Error("Activity Not Registered")
		t.Fail()
		return
	}
}

func TestEval(t *testing.T) {
	act := NewActivity(getActivityMetadata())
	tc := test.NewTestActivityContext(act.Metadata())
	//setup attrs
	tc.SetInput("firstString", "Hello")
        tc.SetInput("secondString", "World!")
        _, err := act.Eval(tc)
        assert.Nil(t, err)
        result := tc.GetOutput("result")
        assert.Equal(t, result, "HelloWorld!")
}
```

### Test your code!
You can test your runtime code using [Project Flogo](http://www.flogo.io/).
```
1. Ensure $GOPATH variable is set
2. Add your <Category> folder to the $GOPATH
3. Pull Flogo code:
    -  go get github.com/TIBCOSoftware/flogo-lib
    -  go get github.com/TIBCOSoftware/flogo-contrib
4. Run - `go test ./..` from your <Category> folder
```

And your _**Concat**_ activity is ready for the use in Web Integrator! 