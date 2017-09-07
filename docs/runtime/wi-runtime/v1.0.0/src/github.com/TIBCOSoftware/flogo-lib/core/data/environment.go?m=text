package data

import (
	"os"
	"strings"
)

// This function will check if the value is an environment value (for example {MY_VALUE})
// if it is an environment value it will get resolved, otherwise the original value is returned
func ResolveEnv(value string) string {
	if len(value) == 0 {
		return value
	}
	if strings.HasPrefix(value, "{") && strings.HasSuffix(value, "}") {
		// This is an environment value, resolving...
		value = value[1 : len(value)-1]
		if len(value) == 0 {
			return value
		}
		return os.Getenv(value)
	}
	return value
}
