package random

import (
	"fmt"
	"testing"

	"github.com/TIBCOSoftware/flogo-lib/core/mapper/exprmapper/expression"
	"github.com/stretchr/testify/assert"
)

var s = &Random{}

func TestSample(t *testing.T) {
	final1 := s.Eval(100)
	assert.NotNil(t, final1)
}

func TestExpression(t *testing.T) {
	fun, err := expression.NewFunctionExpression(`number.random(100000)`).GetFunction()
	assert.Nil(t, err)
	assert.NotNil(t, fun)
	v, err := fun.Eval()
	assert.Nil(t, err)
	assert.NotNil(t, v[0])
	fmt.Println(v)
}
