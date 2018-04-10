package json

import (
	"encoding/json"
	"testing"

	"github.com/TIBCOSoftware/flogo-lib/core/mapper/exprmapper/json/field"

	"github.com/stretchr/testify/assert"
	"strconv"
)

var SpecialData = `{
    "City": [
        {
            "Array": [
                {
                    "id": "11111"
                },
                {
                    "id": "2222"
                }
            ],
            "InUS": true,
            "Name": "Sugar Land",
            "Park": {
                "Emails": null,
                "Location": "location",
                "Maps": {
                    "bb": "bb",
                    "cc": "cc",
                    "dd": "dd"
                },
                "Name": "Name"
            }
        }
    ],
    "Emails": [
        "123@123.com",
        "456@456.com"
    ],
    "Id": 1234,
    "In": "string222",
    "Maps": {
        "bb.bb": {
            "id": "10001"
        },
        "cc#cc": "cc",
        "dd**cc": "dd"
    },
    "Maps2": {
        "bb.bb": [
            {
                "id": "10001"
            }
        ],
        "good":[{"id":"12", "x.y":"234"}],
        "cc#cc": "cc",
        "dd**cc": "dd"
    },
    "Maps3": {
        "bb.bb": [
            {
                "x.y": "10001"
            }
        ],
        "cc#cc": [
            {
                "x.y": {
                    "id": "1"
                }
            }
        ],
        "dd*cc": {
            "x.y": {
                "g%f": "hello"
            },
            "y.x":[
                {"d.d":"123"}
            ]
        }
    }
}`

func TestSpecialFieldNames(t *testing.T) {
	mappingField := &field.MappingField{HasArray: false, HasSpecialField: true}
	mappingField.Fields = []string{"Maps", "bb.bb"}
	value, err := GetFieldValueFromIn(SpecialData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	log.Info(value)
	v, _ := json.Marshal(value)
	assert.Equal(t, `{"id":"10001"}`, string(v))
}
func TestGetSpecialFieldRoot(t *testing.T) {
	mappingField := &field.MappingField{HasArray: false, HasSpecialField: true}
	mappingField.Fields = []string{"Maps", "bb.bb"}
	value, err := GetFieldValueFromIn(SpecialData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	assert.Equal(t, map[string]interface{}{"id": "10001"}, value)
}

func TestGetSpecial2LevelObjectField(t *testing.T) {
	mappingField := &field.MappingField{HasArray: false, HasSpecialField: true}
	mappingField.Fields = []string{"Maps", "bb.bb", "id"}
	value, err := GetFieldValueFromIn(SpecialData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	assert.Equal(t, "10001", value)
}

func TestGetSpecial2LevelArrayField(t *testing.T) {
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: true}
	mappingField.Fields = []string{"Maps2", "bb.bb[0]", "id"}
	value, err := GetFieldValueFromIn(SpecialData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	assert.Equal(t, "10001", value)
}

func TestGetSpecial2LevelArrayField2(t *testing.T) {
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: true}
	mappingField.Fields = []string{"Maps3", "cc#cc[0]", "x.y", "id"}
	value, err := GetFieldValueFromIn(SpecialData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	assert.Equal(t, "1", value)
}

func TestGetSpecialSpecial(t *testing.T) {
	mappingField := &field.MappingField{HasArray: false, HasSpecialField: true}
	mappingField.Fields = []string{"Maps3", "dd*cc", "x.y", "g%f"}
	value, err := GetFieldValueFromIn(SpecialData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	assert.Equal(t, "hello", value)
}

func TestGetSpecialSpecial2(t *testing.T) {
	mappingField := &field.MappingField{HasArray: false, HasSpecialField: true}
	mappingField.Fields = []string{"Maps3", "dd*cc", "y.x[0]", "d.d"}
	value, err := GetFieldValueFromIn(SpecialData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	assert.Equal(t, "123", value)
}

func TestGetSpecialSpecial3(t *testing.T) {
	mappingField := &field.MappingField{HasArray: false, HasSpecialField: true}
	mappingField.Fields = []string{"Maps2", "good[0]", "x.y"}
	value, err := GetFieldValueFromIn(SpecialData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	assert.Equal(t, "234", value)
}

func TestHasArrayFieldInArray(t *testing.T) {
	assert.False(t, hasArrayFieldInArray([]string{"[square]"}))
	assert.True(t, hasArrayFieldInArray([]string{"bb.bb[0]"}))
}

func TestSpecial(t *testing.T) {

	data := `{
        "[square]":"123",
  "array1": [
    {
      "id.1": 21907387
    },
    {
      "email": -54931037,
      "array2": [
        {
          "id.2": 3458316
        },
        {
          "id.2": 57420133
        },
        {
          "id.2": -95395610
        },
        {
          "id.2": 68243245
        }
      ]
    }
  ]
}`

	mappingField := &field.MappingField{HasArray: true, HasSpecialField: true}
	mappingField.Fields = []string{"array1[1]", "array2[0]", "id.2"}
	value, err := GetFieldValueFromIn(data, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)

	assert.Equal(t, "3458316", strconv.FormatFloat(value.(float64), 'f', -1, 64))

	mappingField = &field.MappingField{HasArray: false, HasSpecialField: true}
	mappingField.Fields = []string{"[square]"}
	value, err = GetFieldValueFromIn(data, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)

	assert.Equal(t, "123", value)

}
