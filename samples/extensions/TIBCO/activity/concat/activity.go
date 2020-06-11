/*
 * Copyright © 2020. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
package concat

import (
	"github.com/project-flogo/core/activity"
	"github.com/project-flogo/core/support/log"
)

var activityLog = log.ChildLogger(log.RootLogger(), "tibco-activity-concat")

func init() {
	_ = activity.Register(&ConcatActivity{}, New)
}

var activityMd = activity.ToMetadata(&Input{}, &Output{})

func New(ctx activity.InitContext) (activity.Activity, error) {
	return &ConcatActivity{}, nil
}

type ConcatActivity struct {
}

func (a *ConcatActivity) Metadata() *activity.Metadata {
	return activityMd
}
func (a *ConcatActivity) Eval(context activity.Context) (done bool, err error) {
	activityLog.Info("Executing Concat activity")

	input := &Input{}
	context.GetInputObject(input)

	//Read Inputs
	if len(input.FirstStr) <= 0 {
		// First string is not configured
		// return error to the engine
		return false, activity.NewError("First string is not configured", "CONCAT-4001", nil)
	}

	if len(input.SecondStr) <= 0 {
		// Second string is not configured
		// return error to the engine
		return false, activity.NewError("Second string is not configured", "CONCAT-4002", nil)
	}

	if input.UseSeparator && len(input.Separator) <= 0 {
		// Separator is not configured
		// return error to the engine
		return false, activity.NewError("Separator is not configured", "CONCAT-4003", nil)
	}

	output := &Output{}
	if input.UseSeparator {
		//Use separator in concatenation
		output.Result = input.FirstStr + input.Separator + input.SecondStr
	} else {
		//No separator in concatenation
		output.Result = input.FirstStr + input.SecondStr
	}

	err = context.SetOutputObject(output)
	if err != nil {
		return false, err
	}
	return true, nil
}
