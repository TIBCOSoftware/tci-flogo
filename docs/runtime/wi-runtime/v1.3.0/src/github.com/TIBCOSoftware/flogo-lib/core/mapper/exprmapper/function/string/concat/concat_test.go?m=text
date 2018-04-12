package concat

import (
	"fmt"
	"testing"

	"github.com/TIBCOSoftware/flogo-lib/core/mapper/exprmapper/expression"
	"github.com/stretchr/testify/assert"
)

var s = &Concat{}

func TestStaticFunc_Concat(t *testing.T) {
	final, err := s.Eval("TIBCO", "FLOGO", "IOT")
	assert.Nil(t, err)
	fmt.Println(final)
	assert.Equal(t, final, "TIBCOFLOGOIOT")
}

func TestExpressionDoubleQuotes(t *testing.T) {
	fun, err := expression.NewFunctionExpression(`string.concat('TIBCO',' Flo"go')`).GetFunction()
	assert.Nil(t, err)
	assert.NotNil(t, fun)
	v, err := fun.Eval()
	assert.Nil(t, err)
	assert.Equal(t, `TIBCO Flo"go`, v[0])
}

func TestExpressionSingleQuote(t *testing.T) {
	fun, err := expression.NewFunctionExpression(`string.concat("TIBCO"," Flo'o\o{go")`).GetFunction()
	assert.Nil(t, err)
	assert.NotNil(t, fun)
	v, err := fun.Eval()
	assert.Nil(t, err)
	assert.Equal(t, "TIBCO Flo'o\\o{go", v[0])
}

func TestExpressionCombine(t *testing.T) {
	fun, err := expression.NewFunctionExpression(`string.concat('Hello', " 'World'")`).GetFunction()
	assert.Nil(t, err)
	assert.NotNil(t, fun)
	v, err := fun.Eval()
	assert.Nil(t, err)
	assert.Equal(t, `Hello 'World'`, v[0])
}

func TestExpressionCombine2(t *testing.T) {
	fun, err := expression.NewFunctionExpression(`string.concat('Hello', ' "World"')`).GetFunction()
	assert.Nil(t, err)
	assert.NotNil(t, fun)
	v, err := fun.Eval()
	assert.Nil(t, err)
	assert.Equal(t, `Hello "World"`, v[0])
}
func TestExpressionNewLine(t *testing.T) {
	fun, err := expression.NewFunctionExpression(`string.concat(
	"TIBCO",
	" FLOGO"
	)`).GetFunction()
	assert.Nil(t, err)
	assert.NotNil(t, fun)
	v, err := fun.Eval()
	assert.Nil(t, err)
	assert.Equal(t, "TIBCO FLOGO", v[0])
}

func TestExpressionSpace(t *testing.T) {
	fun, err := expression.NewFunctionExpression(`string.concat(    "TIBCO"  ,  " FLOGO")   `).GetFunction()
	assert.Nil(t, err)
	assert.NotNil(t, fun)
	v, err := fun.Eval()
	assert.Nil(t, err)
	assert.Equal(t, "TIBCO FLOGO", v[0])
}

func TestExpressionSpaceNewLineTab(t *testing.T) {
	fun, err := expression.NewFunctionExpression(`string.concat(    "TIBCO" 
		 ,	" FLOGO"	
		 )`).GetFunction()
	assert.Nil(t, err)
	assert.NotNil(t, fun)
	v, err := fun.Eval()
	assert.Nil(t, err)
	assert.Equal(t, "TIBCO FLOGO", v[0])
}

func TestExpressionDoubleDoubleQuotes(t *testing.T) {
	fun, err := expression.NewFunctionExpression(`string.concat("\"abc\"", "dddd")`).GetFunction()
	assert.Nil(t, err)
	assert.NotNil(t, fun)
	v, err := fun.Eval()
	assert.Nil(t, err)
	assert.Equal(t, `"abc"dddd`, v[0])
}

func TestExpressionSingleSingleQuote(t *testing.T) {
	fun, err := expression.NewFunctionExpression(`string.concat('\'b\'ac\'', "dddd")`).GetFunction()
	assert.Nil(t, err)
	assert.NotNil(t, fun)
	v, err := fun.Eval()
	assert.Nil(t, err)
	assert.Equal(t, `'b'ac'dddd`, v[0])
}
