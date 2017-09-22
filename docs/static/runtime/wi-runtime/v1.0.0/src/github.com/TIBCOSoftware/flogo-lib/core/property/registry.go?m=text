package property

import (
	"fmt"
	"sync"

	"github.com/TIBCOSoftware/flogo-lib/core/data"
	"github.com/TIBCOSoftware/flogo-lib/logger"
)

var (
	props = make(map[string]string)
	mut   = sync.RWMutex{}
)

// Get returns the value of the property for the given id
// If it is an environment property (for example {MY_PROP})
// The value will be looked up in the os environment
func Get(id string) string {
	mut.RLock()
	defer mut.RUnlock()
	prop, ok := props[id]
	if !ok {
		return prop
	}
	return data.ResolveEnv(prop)
}

func Register(id, value string) error {
	mut.Lock()
	defer mut.Unlock()

	if len(id) == 0 {
		return fmt.Errorf("error registering property, id is empty")
	}

	if _, ok := props[id]; ok {
		return fmt.Errorf("Error registering property, property already registered for id '%s'", id)
	}

	logger.Debugf("Registering property id: '%s', value: '%s'", id, value)

	props[id] = value

	return nil
}
