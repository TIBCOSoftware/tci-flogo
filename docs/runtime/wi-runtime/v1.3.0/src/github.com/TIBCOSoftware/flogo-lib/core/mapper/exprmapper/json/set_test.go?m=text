package json

import (
	"encoding/json"
	"reflect"
	"sync"
	"testing"

	"github.com/TIBCOSoftware/flogo-lib/core/mapper/exprmapper/json/field"

	"fmt"
	"github.com/stretchr/testify/assert"
)

func TestSetArrayObject(t *testing.T) {
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"City[0]", "Array[1]", "id"}
	v, err := SetFieldValueFromString("4444555", jsonData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	log.Debug("FInaly value:", v)

}

func TestSetRootChildArray(t *testing.T) {
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"Emails[0]"}
	v, err := SetFieldValueFromString("lixingwang@gmail.com", jsonData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	log.Debug("FInaly value:", v)

}

func TestSetRootArray(t *testing.T) {
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"[0]", "ss"}
	v, err := SetFieldValueFromString("lixingwang@gmail.com", "{}", mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	vv, _ := json.Marshal(v)
	fmt.Println("FInaly value:", string(vv))

}

func TestSetObject(t *testing.T) {
	mappingField := &field.MappingField{HasArray: false, HasSpecialField: false}
	mappingField.Fields = []string{"ZipCode"}
	v, err := SetFieldValueFromString("77479", jsonData, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	log.Debug("FInaly value:", v)
}

func TestSetEmptyField(t *testing.T) {
	mappingField := &field.MappingField{HasArray: false, HasSpecialField: false}
	mappingField.Fields = []string{"ZipCode]"}
	jsond := "{}"
	v, err := SetFieldValueFromString("77479", jsond, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	log.Debug("FInaly value:", v)
}

func TestSetEmptyField3(t *testing.T) {
	jsond := "{}"
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"ZipCode[]"}
	v, err := SetFieldValueFromString("77479", jsond, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	log.Debug("FInaly value:", v)
}

func TestSetEmptyField4(t *testing.T) {
	jsond := "{}"
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"ZipCode[1]"}
	v, err := SetFieldValueFromString("77479", jsond, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	log.Debug("FInaly value:", v)
}

func TestSetEmptyField5(t *testing.T) {
	jsond := "{}"
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"ZipCode[1]"}
	v, err := SetFieldValueFromString("77479", jsond, mappingField)
	mappingField.Fields = []string{"ZipCode[0]"}
	v2, err := SetFieldValue("77479", v, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v2)
	log.Debug("FInaly value:", v2)
}

func TestSetEmptyArrayField(t *testing.T) {
	jsond := "{}"
	v, err := SetFieldValueFromStringP("id", jsond, "pet.id")
	log.Debug("ID value:", v)

	v, err = SetFieldValueP("name", v, "pet.name")
	log.Debug("Name value:", v)

	v, err = SetFieldValueP("url", v, "pet.photoUrls[0]")
	assert.Nil(t, err)
	assert.NotNil(t, v)
	log.Debug("FInaly value:", v)
}

func TestSetEmptyNestField1(t *testing.T) {
	jsond := "{}"
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"pet", "photoUrls[0]"}
	v, err := SetFieldValueFromString("url", jsond, mappingField)
	log.Debug("First T ", v)
	mappingField.Fields = []string{"pet", "photoUrls[1]"}
	v, err = SetFieldValue("url2", v, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	log.Debug("FInaly value:", v)
}

func TestNameWithSpace(t *testing.T) {
	jsond := "{}"
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"pet name", "photoUrls[0]"}

	v, err := SetFieldValue("url", jsond, mappingField)
	log.Debug("First T ", v)
	mappingField.Fields = []string{"pet name", "photoUrls[1]"}

	v, err = SetFieldValue("url2", v, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	vv, _ := json.Marshal(v)
	log.Info("FInaly value:", string(vv))
}

func TestNameNest2(t *testing.T) {
	jsond := "{}"
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"input", "Account", "records[0]", "ID"}
	v, err := SetFieldValue("id", jsond, mappingField)
	log.Debug("First T ", v)
	mappingField.Fields = []string{"input", "Account", "records[0]", "Name"}

	v, err = SetFieldValue("namesssss", v, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	vv, _ := json.Marshal(v)
	log.Info("FInaly value:", string(vv))
}

func TestNameSameLevel(t *testing.T) {
	jsond := "{}"
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"input", "Account", "ID"}
	v, err := SetFieldValue("id", jsond, mappingField)
	log.Debug("First T ", v)
	mappingField.Fields = []string{"input", "Account", "Name"}

	v, err = SetFieldValue("namesssss", v, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	vv, _ := json.Marshal(v)
	log.Info("FInaly value:", string(vv))
}

func TestNameWithTag(t *testing.T) {
	jsond := "{}"
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"pet", "pet name", "photo	Urls[0]"}
	v, err := SetFieldValue("url", jsond, mappingField)
	log.Debug("First T ", v)
	mappingField.Fields = []string{"pet", "pet name", "photo	Urls[1]"}

	v, err = SetFieldValue("url2", v, mappingField)
	assert.Nil(t, err)
	assert.NotNil(t, v)
	log.Info("FInaly value:", v)
}

