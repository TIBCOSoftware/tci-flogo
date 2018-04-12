package json

import (
	"encoding/json"
	"fmt"
	"testing"

	"github.com/TIBCOSoftware/flogo-lib/core/mapper/exprmapper/json/field"

	"github.com/stretchr/testify/assert"
)

func TestSetSpecialObjectField(t *testing.T) {
	// path := `Object.Maps3["dd*cc"]["y.x"][d.d]`
	mappingField := &field.MappingField{HasArray: false, HasSpecialField: true}
	mappingField.Fields = []string{"Object", "Maps3", "dd*cc", "y.x", "d.d"}

	value, err := SetFieldValueFromString("lixi", "{}", mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	log.Info(value)
	v, _ := json.Marshal(value)
	assert.Equal(t, `{"Object":{"Maps3":{"dd*cc":{"y.x":{"d.d":"lixi"}}}}}`, string(v))
}

func TestSetSpecialArrayField2(t *testing.T) {
	// path := `Object.Maps3[0]["dd*cc"]`
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: true}
	mappingField.Fields = []string{"Object", "Maps3[0]", "dd*cc"}

	value, err := SetFieldValueFromString("lixi", "{}", mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	log.Info(value)
	v, _ := json.Marshal(value)
	fmt.Println(string(v))
	assert.Equal(t, `{"Object":{"Maps3":[{"dd*cc":"lixi"}]}}`, string(v))
}

func TestSetSpecialArrayFieldMultipleLEvel(t *testing.T) {
	// path := `Object.Maps3["dd.cc"][0]["y.x"][d.d].name`
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: true}
	mappingField.Fields = []string{"Object", "Maps3", "dd.cc[0]", "y.x", "d.d", "name"}
	value, err := SetFieldValueFromString("lixi", "{}", mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, value)
	log.Info(value)
	v, _ := json.Marshal(value)
	fmt.Println(string(v))
	assert.Equal(t, `{"Object":{"Maps3":{"dd.cc":[{"y.x":{"d.d":{"name":"lixi"}}}]}}}`, string(v))
}
