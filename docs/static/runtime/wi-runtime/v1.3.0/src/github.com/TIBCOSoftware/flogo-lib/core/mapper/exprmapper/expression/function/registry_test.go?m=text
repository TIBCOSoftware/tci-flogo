package function

import (
	"bytes"
	"testing"

	"github.com/stretchr/testify/assert"
)

type ConcatRegistryTest struct {
}

func init() {
	Registry(&ConcatRegistryTest{})
}

func (s *ConcatRegistryTest) GetName() string {
	return "concat"
}

func (s *ConcatRegistryTest) GetCategory() string {
	return "test"
}

func (s *ConcatRegistryTest) Eval(strs ...string) string {
	logrus.Debugf("Start test:concat function with parameters %s", strs)
	var buffer bytes.Buffer

	for _, v := range strs {
		buffer.WriteString(v)
	}
	logrus.Debugf("Done test:concat function with result %s", buffer.String())
	return buffer.String()
}

func TestGetFunction(t *testing.T) {
	f, err := GetFunction("test.concat")
	assert.Nil(t, err)
	assert.NotNil(t, f)
	assert.Equal(t, "concat", f.GetName())
	assert.Equal(t, "test", f.GetCategory())
}

func TestGetFunctionByTag(t *testing.T) {
	f, err := GetFunctionByTag("concat", "test")
	assert.Nil(t, err)
	assert.NotNil(t, f)
	assert.Equal(t, "concat", f.GetName())
	assert.Equal(t, "test", f.GetCategory())
}

func TestListAllFunctions(t *testing.T) {
	funcs := ListAllFunctions()
	assert.NotNil(t, funcs)
}
