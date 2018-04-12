package ref

import (
	"strings"
	"testing"

	"fmt"

	"github.com/stretchr/testify/assert"
)

func TestMappingRef(t *testing.T) {

	mappingref := MappingRef{ref: "$activity[name].input.query.address.city"}

	id, err := mappingref.GetActivityId()

	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, "name", id)

	rootField, err := mappingref.GetActivtyRootField()
	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, "_A.name.input", rootField)

	fields, err := mappingref.GetFields()
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, []string{"query", "address", "city"}, fields.Fields)

}

func TestMappingRefFuntion(t *testing.T) {

	mappingref := MappingRef{ref: `concat($activity[activityname].input.query.address.city, "name"`}

	_, err := mappingref.GetActivityId()

	if err != nil {
		t.Log(err)
	}

	_, err2 := mappingref.GetActivtyRootField()
	if err2 != nil {
		t.Log(err2)
	}

}

func TestMappingRefExpression(t *testing.T) {

	mappingref := MappingRef{ref: `$activity[activityname].input.query.address.zipcode > 77477`}

	_, err := mappingref.GetActivityId()

	if err != nil {
		t.Log(err)
	}

	_, err2 := mappingref.GetActivtyRootField()
	if err2 != nil {
		t.Log(err2)
	}
	//
	//assert.Equal(t, true, mappingref.IsExpression())
	//
	//assert.Equal(t, false, mappingref.IsFunction())

}

func TestMappingRef_GetPath(t *testing.T) {

	mappingref := MappingRef{ref: `$activity[activityname].input.query.address.zipcode`}

	name, _ := mappingref.GetFields()
	assert.Equal(t, "query.address.zipcode", strings.Join(name.Fields, "."))
	fmt.Println(name)

	mappingref = MappingRef{ref: `input.query.address.zipcode`}

	name, _ = mappingref.GetFields()
	assert.Equal(t, "query.address.zipcode", strings.Join(name.Fields, "."))
	fmt.Println(name)

}

func TestGetActivtyRootField(t *testing.T) {
	mappingref := MappingRef{ref: `$activity[activityname].input[0].query.address.zipcode`}

	name, err := mappingref.GetActivtyRootField()
	assert.Nil(t, err)
	assert.Equal(t, "_A.activityname.input", name)

	name, err = mappingref.GetFieldName()
	assert.Nil(t, err)
	assert.Equal(t, "input", name)

	mappingref = MappingRef{ref: `input[0].query.address.zipcode`}

	name, err = mappingref.GetFieldName()
	assert.Nil(t, err)
	assert.Equal(t, "input", name)

	mappingref = MappingRef{ref: `input.query.address.zipcode`}

	name, err = mappingref.GetFieldName()
	assert.Nil(t, err)
	assert.Equal(t, "input", name)

}

func TestGetFieldsMapFrom(t *testing.T) {
	ref := &MappingRef{ref: "$ReceiveSQSMessage.Message[0].MessageId"}
	mappingFields, err := ref.GetFields()
	assert.Nil(t, err)
	assert.Equal(t, []string{"[0]", "MessageId"}, mappingFields.Fields)
	fmt.Println(fmt.Printf("%+v", mappingFields))

	//Special one
	ref = &MappingRef{ref: `$ReceiveSQSMessage.name[0]["name&name"]`}
	mappingFields, err = ref.GetFields()
	assert.Nil(t, err)
	assert.Equal(t, []string{"[0]", "name&name"}, mappingFields.Fields)
	fmt.Println(fmt.Printf("%+v", mappingFields))

}

func TestGetFieldsMapFrom2(t *testing.T) {
	//Special one
	ref := &MappingRef{ref: `$activity[ReceiveSQSMessage].["x.y"][0]["name&name"]`}
	s, err := ref.GetActivtyRootField()
	assert.Equal(t, "_A.ReceiveSQSMessage.x.y", s)

	mappingFields, err := ref.GetFields()
	assert.Nil(t, err)
	assert.Equal(t, []string{"[0]", "name&name"}, mappingFields.Fields)
	fmt.Println(fmt.Printf("%+v", mappingFields))
}

func TestGetFieldsMapTo(t *testing.T) {
	//Special one
	ref := &MappingRef{ref: `["x.y"][0]["name&name"]`}
	s, err := ref.GetActivtyRootField()
	assert.Nil(t, err)
	assert.Equal(t, "x.y", s)
}
