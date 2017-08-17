/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
package concat

import (
  "github.com/TIBCOSoftware/flogo-lib/core/activity"
  "github.com/TIBCOSoftware/flogo-lib/logger"
)

const (
  ivField1    = "firstString"
  ivField2    = "secondString"
  ivField3    = "separator"
  ivField4    = "useSeparator"
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


    field4v := context.GetInput(ivField4).(bool)
  
    if field4v && context.GetInput(ivField3) == nil {
      // Separator is not configured
      // return error to the engine 
      return false, activity.NewError("Separator is not configured", "CONCAT-4003", nil)
    }
    field3v := context.GetInput(ivField3).(string)

    if field4v {
      //Use separator in concatenation
      context.SetOutput(ovResult, field1v+field3v+field2v)
    } else {
      //No separator in concatenation
      context.SetOutput(ovResult, field1v+field2v)
    }
  return true, nil
}