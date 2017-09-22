package action

import (
	"context"
)

// Action is an action to perform as a result of a trigger
type Action interface {
	// Run this Action
	Run(context context.Context, uri string, options interface{}, handler ResultHandler) error

	// Init sets up the action
	//Init(config Config)
}

// Factory is used to create new instances for an action
type Factory interface {
	New(config *Config) Action
}

// Runner runs actions
type Runner interface {
	//Run the specified Action
	Run(context context.Context, action Action, uri string, options interface{}) (code int, data interface{}, err error)
}

// ResultHandler used to handle results from the Action
type ResultHandler interface {
	HandleResult(code int, data interface{}, err error)

	Done()
}

