package expression

import (
	"encoding/json"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestExpressionTernary(t *testing.T) {
	v, err := NewExpression(`1>2?string.concat("sss","ddddd"):"fff"`).GetTernaryExpression()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	s, _ := json.Marshal(v)
	fmt.Println("-------------------", string(s))
	result, err := v.EvalWithScope(nil, nil)
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, "fff", result)

	fmt.Println("Result:", result)
}

func TestExpressionTernaryString(t *testing.T) {
	v, err := NewExpression(`1<2?"lixingwang":"fff"`).GetTernaryExpression()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	result, err := v.EvalWithScope(nil, nil)
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, "lixingwang", result)
	fmt.Println("Result:", result)
}

func TestExpressionString(t *testing.T) {
	v, err := NewExpression(`$activity[C].result==3`).GetExpression()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	_, err = v.EvalWithScope(nil, nil)
	assert.NotNil(t, err)
}

func TestExpressionWithOldWay(t *testing.T) {
	v, err := NewExpression(`${flow.petMax} > 2`).GetExpression()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	_, err = v.EvalWithScope(nil, nil)
	assert.NotNil(t, err)

}

func TestExpressionTernaryFunction(t *testing.T) {
	v, err := NewExpression(`string.length("lixingwang")>11?"lixingwang":"fff"`).GetTernaryExpression()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	result, err := v.EvalWithScope(nil, nil)
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, "fff", result)
	fmt.Println("Result:", result)
}

func TestExpressionTernaryRef(t *testing.T) {
	v, err := NewExpression(`string.length("lixingwang")>11?$A3.Account.Name:$A3.Account.Address`).GetTernaryExpression()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	result, err := v.EvalWithScope(nil, nil)
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}

	assert.Equal(t, "$A3.Account.Address", result)

	fmt.Println("Result:", result)
}

func TestExpressionTernaryRef2(t *testing.T) {
	v, err := NewExpression(`string.length("lixingwang")>11?"lixingwang":"fff"`).GetTernaryExpression()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	s, _ := json.Marshal(v)
	fmt.Println("-------------------", string(s))
	result, err := v.EvalWithScope(nil, nil)
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, "fff", result)

	fmt.Println("Result:", result)
}

func TestWeExpr_LinkMapping(t *testing.T) {
	expr, err := NewExpression(`$T.parameters.path_params[0].value==2`).GetExpression()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	fmt.Println("Result:", expr)
}

func TestWeExpr_LinkMapping2(t *testing.T) {
	v, err := NewExpression(`$T.parameters==2`).GetExpression()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	fmt.Println("Result:", v)
}

func TestExpressionInt(t *testing.T) {
	v, err := NewExpression(`123==456`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, false, v)

	fmt.Println("Result:", v)
}

func TestExpressionEQ(t *testing.T) {
	v, err := NewExpression(`123==123`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, true, v)

	fmt.Println("Result:", v)
}

func TestExpressionEQFunction(t *testing.T) {
	v, err := NewExpression(`string.concat("123","456")=="123456"`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, true, v)
	fmt.Println("Result:", v)
}

func TestExpressionEQFunction2Side(t *testing.T) {
	v, err := NewExpression(`string.concat("123","456") == string.concat("12","3456")`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, true, v)
	fmt.Println("Result:", v)
}

func TestExpressionRef(t *testing.T) {
	_, err := NewExpression(`$A4.query.name=="name"`).Eval()
	assert.NotNil(t, err)
}

func TestExpressionFunction(t *testing.T) {
	v, err := NewExpression(`string.concat("tibco","software")=="tibcosoftware"`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, true, v)

	fmt.Println("Result:", v)
}

func TestExpressionAnd(t *testing.T) {
	v, err := NewExpression(`("dddddd" == "dddd3dd") && ("133" == "123")`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, false, v)
	fmt.Println("Result:", v)
}

func TestExpressionOr(t *testing.T) {
	v, err := NewExpression(`("dddddd" == "dddddd") && ("123" == "123")`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	assert.Equal(t, true, v)
	fmt.Println("Result:", v)
}

func TestFunc(t *testing.T) {
	v, err := NewExpression(`string.length("lixingwang") == 10`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	fmt.Println("Result:", v)
	assert.Equal(t, v, true)
	v, err = NewExpression(`string.length("lixingwang") == 10`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	fmt.Println("Result:", v)
	assert.Equal(t, v, true)
}

func TestExpressionGT(t *testing.T) {
	v, err := NewExpression(`string.length("lixingwang") > 10`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	fmt.Println("Result:", v)
	assert.Equal(t, v, false)

	v, err = NewExpression(`string.length("lixingwang") >= 10`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	fmt.Println("Result:", v)
	assert.Equal(t, v, true)

	v, err = NewExpression(`string.length("lixingwang") < 10`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	fmt.Println("Result:", v)
	assert.Equal(t, v, false)

	v, err = NewExpression(`string.length("lixingwang") <= 10`).Eval()
	if err != nil {
		t.Fatal(err)
		t.Failed()
	}
	fmt.Println("Result:", v)
	assert.Equal(t, v, true)

}

func TestIsExpression(t *testing.T) {
	b := IsExpression(`string.length("lixingwang") <= 10`)
	assert.True(t, b)

	b = IsExpression(`1>2?string.concat("sss","ddddd"):"fff"`)
	assert.False(t, b)

	b = IsExpression(`string.length("lixingwang")>11?"lixingwang":"fff"`)
	assert.False(t, b)

	b = IsExpression(`string.length("lixingwang")`)
	assert.False(t, b)

	b = IsExpression(`$A3.name.fields`)
	assert.False(t, b)

}

func TestIsTernayExpression(t *testing.T) {
	b := IsTernaryExpression(`len("lixingwang") <= 10`)
	assert.False(t, b)

	b = IsTernaryExpression(`1>2?concat("sss","ddddd"):"fff"`)
	assert.True(t, b)

	b = IsTernaryExpression(`Len("lixingwang")>11?"lixingwang":"fff"`)
	assert.True(t, b)

	b = IsTernaryExpression(`len("lixingwang")`)
	assert.False(t, b)

	b = IsTernaryExpression(`$A3.name.fields`)
	assert.False(t, b)

}

func TestIsFunction(t *testing.T) {
	b := IsFunction(`len("lixingwang") <= 10`)
	assert.False(t, b)

	b = IsFunction(`1>2?concat("sss","ddddd"):"fff"`)
	assert.False(t, b)

	b = IsFunction(`Len("lixingwang")>11?"lixingwang":"fff"`)
	assert.False(t, b)

	b = IsFunction(`len("lixingwang")`)
	assert.True(t, b)

	b = IsFunction(`$A3.name.fields`)
	assert.False(t, b)
}
