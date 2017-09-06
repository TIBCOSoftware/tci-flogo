package trigger

import (
	"github.com/TIBCOSoftware/flogo-lib/core/data"
)

// Config is the configuration for a Trigger
type Config struct {
	Name     string                 `json:"name"`
	Id       string                 `json:"id"`
	Ref      string                 `json:"ref"`
	Settings map[string]interface{} `json:"settings"`
	Outputs  map[string]interface{} `json:"outputs"`
	Handlers []*HandlerConfig       `json:"handlers"`

	//deprecated
	//Settings map[string]string `json:"settings"`
	Endpoints []*EndpointConfig `json:"endpoints"`
}

func (c *Config) FixUp(metadata *Metadata) {

	// fix up top-level outputs
	for name, value := range c.Outputs {

		attr, ok := metadata.Outputs[name]

		if ok {
			newValue, err := data.CoerceToValue(value, attr.Type)

			if err != nil {
				//todo handle error
			} else {
				c.Outputs[name] = newValue
			}
		}
	}

	// fix up handler outputs
	for _, hc := range c.Handlers {

		hc.parent = c

		for name, value := range hc.Outputs {

			attr, ok := metadata.Outputs[name]

			if ok {
				newValue, err := data.CoerceToValue(value, attr.Type)

				if err != nil {
					//todo handle error
				} else {
					hc.Outputs[name] = newValue
				}
			}
		}
	}
}

func (c *Config) GetSetting(setting string) string {
	return c.Settings[setting].(string)
}

// HandlerConfig is the configuration for the Trigger Handler
type HandlerConfig struct {
	parent   *Config
	ActionId string                 `json:"actionId"`
	Settings map[string]interface{} `json:"settings"`
	Outputs  map[string]interface{} `json:"outputs"`
}

func (hc *HandlerConfig) GetSetting(setting string) string {
	return hc.Settings[setting].(string)
}

func (hc *HandlerConfig) GetOutput(name string) interface{} {

	value, ok := hc.Outputs[name]

	if !ok {
		value, ok = hc.parent.Outputs[name]
	}

	return value
}

// EndpointConfig is the configuration for a specific endpoint for the
// Trigger // Deprecated
type EndpointConfig struct {
	ActionId   string            `json:"actionId"`
	ActionType string            `json:"actionType"`
	ActionURI  string            `json:"actionURI"`
	Settings   map[string]string `json:"settings"`
}
