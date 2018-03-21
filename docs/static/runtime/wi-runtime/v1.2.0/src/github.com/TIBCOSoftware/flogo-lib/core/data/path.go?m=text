package data

import (
	"fmt"
	"github.com/TIBCOSoftware/flogo-lib/logger"
	"strconv"
	"strings"
	"github.com/TIBCOSoftware/flogo-lib/json"
)

// PathType is the attribute value accessor path
type PathType int

// ResolverType is the type of the resolver for the attribute name
type ResolverType int

const (
	PT_SIMPLE PathType = 1
	PT_MAP    PathType = 2
	PT_ARRAY  PathType = 3

	RES_DEFAULT ResolverType = iota
	RES_PROPERTY
	RES_ACTIVITY
	RES_TRIGGER
)

func GetResolverType(inAttrName string) (ResolverType, error) {
	if strings.HasPrefix(inAttrName, "${") {
		leftIdx := 2
		fullExpr := inAttrName[leftIdx:]
		if len(fullExpr) == 0 {
			return 0, fmt.Errorf("Invalid mapping expression [%s].", inAttrName)
		}
		dotIdx := strings.Index(fullExpr, ".")
		if dotIdx == -1 {
			return 0, fmt.Errorf("Unsupported mapping expression, missing type [%s].", inAttrName)
		}
		expType := fullExpr[:dotIdx]
		switch expType {
		case "property", "env":
			return RES_PROPERTY, nil
		case "activity":
			return RES_ACTIVITY, nil
		case "trigger":
			return RES_TRIGGER, nil
		default:
			return 0, fmt.Errorf("Unsupported mapping expression type [%s].", expType)
		}
	}
	return RES_DEFAULT, nil
}

// GetAttrPath splits the supplied attribute with path to its name and object path
func GetAttrPath(inAttrName string) (attrName string, attrPath string, pathType PathType) {

	//todo handle bad attr names
	//fmt.Printf("** InAttrName: %s \n", inAttrName)

	nameLen := len(inAttrName)
	pathType = PT_SIMPLE

	if inAttrName[0] == '{' {

		idx := strings.Index(inAttrName, "}")

		if idx == nameLen-1 {
			attrName = inAttrName
		} else {
			attrName = inAttrName[:idx+1]

			if inAttrName[idx+1] == '[' {
				pathType = PT_ARRAY
				attrPath = inAttrName[idx+2 : nameLen-1]
			} else {
				pathType = PT_MAP
				attrPath = inAttrName[idx+2:]
			}
		}
	} else if strings.HasPrefix(inAttrName, "${") {
		idx := strings.Index(inAttrName, "}")

		if idx == nameLen-1 {
			attrName = inAttrName
		} else {
			attrName = inAttrName[:idx+1]

			if inAttrName[idx+1] == '[' {
				pathType = PT_ARRAY
				attrPath = inAttrName[idx+2 : nameLen-1]
			} else {
				pathType = PT_MAP
				attrPath = inAttrName[idx+2:]
			}
		}
	} else {
		idx := strings.Index(inAttrName, ".")

		if idx == -1 {

			idx = strings.Index(inAttrName, "[")

			if idx == -1 {
				attrName = inAttrName
			} else {
				pathType = PT_ARRAY
				attrName = inAttrName[:idx]
				attrPath = inAttrName[idx+1 : nameLen-1]
			}
		} else {
			pathType = PT_MAP
			attrName = inAttrName[:idx]
			attrPath = inAttrName[idx+1:]
		}
	}

	return attrName, attrPath, pathType
}

func GetMapValue(valueMap map[string]interface{}, path string) interface{} {

	var pathComponents []string = strings.Split(path, ".")
	lastPcIdx := len(pathComponents) - 1

	tmpObj := valueMap
	for pcIdx, pc := range pathComponents {
		if strings.Index(pc, "[") > -1 {
			//Its Array
			bIdx := strings.Index(pc, "[")
			arrayName := pc[:bIdx]
			if tmpObj[arrayName] == nil {
				//todo return error instead of panic
				panic(fmt.Sprintf("Invalid mapping [%s].", path))
			}

			switch tmpObj[arrayName].(type) {
			case []interface{}:
				//Array
				arrayIdx, _ := strconv.Atoi(pc[bIdx+1 : len(pc)-1])
				if arrayIdx >= len(tmpObj[arrayName].([]interface{})) {

					//todo return error instead of panic
					panic(fmt.Sprintf("Invalid mapping [%s]. Index out of range.", path))
				}

				arrayObject := tmpObj[arrayName].([]interface{})[arrayIdx]
				switch arrayObject.(type) {
				case map[string]interface{}:
					tmpObj = arrayObject.(map[string]interface{})
				case interface{}:
					return arrayObject
				}
			case map[string]interface{}:
				//Object
				tmpObj = tmpObj[arrayName].(map[string]interface{})
			case interface{}:
				return tmpObj[arrayName]
			}
		}

		if pcIdx == lastPcIdx {
			return tmpObj[pc]
		}

		switch tmpObj[pc].(type) {
		//todo need to throw error if not a map

		case map[string]interface{}:
			tmpObj = tmpObj[pc].(map[string]interface{})
		}

	}

	return tmpObj
}

func GetAttrValue(attrName, attrPath string, pathType PathType, scope Scope) (interface{}, bool) {
	tv, exists := scope.GetAttr(attrName)
	if tv == nil {
		return nil, false
	}
	attrValue := tv.Value
	if exists && len(attrPath) > 0 {
		if tv.Type == PARAMS {
			valMap := attrValue.(map[string]string)
			attrValue, exists = valMap[attrPath]
		} else if tv.Type == ARRAY && pathType == PT_ARRAY {
			//assigning part of array
			idx, err := strconv.Atoi(attrPath)
			if err != nil {
				return nil, false
			}
			valArray := attrValue.([]interface{})
			attrValue = valArray[idx]
		} else if tv.Type == COMPLEX_OBJECT && pathType == PT_MAP {
			// Parse complex object
			co, err := CoerceToComplexObject(attrValue)
			if err != nil{
				logger.Error(err)
				return nil, false
			}
			// Resolve jsonpath
			attrValue, exists = GetComplexObjectValue(co, attrPath)
		} else {
			//for now assume if we have a path, attr is "object"
			valMap := attrValue.(map[string]interface{})
			attrValue = GetMapValue(valMap, attrPath)
			//attrValue, exists = valMap[attrPath]
		}
	}
	return attrValue, exists
}

func GetComplexObjectValue(attrValue *ComplexObject, attrPath string) (interface{}, bool) {
	// This should never happen
	if attrValue == nil {
		logger.Error(fmt.Errorf("Error trying to resolve complex object value, nil value found"))
		return nil, false
	}

	if len(attrPath) == 0{
		logger.Error(fmt.Errorf("Error trying to resolve complex object value, empty json path found"))
		return nil, false
	}

	attrValueStr, ok := attrValue.Value.(string)
	if !ok{
		logger.Error(fmt.Errorf("Error trying to resolve complex object value, invalid mapping type '%T' for attribute '%+v'", attrValue.Value, attrValue.Value))
		return nil, false
	}

	resValue, err := json.GetFieldValue(attrValueStr, attrPath)
	if err != nil{
		logger.Error(err)
		return nil, false
	}
	return resValue, true
}
