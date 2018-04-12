package json

import (
	"reflect"
	"strconv"
	"strings"

	"encoding/json"
	"github.com/TIBCOSoftware/flogo-lib/logger"
	"sync"
)

func GetFieldValue(jsonData string, path string) (interface{}, error) {
	jsonParsed, err := ParseJSON([]byte(jsonData))
	if err != nil {
		return nil, err

	}
	return getFiledValue(&JSONData{container: jsonParsed, rw: sync.RWMutex{}}, path)
}

func GetFieldValueFromIn(data interface{}, path string) (interface{}, error) {
	var jsonParsed *Container
	var err error

	if reflect.TypeOf(data).Kind() == reflect.String {
		jsonParsed, err = ParseJSON([]byte(data.(string)))
	} else {
		b, err := json.Marshal(data)
		if err != nil {
			return nil, err
		}
		jsonParsed, err = ParseJSON(b)
	}

	if err != nil {
		return nil, err

	}
	return getFiledValue(&JSONData{container: jsonParsed, rw: sync.RWMutex{}}, path)
}

func getFiledValue(jsonData *JSONData, path string) (interface{}, error) {
	jsonData.rw.RLock()

	defer jsonData.rw.RUnlock()
	container := jsonData.container
	if strings.Index(path, "[") > 0 {
		//Array
		arrayFieldName := getFieldName(path)
		index, _ := getFieldSliceIndex(path)
		logger.Debug("Field Name:", arrayFieldName, " and index: ", index)
		jsonField, err := container.ArrayElementP(index, arrayFieldName)
		if err != nil {
			return nil, err
		}
		restPath := getRestArrayFieldName(path)
		if restPath == "" {
			value := jsonField.Data()
			logger.Debug("Type :", reflect.TypeOf(value))
			logger.Debug("Value :", value)
			return value, nil
		} else {
			if strings.Index(restPath, "[") > 0 {
				return getFiledValue(&JSONData{container: jsonField, rw: sync.RWMutex{}}, restPath)
			} else {
				filed := jsonField.Path(restPath)
				value := filed.Data()
				logger.Debug("Type :", reflect.TypeOf(value))
				logger.Debug("Value :", value)
				return value, nil
			}
		}

	} else {
		value := container.Path(path).Data()
		logger.Debug("Type :", reflect.TypeOf(value))
		logger.Debug("Value :", value)
		return value, nil
	}

	return nil, nil
}

func getRestArrayFieldName(fieldName string) string {
	if strings.Index(fieldName, "]") >= 0 {
		closeBracketIndex := strings.Index(fieldName, "]")
		if len(fieldName) == closeBracketIndex+1 {
			return ""
		} else {
			return fieldName[closeBracketIndex+2:]

		}
	}
	return fieldName
}

func getFieldName(fieldName string) string {
	if strings.Index(fieldName, "[") >= 0 {
		return fieldName[0:strings.Index(fieldName, "[")]
	}

	return fieldName
}

func getFieldSliceIndex(fieldName string) (int, error) {
	if strings.Index(fieldName, "[") >= 0 {
		index := fieldName[strings.Index(fieldName, "[")+1 : strings.Index(fieldName, "]")]
		logger.Debugf("sssssss %d", index)
		i, err := strconv.Atoi(index)
		if err != nil {
			return -2, nil
		}
		return i, nil
	}

	return -1, nil
}
