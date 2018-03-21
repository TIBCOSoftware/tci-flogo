package json

import (
	"encoding/json"
	"strings"
	"sync"
	"github.com/TIBCOSoftware/flogo-lib/logger"
)

type JSONData struct {
	container *Container
	rw        sync.RWMutex
}

func SetFieldValueFromString(data interface{}, jsonData string, path string) (interface{}, error) {
	jsonParsed, err := ParseJSON([]byte(jsonData))
	if err != nil {
		return nil, err

	}
	return setValue(data, &JSONData{container: jsonParsed, rw: sync.RWMutex{}}, path)
}

func SetFieldValue(data interface{}, jsonData interface{}, path string) (interface{}, error) {
	switch t := jsonData.(type) {
	case string:
		return SetFieldValueFromString(data, t, path)
	default:
		jsonParsed, err := Consume(jsonData)
		if err != nil {
			return nil, err

		}
		return setValue(data, &JSONData{container: jsonParsed, rw: sync.RWMutex{}}, path)
	}
}

func setValue(value interface{}, jsonData *JSONData, path string) (interface{}, error) {

	jsonData.rw.Lock()

	defer jsonData.rw.Unlock()

	container := jsonData.container
	if strings.Index(path, "[") > 0 {
		//Array
		arrayFieldName := getFieldName(path)
		index, _ := getFieldSliceIndex(path)
		logger.Debug("Field Name:", arrayFieldName, " and index: ", index)
		restPath := getRestArrayFieldName(path)
		if restPath == "" {
			if strings.Index(path, "]") == len(path)-1 {
				if container.ExistsP(arrayFieldName) {
					if index == -2 {
						//Append
						err := container.ArrayAppend(value, strings.Split(arrayFieldName, ".")...)
						if err != nil {
							return nil, err
						}
					} else {
						//set to exist index array
						size, err := container.ArrayCountP(arrayFieldName)
						if err != nil {
							return nil, err
						}
						if index > size-1 {
							err := container.ArrayAppendP(value, arrayFieldName)
							if err != nil {
								return nil, err
							}
						} else {
							array := container.Path(arrayFieldName)
							_, err := array.SetIndex(value, index)
							if err != nil {
								return nil, err
							}
						}
					}

				} else {
					//Not exist so init a new array
					if index == -2 {
						_, err := container.Array(strings.Split(arrayFieldName, ".")...)
						if err != nil {
							return nil, err
						}
						err = container.ArrayAppend(value, strings.Split(arrayFieldName, ".")...)
						if err != nil {
							return nil, err
						}
					} else {
						//Since make array with index lengh
						array, err := container.ArrayOfSize(index+1, strings.Split(arrayFieldName, ".")...)
						if err != nil {
							return nil, err
						}
						_, err = array.SetIndex(value, index)
						if err != nil {
							return nil, err
						}
					}
				}

			} else {
				jsonField := container.Path(arrayFieldName)
				_, err := jsonField.SetIndex(value, index)
				if err != nil {
					return nil, err
				}
			}

		} else {
			if container.ExistsP(arrayFieldName) {
				size, err := container.ArrayCountP(arrayFieldName)
				if err != nil {
					return nil, err
				}

				if index > size-1 {

					newObject, err := ParseJSON([]byte("{}"))
					_, err = newObject.SetP(value, restPath)
					logger.Debugf("new object %s", newObject.String())
					if err != nil {
						return nil, err
					}
					//o ,_ := ParseJSON(newObject.Bytes())
					maps := &map[string]interface{}{}
					err = json.Unmarshal(newObject.Bytes(), maps)
					if err != nil {
						return nil, err
					}

					err = container.ArrayAppendP(maps, arrayFieldName)
					if err != nil {
						return nil, err
					}

					if strings.Index(restPath, "[") > 0 {
						//TODO
						c, err := container.ArrayElementP(index, arrayFieldName)
						if err != nil {
							return nil, err
						}
						return setValue(value, &JSONData{container: c, rw: sync.RWMutex{}}, restPath)
					} else {
						//_, err := jsonField.Set(value, restPath)
						//if err != nil {
						//	return nil, err
						//}
					}
				} else {

					jsonField, err := container.ArrayElementP(index, arrayFieldName)
					//arraySize
					if err != nil {
						return nil, err
					}
					if strings.Index(restPath, "[") > 0 {
						return setValue(value, &JSONData{container: jsonField, rw: sync.RWMutex{}}, restPath)
					} else {
						switch t := jsonField.object.(type) {
						case map[string]interface{}:
							jsonField.object = t
						case *map[string]interface{}:
							jsonField.object = *t
						}
						_, err := jsonField.SetP(value, restPath)
						if err != nil {
							return nil, err
						}
					}
				}

			} else {
				//Not exist so init a new array
				//Since make array with index lengh
				array, err := container.ArrayOfSize(index+1, strings.Split(arrayFieldName, ".")...)
				if err != nil {
					return nil, err
				}

				if strings.Index(restPath, "[") > 0 {
					return setValue(value, &JSONData{container: array, rw: sync.RWMutex{}}, restPath)
				} else {
					newObject, err := ParseJSON([]byte("{}"))
					_, err = newObject.SetP(value, restPath)
					logger.Debugf("new object %s", newObject.String())
					if err != nil {
						return nil, err
					}
					//o ,_ := ParseJSON(newObject.Bytes())
					maps := &map[string]interface{}{}
					err = json.Unmarshal(newObject.Bytes(), maps)
					if err != nil {
						return nil, err
					}
					_, err = array.SetIndex(maps, index)
				}
			}

		}
	} else {
		_, err := container.Set(value, strings.Split(path, ".")...)
		if err != nil {
			return nil, err
		}

	}
	return container.object, nil
}
