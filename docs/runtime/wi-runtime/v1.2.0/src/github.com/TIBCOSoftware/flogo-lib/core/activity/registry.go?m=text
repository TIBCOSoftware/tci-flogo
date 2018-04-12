package activity

import (
	"github.com/TIBCOSoftware/flogo-lib/core/data"
	"github.com/TIBCOSoftware/flogo-lib/core/expr"
	"github.com/TIBCOSoftware/flogo-lib/logger"
	"sync"
)

var (
	activitiesMu sync.Mutex
	activities   = make(map[string]Activity)
)

// Resolver resolves the activity for a given scope and path
type resolver struct {
	scope data.Scope
}

func newResolver(scope data.Scope) expr.Resolver {
	return &resolver{scope: scope}
}

func (r *resolver) Resolve(path string) (interface{}, bool) {
	attrName, attrPath, pathType := data.GetAttrPath(path)
	return data.GetAttrValue(attrName, attrPath, pathType, r.scope)
}

// Register registers the specified activity
func Register(activity Activity) {
	activitiesMu.Lock()
	defer activitiesMu.Unlock()

	logger.Debugf("Registering activity: '%s'", activity.Metadata().ID)

	if activity == nil {
		panic("activity.Register: activity is nil")
	}

	id := activity.Metadata().ID

	if _, dup := activities[id]; dup {
		panic("activity.Register: activity already registered " + id)
	}

	// copy on write to avoid synchronization on access
	newActivities := make(map[string]Activity, len(activities))

	for k, v := range activities {
		newActivities[k] = v
	}

	newActivities[id] = activity
	activities = newActivities
}

// Activities gets all the registered activities
func Activities() []Activity {

	var curActivities = activities

	list := make([]Activity, 0, len(curActivities))

	for _, value := range curActivities {
		list = append(list, value)
	}

	return list
}

// Get gets specified activity
func Get(id string) Activity {
	//var curActivities = activities
	return activities[id]
}

// Resolve will resolve the activity for the given path
func Resolve(scope data.Scope, path string) (interface{}, bool) {
	return newResolver(scope).Resolve(path)
}
