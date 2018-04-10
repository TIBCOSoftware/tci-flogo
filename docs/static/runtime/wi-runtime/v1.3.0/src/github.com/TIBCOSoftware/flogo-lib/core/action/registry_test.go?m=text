package action

import (
	"context"
	"testing"

	"github.com/TIBCOSoftware/flogo-lib/core/data"
	"github.com/stretchr/testify/assert"
)

type MockFactory struct {
}

func (f *MockFactory) New(config *Config) (Action, error) {
	return &MockAction{}, nil
}

type MockAction struct {
}

func (t *MockAction) Metadata() *Metadata {
	return nil
}

func (t *MockAction) IOMetadata() *data.IOMetadata {
	return nil
}

func (t *MockAction) Run(context context.Context, inputs map[string]*data.Attribute, handler ResultHandler) error {
	return nil
}

//TestRegisterFactoryEmptyRef
func TestRegisterFactoryEmptyRef(t *testing.T) {

	orig := actionFactories
	actionFactories = make(map[string]Factory)
	defer func() { actionFactories = orig }()

	// Register factory
	err := RegisterFactory("", nil)

	assert.NotNil(t, err)
	assert.Equal(t, "'ref' must be specified when registering an action factory", err.Error())
}

//TestRegisterFactoryNilFactory
func TestRegisterFactoryNilFactory(t *testing.T) {

	orig := actionFactories
	actionFactories = make(map[string]Factory)
	defer func() { actionFactories = orig }()

	// Register factory
	err := RegisterFactory("github.com/mock", nil)

	assert.NotNil(t, err)
	assert.Equal(t, "cannot register 'nil' action factory", err.Error())
}

//TestAddFactoryDuplicated
func TestAddFactoryDuplicated(t *testing.T) {

	orig := actionFactories
	actionFactories = make(map[string]Factory)
	defer func() { actionFactories = orig }()

	f := &MockFactory{}

	// Register factory: this time should pass
	err := RegisterFactory("github.com/mock", f)
	assert.Nil(t, err)

	// Register factory: this time should fail, duplicated
	err = RegisterFactory("github.com/mock", f)
	assert.NotNil(t, err)
	assert.Equal(t, "action factory already registered for ref 'github.com/mock'", err.Error())
}

//TestAddFactoryOk
func TestAddFactoryOk(t *testing.T) {

	orig := actionFactories
	actionFactories = make(map[string]Factory)
	defer func() { actionFactories = orig }()

	f := &MockFactory{}

	// Add factory
	err := RegisterFactory("github.com/mock", f)
	assert.Nil(t, err)
	assert.Equal(t, 1, len(actionFactories))
}

//TestGetFactoriesOk
func TestGetFactoriesOk(t *testing.T) {

	orig := actionFactories
	actionFactories = make(map[string]Factory)
	defer func() { actionFactories = orig }()

	f := &MockFactory{}

	// Add factory
	err := RegisterFactory("github.com/mock", f)
	assert.Nil(t, err)

	// Get factory
	fs := Factories()
	assert.Equal(t, 1, len(fs))
}
