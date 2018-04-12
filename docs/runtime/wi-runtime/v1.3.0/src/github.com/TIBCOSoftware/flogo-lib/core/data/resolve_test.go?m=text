package data

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetResolutionDetails(t *testing.T) {

	a := "property.Prop1"
	details, err := GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "property", details.ResolverName)
	assert.Equal(t, "Prop1", details.Property)
	assert.Equal(t, "", details.Item)
	assert.Equal(t, "", details.Path)

	a = "env.VAR1"
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "env", details.ResolverName)
	assert.Equal(t, "VAR1", details.Property)
	assert.Equal(t, "", details.Item)
	assert.Equal(t, "", details.Path)

	// Resolution of first level Activity expression
	a = "activity[myactivityId].myAttributeName"
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myAttributeName", details.Property)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, "", details.Path)

	// Resolution of second level Activity expression map
	a = "activity[myactivityId].myObjectAttributeName.objectKey"
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myObjectAttributeName", details.Property)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, ".objectKey", details.Path)

	// Resolution of second level Activity expression map
	a = `activity[myactivityId].myMapAttributeName["a.b"]`
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, "myMapAttributeName", details.Property)
	assert.Equal(t, `["a.b"]`, details.Path)

	// Resolution of second level Activity expression array
	a = "activity.myactivityId.myArrayAttributeName[0]"
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myArrayAttributeName", details.Property)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, "[0]", details.Path)

	// Resolution of first level Activity expression
	a = "activity.myactivityId.myAttributeName"
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myAttributeName", details.Property)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, "", details.Path)

	// Resolution of second level Activity expression map
	a = "activity.myactivityId.myObjectAttributeName.objectKey"
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myObjectAttributeName", details.Property)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, ".objectKey", details.Path)

	// Resolution of second level Activity expression map
	a = `activity.myactivityId.myMapAttributeName["a.b"]`
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, "myMapAttributeName", details.Property)
	assert.Equal(t, `["a.b"]`, details.Path)

	// Resolution of second level Activity expression array
	a = "activity.myactivityId.myArrayAttributeName[0]"
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myArrayAttributeName", details.Property)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, "[0]", details.Path)
}

func TestGetResolutionDetailsOld(t *testing.T) {

	a := "${property.Prop1}"
	details, err := GetResolutionDetailsOld(a)
	assert.Nil(t, err)
	assert.Equal(t, "property", details.ResolverName)
	assert.Equal(t, "Prop1", details.Property)
	assert.Equal(t, "", details.Item)
	assert.Equal(t, "", details.Path)

	a = "${env.VAR1}"
	details, err = GetResolutionDetailsOld(a)
	assert.Nil(t, err)
	assert.Equal(t, "env", details.ResolverName)
	assert.Equal(t, "VAR1", details.Property)
	assert.Equal(t, "", details.Item)
	assert.Equal(t, "", details.Path)

	a = "${trigger.val}"
	details, err = GetResolutionDetailsOld(a)
	assert.Nil(t, err)
	assert.Equal(t, "trigger", details.ResolverName)
	assert.Equal(t, "val", details.Property)
	assert.Equal(t, "", details.Item)
	assert.Equal(t, "", details.Path)

	a = "${trigger.val}.value"
	details, err = GetResolutionDetailsOld(a)
	assert.Nil(t, err)
	assert.Equal(t, "trigger", details.ResolverName)
	assert.Equal(t, "val", details.Property)
	assert.Equal(t, "", details.Item)
	assert.Equal(t, ".value", details.Path)

	a = "${trigger.val}[0]"
	details, err = GetResolutionDetailsOld(a)
	assert.Nil(t, err)
	assert.Equal(t, "trigger", details.ResolverName)
	assert.Equal(t, "val", details.Property)
	assert.Equal(t, "", details.Item)
	assert.Equal(t, "[0]", details.Path)

	// Resolution of first level Activity expression
	a = "${activity.myactivityId.myAttributeName}"
	details, err = GetResolutionDetailsOld(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myAttributeName", details.Property)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, "", details.Path)

	// Resolution of second level Activity expression map
	a = "${activity.myactivityId.myMapAttributeName}.mapkey"
	details, err = GetResolutionDetailsOld(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myMapAttributeName", details.Property)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, ".mapkey", details.Path)

	// Resolution of second level Activity expression array
	a = "${activity.myactivityId.myArrayAttributeName}[0]"
	details, err = GetResolutionDetailsOld(a)
	assert.Nil(t, err)
	assert.Equal(t, "activity", details.ResolverName)
	assert.Equal(t, "myArrayAttributeName", details.Property)
	assert.Equal(t, "myactivityId", details.Item)
	assert.Equal(t, "[0]", details.Path)
}

func TestToGetCurrentScope(t *testing.T) {
	a := "$.header.Accept"
	details, err := GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "$.", details.ResolverName)
	assert.Equal(t, "header", details.Property)
	assert.Equal(t, ".Accept", details.Path)

	a = "$.array[0]"
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "$.", details.ResolverName)
	assert.Equal(t, "array", details.Property)
	assert.Equal(t, "[0]", details.Path)

	a = "$.headers"
	details, err = GetResolutionDetails(a)
	assert.Nil(t, err)
	assert.Equal(t, "$.", details.ResolverName)
	assert.Equal(t, "headers", details.Property)
	assert.Equal(t, "", details.Path)

}
