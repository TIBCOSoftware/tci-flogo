package concat

import (
	"github.com/project-flogo/core/data/coerce"
)

type Input struct {
	FirstStr     string `md:"firstString"`
	SecondStr    string `md:"secondString"`
	UseSeparator bool   `md:"useSeparator"`
	Separator    string `md:"separator"`
}

// ToMap conversion
func (i *Input) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"firstString":  i.FirstStr,
		"secondString": i.SecondStr,
		"useSeparator": i.UseSeparator,
		"separator":    i.Separator,
	}
}

// FromMap conversion
func (i *Input) FromMap(values map[string]interface{}) error {
	var err error

	i.FirstStr, err = coerce.ToString(values["firstString"])
	if err != nil {
		return err
	}

	i.SecondStr, err = coerce.ToString(values["secondString"])
	if err != nil {
		return err
	}

	i.UseSeparator, err = coerce.ToBool(values["useSeparator"])
	if err != nil {
		return err
	}

	i.Separator, err = coerce.ToString(values["separator"])
	if err != nil {
		return err
	}
	return nil
}

// Output struct for activity output
type Output struct {
	Result string `md:"result"`
}

// ToMap conversion
func (o *Output) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"result": o.Result,
	}
}

// FromMap conversion
func (o *Output) FromMap(values map[string]interface{}) error {

	var err error
	o.Result, err = coerce.ToString(values["result"])
	if err != nil {
		return err
	}

	return nil
}
