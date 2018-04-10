package field

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRemoveQuote(t *testing.T) {
	path := `'def'`
	field := RemoveQuote(path)
	assert.Equal(t, "def", field)
}
func TestGetSpecialFields(t *testing.T) {
	path := `Object.Maps3["dd*cc"]["y.x"]["d.d"]`
	fields, err := GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"Object", "Maps3", "dd*cc", "y.x", "d.d"}, fields)
}

func TestGetSpecialFields3(t *testing.T) {
	path := `Object.Maps3[0]["dd*cc"]["y.x"]['d.d']`
	fields, err := GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"Object", "Maps3[0]", "dd*cc", "y.x", "d.d"}, fields)
}

func TestGetSpecialFields4(t *testing.T) {
	path := `["message.id"]`
	fields, err := GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"message.id"}, fields)
}

func TestGetAllSpecialWithRootSpecial(t *testing.T) {
	path := `Maps2["bb.bb"][0].id`
	fields, err := GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"Maps2", "bb.bb[0]", "id"}, fields)
}

func TestGetAllSpecialFields(t *testing.T) {
	path := `Object.Maps3["dd.cc"][0]["y.x"]['d.d'].name`
	res, err := GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"Object", "Maps3", "dd.cc[0]", "y.x", "d.d", "name"}, res)
}

func TestGetAllSpecialFields2(t *testing.T) {
	path := `$ReceiveSQSMessage.["x.y"][0]["name&name"]`
	res, err := GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"$ReceiveSQSMessage", "x.y[0]", "name&name"}, res)

}

func TestGetAllSpecialSingleQuote(t *testing.T) {
	path := "['data']['Array1']"

	res, err := GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"data", "Array1"}, res)

}

func TestGetAllSpecial(t *testing.T) {
	path := "$activity[namesss]['data']['Array1']"

	res, err := GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"$activity[namesss]","data", "Array1"}, res)


	path = "$trigger[namesss]['data']['Array1']"

	res, err = GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"$trigger[namesss]","data", "Array1"}, res)


	path = "$trigger['data']['Array1']"

	res, err = GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"$trigger","data", "Array1"}, res)

	path = "$property['data']['Array1']"

	res, err = GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"$property","data", "Array1"}, res)

	path = "$env['data']['Array1']"

	res, err = GetAllspecialFields(path)
	assert.Nil(t, err)
	assert.Equal(t, []string{"$env","data", "Array1"}, res)
}
