package property

import (
	"fmt"
	"os"
	"reflect"
	"strings"
	"sync"

	"github.com/TIBCOSoftware/flogo-lib/core/expr"
	"github.com/TIBCOSoftware/flogo-lib/logger"
)

var (
	props = make(map[string]interface{})
	mut   = sync.RWMutex{}
	// Default Resolver
	resolver expr.Resolver = &DefaultResolver{}
)

// Default resolver to resolve property and envioronment variable values.
type DefaultResolver struct {
}

// Default resolver resolves values from property bag and environment variable
func (resolver *DefaultResolver) Resolve(value string) (interface{}, bool) {
	if len(value) == 0 {
		return value, true
	}

	if strings.Contains(value, "${env.") {
		// Value format: ${env.ENVVAR1}
		key := value[6 : len(value)-1]
		logger.Debugf("Resolving  value for enviornment variable: '%s'", key)
		return os.LookupEnv(key)
	} else if strings.Contains(value, "${property.") {
		// Value format: ${property.Prop1}
		property := value[11 : len(value)-1]
		logger.Debugf("Resolving  value for property : '%s'", property)
		return Get(property)
	}

	// No resolution needed
	return value, true
}

// Get retrieves the value of the proprty named by the id.
// If the property is present in the registry the value
// (which may be empty) is returned and the boolean is true.
// Otherwise the returned value will be nil and the boolean will
// be false.
func Get(id string) (interface{}, bool) {
	mut.RLock()
	defer mut.RUnlock()
	prop, ok := props[id]
	return prop, ok
}

// Resolve resolves the value expressions like ${property.Prop1}
// or ${env.ENVVAR} using registered resolver. If it can handle such
// expressions, the resolved value is returned and the boolean is true.
// Otherwise the returned value will be nil and the boolean will be false.

func Resolve(value string) (interface{}, bool) {
	mut.RLock()
	defer mut.RUnlock()
	return resolver.Resolve(value)
}

// Register property with given value.
// Only String, Boolean and integer values are supported.
func Register(id string, value interface{}) error {
	mut.Lock()
	defer mut.Unlock()

	if len(id) == 0 {
		return fmt.Errorf("error registering property, id is empty")
	}

	if _, ok := props[id]; ok {
		return fmt.Errorf("Error registering property, property already registered for id '%s'", id)
	}

	switch value.(type) {
	case string:
	case bool:
	case int64:
	default:
		return fmt.Errorf("Error registering property: '%s'. Unsupported type: '%T'. Supported Types: [string, bool, int64]", id, value)
	}

	logger.Debugf("Registering property id: '%s', value: '%s'", id, value)

	props[id] = value

	return nil
}

// Register new resolver with the engine.
// It will override default resolver.
func RegisterResolver(newresolver expr.Resolver) {
	if newresolver != nil {
		mut.Lock()
		defer mut.Unlock()
		logger.Debugf("Registering property resolver: '%s'", reflect.TypeOf(newresolver).String())
		resolver = newresolver
	}
}
