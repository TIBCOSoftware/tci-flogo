package trigger

import (
	"context"

	"github.com/TIBCOSoftware/flogo-lib/core/data"
)

type key int

var attrKey key

// NewContext returns a new Context that carries the trigger data.
func NewContext(ctx context.Context, attrs []*data.Attribute) context.Context {
	return context.WithValue(ctx, attrKey, attrs)
}

// FromContext returns the trigger data stored in ctx, if any.
func FromContext(ctx context.Context) ([]*data.Attribute, bool) {
	u, ok := ctx.Value(attrKey).([]*data.Attribute)
	return u, ok
}
