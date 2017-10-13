package activity

import (
	"encoding/json"

	"github.com/TIBCOSoftware/flogo-lib/core/data"
)

// Metadata is the metadata for the Activity
type Metadata struct {
	ID      string
	Inputs  map[string]*data.Attribute
	Outputs map[string]*data.Attribute
}

// NewMetadata creates the metadata object from its json representation
func NewMetadata(jsonMetadata string) *Metadata {
	md := &Metadata{}
	err := json.Unmarshal([]byte(jsonMetadata), md)
	if err != nil {
		panic("Unable to parse activity metadata: " + err.Error())
	}

	return md
}

// MarshalJSON overrides the default MarshalJSON for TaskEnv
func (md *Metadata) MarshalJSON() ([]byte, error) {

	inputs := make([]*data.Attribute, 0, len(md.Inputs))

	for _, value := range md.Inputs {
		inputs = append(inputs, value)
	}

	outputs := make([]*data.Attribute, 0, len(md.Outputs))

	for _, value := range md.Outputs {
		outputs = append(outputs, value)
	}

	return json.Marshal(&struct {
		Name    string            `json:"name"`
		Ref     string            `json:"ref"`
		Inputs  []*data.Attribute `json:"inputs"`
		Outputs []*data.Attribute `json:"outputs"`
	}{
		Name:    md.ID,
		Inputs:  inputs,
		Outputs: outputs,
	})
}

// UnmarshalJSON overrides the default UnmarshalJSON for TaskEnv
func (md *Metadata) UnmarshalJSON(b []byte) error {

	ser := &struct {
		Name    string            `json:"name"`
		Ref     string            `json:"ref"`
		Inputs  []*data.Attribute `json:"inputs"`
		Outputs []*data.Attribute `json:"outputs"`
	}{}

	if err := json.Unmarshal(b, ser); err != nil {
		return err
	}

	if len(ser.Ref) > 0 {
		md.ID = ser.Ref
	} else {
		// Added for backwards compatibility
		// TODO remove and add a proper error once the BC is removed
		md.ID = ser.Name
	}

	md.Inputs = make(map[string]*data.Attribute, len(ser.Inputs))
	md.Outputs = make(map[string]*data.Attribute, len(ser.Outputs))

	for _, attr := range ser.Inputs {
		md.Inputs[attr.Name] = attr
	}

	for _, attr := range ser.Outputs {
		md.Outputs[attr.Name] = attr
	}

	return nil
}