func TestSetEmptyNestField(t *testing.T) {
	jsond := "{}"
	mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
	mappingField.Fields = []string{"Response", "Pet", "Tags[0]", "Name"}
	v, err := SetFieldValueFromString("tagID", jsond, mappingField)
	log.Debug("First T ", v)
	mappingField.Fields = []string{"Response", "Pet", "Tags[1]", "Name"}

	v, err = SetFieldValue("tagID2", v, mappingField)

	assert.Nil(t, err)
	assert.NotNil(t, v)
	log.Debug("FInaly value:", v)
}

func TestMap(t *testing.T) {
	maps := map[string]interface{}{}

	mapTags := map[string]interface{}{}

	nameMap := map[string]interface{}{}
	nameMap["Name"] = "tagID"
	mapTags["Tags"] = []interface{}{nameMap}

	petTags := map[string]interface{}{}
	petTags["Pet"] = mapTags
	maps["Response"] = petTags
	//map[Response:map[Pet:map[Tags:[{"Name":"tagID"}]]]]
	//map[Response:map[Pet:map[Tags:[map[Name:tagID]]]]]
	//map[Response:map[Pet:map[Tags:[map[]]]]]
	log.Debug(maps)

	v, _ := json.Marshal(maps)
	log.Debug(string(v))

}

func setArray(value interface{}, index int, path string) {
	jsonParsed, err := ParseJSON([]byte(jsonData))
	array := jsonParsed.Path(path)

	c, err := array.SetIndex(value, index)
	if err != nil {
		panic(err)
	}

	log.Debug("Set Value :", c)
	log.Debug("Final Data:", jsonParsed.String())

}

func getArray(index int, path string) {
	jsonParsed, err := ParseJSON([]byte(jsonData))
	//array := jsonParsed.Path(path)

	c, err := jsonParsed.ArrayElement(index, path)
	if err != nil {
		panic(err)
	}
	log.Debug("Type :", reflect.TypeOf(c))

	log.Debug("Get Value :", c.String())

}

func TestConcurrentSet(t *testing.T) {
	w := sync.WaitGroup{}
	var recovered interface{}
	//Create factory

	for r := 0; r < 100000; r++ {
		w.Add(1)
		go func(i int) {
			defer w.Done()
			defer func() {
				if r := recover(); r != nil {
					recovered = r
				}
			}()
			jsond := "{}"
			mappingField := &field.MappingField{HasArray: true, HasSpecialField: false}
			mappingField.Fields = []string{"pet name", "photoUrls[0]"}
			v, err := SetFieldValue("url", jsond, mappingField)
			log.Debug("First T ", v)
			mappingField.Fields = []string{"pet name", "photoUrls[1]"}

			v, err = SetFieldValue("url2", v, mappingField)
			assert.Nil(t, err)
			assert.NotNil(t, v)
		}(r)

	}
	w.Wait()
	assert.Nil(t, recovered)
}
