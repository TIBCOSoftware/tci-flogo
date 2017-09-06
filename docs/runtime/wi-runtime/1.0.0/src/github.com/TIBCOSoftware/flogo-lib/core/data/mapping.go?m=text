package data

// MappingType is an enum for possible MappingDef Types
type MappingType int

const (
	// MtAssign denotes an attribute to attribute assignment
	MtAssign MappingType = 1

	// MtLiteral denotes a literal to attribute assignment
	MtLiteral MappingType = 2

	// MtExpression denotes a expression execution to perform mapping
	MtExpression MappingType = 3
)

// MappingDef is a simple structure that defines a mapping
type MappingDef struct {
	//Type the mapping type
	Type MappingType `json:"type"`

	//Value the mapping value to execute to determine the result (lhs)
	Value string `json:"value"`

	//Result the name of attribute to place the result of the mapping in (rhs)
	MapTo string `json:"mapTo"`
}

// Mapper is a constructs that maps values from one scope to another
type Mapper interface {
	Apply(inputScope Scope, outputScope Scope) error
}
