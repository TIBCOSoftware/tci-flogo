/*
 * Copyright © 2017. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
package sqsreceivemessage

import (
	"io/ioutil"
	"testing"

	"github.com/TIBCOSoftware/flogo-contrib/action/flow/test"
	"github.com/TIBCOSoftware/flogo-lib/core/activity"
	"github.com/stretchr/testify/assert"
)

var activityMetadata *activity.Metadata
var connectionData = ``

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

	dummyConnectionData := make(map[string]interface{})

	//Use your AWS information

	dummyConnectionSettings := make([]interface{}, 4)

	accesskeyId := make(map[string]interface{})
	accesskeyId["name"] = "accesskeyId"
	accesskeyId["value"] = "<YOUR ACCESS KEY ID>"
	dummyConnectionSettings[0] = accesskeyId

	secreteAccessKey := make(map[string]interface{})
	secreteAccessKey["name"] = "secreteAccessKey"
	secreteAccessKey["value"] = "<YOUR SECRETE ACCESS KEY>"
	dummyConnectionSettings[1] = secreteAccessKey

	region := make(map[string]interface{})
	region["name"] = "region"
	region["value"] = "<REGION NAME WHERE SQS IS RUNNING>"
	dummyConnectionSettings[2] = region

	cName := make(map[string]interface{})
	cName["name"] = "name"
	cName["value"] = "SQS Connection"
	dummyConnectionSettings[3] = cName

	dummyConnectionData["settings"] = dummyConnectionSettings

	tc.SetInput(ivConnection, dummyConnectionData)
	tc.SetInput(ivQueueUrl, "<YOUR SQS QUEUE URL>")
	_, err := act.Eval(tc)
	assert.Nil(t, err)

}
