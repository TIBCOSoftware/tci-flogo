---
date: 2016-04-09T16:50:16+02:00
title: Adding a separator token
weight: 253
---

Let's enhance the [concat](../simple-concat) activity to let users select a separator for concatenation.

## activity.json
The activity.json file needs a few small changes and now has a third input for the separator, that also shows which separators are allowed.
```json

{
    "name": "concat",
    "title": "Concat Activity",
    "author": "TIBCO Software Inc.",
    "version": "1.0.0",
    "type": "flogo:activity",
     
    "display": {
       "category": "TIBCO",
       "visible": true,
       "smallIcon": "concat-small-icon.png",
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
           },
           {
            "name": "separator",
            "type": "string",
            "required": true,
            "display": {
               "name": "Separator",
               "type": "dropdown",
               "selection": "single",
               "description": "Select a separator for concatenation"
            },
            "allowed":["-","#"]
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

## activity.go
The activity.go has a few extra pieces as well. We've commented the parts that have been changed from the previous version.
```go
package concat

import (
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
	"github.com/TIBCOSoftware/flogo-lib/logger"
)

const (
	ivField1    = "firstString"
    ivField2    = "secondString"
    // Adding a new input field
    ivField3    = "separator"
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
    if context.GetInput(ivField1) == nil {
      return false, activity.NewError("First string is not configured", "CONCAT-4001", nil)
    }
    field1v := context.GetInput(ivField1).(string)
     
    if context.GetInput(ivField2) == nil {
      return false, activity.NewError("Second string is not configured", "CONCAT-4002", nil)
    }
    field2v := context.GetInput(ivField2).(string)
  
    // Get the separator field
    if context.GetInput(ivField3) == nil {
      return false, activity.NewError("Separator is not configured", "CONCAT-4003", nil)
    }
    field3v := context.GetInput(ivField3).(string)
    
    //Set output
    context.SetOutput(ovResult, field1v+field3v+field2v)
	return true, nil
}

```

## activity_test.go
The activity_test.go has a few extra pieces as well. We've commented the parts that have been changed from the previous version.
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
	tc.SetInput("firstString", "Hello")
    tc.SetInput("secondString", "World!")

    // Set a new separator
    tc.SetInput("separator", "#")

    _, err := act.Eval(tc)
    assert.Nil(t, err)
    result := tc.GetOutput("result")
    
    // Check the new output
    assert.Equal(t, result, "Hello#World!")
}
```