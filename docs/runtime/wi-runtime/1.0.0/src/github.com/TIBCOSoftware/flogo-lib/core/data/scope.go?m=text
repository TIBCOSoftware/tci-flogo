package data

import (
	"errors"
	"sync"
)

// Scope is a set of attributes that are accessible
type Scope interface {

	// GetAttr gets the specified attribute
	GetAttr(name string) (attr *Attribute, exists bool)

	// SetAttrValue sets the value of the specified attribute
	SetAttrValue(name string, value interface{}) error
}

// MutableScope is a scope that new attributes can be added
type MutableScope interface {
	Scope

	//AddAttr adds an attribute to the scope
	AddAttr(name string, valueType Type, value interface{}) *Attribute
}

// SimpleScope is a basic implementation of a scope
type SimpleScope struct {
	parentScope Scope
	attrs       map[string]*Attribute
}

// NewSimpleScope creates a new SimpleScope
func NewSimpleScope(attrs []*Attribute, parentScope Scope) Scope {

	return newSimpleScope(attrs, parentScope)
}

// NewSimpleScope creates a new SimpleScope
func newSimpleScope(attrs []*Attribute, parentScope Scope) *SimpleScope {

	scope := &SimpleScope{
		parentScope: parentScope,
		attrs:       make(map[string]*Attribute),
	}

	for _, attr := range attrs {
		scope.attrs[attr.Name] = attr
	}

	return scope
}

// GetAttr implements Scope.GetAttr
func (s *SimpleScope) GetAttr(name string) (attr *Attribute, exists bool) {

	attr, found := s.attrs[name]

	if found {
		return attr, true
	}

	if s.parentScope != nil {
		return s.parentScope.GetAttr(name)
	}

	return nil, false
}

// SetAttrValue implements Scope.SetAttrValue
func (s *SimpleScope) SetAttrValue(name string, value interface{}) error {

	attr, found := s.attrs[name]

	if found {
		attr.Value = value
		return nil
	}

	return errors.New("attribute not in scope")
}

// AddAttr implements MutableScope.AddAttr
func (s *SimpleScope) AddAttr(name string, valueType Type, value interface{}) *Attribute {

	attr, found := s.attrs[name]

	if found {
		attr.Value = value
	} else {
		attr = NewAttribute(name, valueType, value)
		s.attrs[name] = attr
	}

	return attr
}

// SimpleSyncScope is a basic implementation of a synchronized scope
type SimpleSyncScope struct {
	scope *SimpleScope
	mutex sync.Mutex
}

// NewSimpleSyncScope creates a new SimpleSyncScope
func NewSimpleSyncScope(attrs []*Attribute, parentScope Scope) MutableScope {

	var syncScope SimpleSyncScope
	syncScope.scope = newSimpleScope(attrs, parentScope)

	return &syncScope
}

// GetAttr implements Scope.GetAttr
func (s *SimpleSyncScope) GetAttr(name string) (value *Attribute, exists bool) {

	s.mutex.Lock()
	defer s.mutex.Unlock()

	return s.scope.GetAttr(name)
}

// SetAttrValue implements Scope.SetAttrValue
func (s *SimpleSyncScope) SetAttrValue(name string, value interface{}) error {

	s.mutex.Lock()
	defer s.mutex.Unlock()

	return s.scope.SetAttrValue(name, value)
}

// AddAttr implements MutableScope.AddAttr
func (s *SimpleSyncScope) AddAttr(name string, valueType Type, value interface{}) *Attribute {

	s.mutex.Lock()
	defer s.mutex.Unlock()

	return s.scope.AddAttr(name, valueType, value)
}

var (
	globalScope = NewSimpleSyncScope(nil, nil)
)

// GetGlobalScope gets the global scope the application
func GetGlobalScope() MutableScope {
	return globalScope
}
