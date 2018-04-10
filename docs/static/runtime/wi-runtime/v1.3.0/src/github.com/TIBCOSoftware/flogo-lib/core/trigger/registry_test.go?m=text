package trigger

import (
	//"context"
	"testing"

	"github.com/TIBCOSoftware/flogo-lib/core/action"
	"github.com/stretchr/testify/assert"
)

type MockFactory struct {
}

func (f *MockFactory) New(config *Config) Trigger {
	return &MockTrigger{}
}

type MockTrigger struct {
}

func (t *MockTrigger) Init(actionRunner action.Runner) {
	//Noop
}

func (t *MockTrigger) Start() error        { return nil }
func (t *MockTrigger) Stop() error         { return nil }
func (t *MockTrigger) Metadata() *Metadata { return nil }

//TestRegisterFactoryEmptyRef
func TestRegisterFactoryEmptyRef(t *testing.T) {

	orig := triggerFactories
	triggerFactories = make(map[string]Factory)
	defer func() { triggerFactories = orig }()

	// Register factory
	err := RegisterFactory("", nil)

	assert.NotNil(t, err)
	assert.Equal(t, "'ref' must be specified when registering a trigger factory", err.Error())
}

//TestRegisterFactoryNilFactory
func TestRegisterFactoryNilFactory(t *testing.T) {

	orig := triggerFactories
	triggerFactories = make(map[string]Factory)
	defer func() { triggerFactories = orig }()

	// Register factory
	err := RegisterFactory("github.com/mock", nil)

	assert.NotNil(t, err)
	assert.Equal(t, "cannot register 'nil' trigger factory", err.Error())
}

//TestAddFactoryDuplicated
func TestAddFactoryDuplicated(t *testing.T) {

	orig := triggerFactories
	triggerFactories = make(map[string]Factory)
	defer func() { triggerFactories = orig }()

	f := &MockFactory{}

	// Register factory: this time should pass
	err := RegisterFactory("github.com/mock", f)
	assert.Nil(t, err)

	// Register factory: this time should fail, duplicated
	err = RegisterFactory("github.com/mock", f)
	assert.NotNil(t, err)
	assert.Equal(t, "trigger factory already registered for ref 'github.com/mock'", err.Error())
}

//TestAddFactoryOk
func TestAddFactoryOk(t *testing.T) {

	orig := triggerFactories
	triggerFactories = make(map[string]Factory)
	defer func() { triggerFactories = orig }()

	f := &MockFactory{}

	// Add factory
	err := RegisterFactory("github.com/mock", f)
	assert.Nil(t, err)
	assert.Equal(t, 1, len(triggerFactories))
}

//TestGetFactoriesOk
func TestGetFactoriesOk(t *testing.T) {

	orig := triggerFactories
	triggerFactories = make(map[string]Factory)
	defer func() { triggerFactories = orig }()

	f := &MockFactory{}

	// Add factory
	err := RegisterFactory("github.com/mock", f)
	assert.Nil(t, err)

	// Get factory
	fs := Factories()
	assert.Equal(t, 1, len(fs))
}
