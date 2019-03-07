
---
date: 2016-04-09T16:50:16+02:00
title: trigger.go
weight: 59
---

Every extension must write the runtime code in Go (`trigger.go`). You can, and really should, leverage the Go testing framework for writing unit test cases (`trigger_test.go`) for your extension. The code here give you an overview of what files are structured like, but for samples you should really check out the samples section!

**trigger.go**
```go
package sample
 
import (
    "github.com/TIBCOSoftware/flogo-lib/core/action"
    "github.com/TIBCOSoftware/flogo-lib/core/trigger"
    "github.com/TIBCOSoftware/flogo-lib/logger"
)
 
// Create a logger for the Sample Trigger
// Logger Name : <category>-trigger-<type>
var triggerLog = logger.GetLogger("demo-trigger-sample")
 
// Trigger must define a struct
type SampleTrigger struct {
    // Trigger Metadata
    metadata *trigger.Metadata
    // Flow action that would create a flow instance
    runner   action.Runner
    // Trigger configuration
    config   *trigger.Config
}
 
// Sample Trigger factory
// Trigger must define a factory
type SampleTriggerFactory struct {
    // Trigger Metadata
    metadata *trigger.Metadata
}
 
// NewFactory create a new Trigger factory
// Trigger must define this function
func NewFactory(md *trigger.Metadata) trigger.Factory {
    return &SampleTriggerFactory{metadata: md}
}
 
// Creates a new trigger instance for a given id
// Trigger must define this method
func (t *SampleTriggerFactory) New(config *trigger.Config) trigger.Trigger {
    return &SampleTrigger{metadata: t.metadata, config: config}
}
 
// Returns trigger metadata
// Trigger must define this method
func (t *SampleTrigger) Metadata() *trigger.Metadata {
    return t.metadata
}
 
// Set flow runner
// Trigger must define this method
func (t *SampleTrigger) Init(runner action.Runner) {
    // Flow runner must be stored
    t.runner = runner
}
 
// Start trigger. Start will be called once engine is started successfully.
func (t *SampleTrigger) Start() error {
    return nil
}
 
// Stop trigger. Stop will be called in case engine is gracefully stopped.
func (t *SampleTrigger) Stop() error {
    return nil
}
```

#### How to read trigger configuration in runtime code?
Any trigger configuration defined in the trigger model can be accessed through *trigger.Config.

**trigger.json**
```json
{
  "name":"Sample Trigger",
  ......
  "settings":[
    {
      "name": "field1",
      "type": "string",
      "required": true,
      "value": "This is field1 value"
    }
  ],
  "handler":{
   .....
   },
  "outputs":[
  ]
}
```
**trigger.go**
```go
package sample
 
import (
    "github.com/TIBCOSoftware/flogo-lib/core/action"
    "github.com/TIBCOSoftware/flogo-lib/core/trigger"
    "github.com/TIBCOSoftware/flogo-lib/logger"
)
 
const (
    ivField1    = "field1"
)
 
 
type SampleTrigger struct {
    // Trigger Metadata
    metadata *trigger.Metadata
    // Flow action that would create a flow instance
    runner   action.Runner
    // Trigger configuration
    config   *trigger.Config
}
......
func (t *SampleTrigger) Init(runner action.Runner) {
    t.runner = runner
    field1 := t.config.Settings[ivField1].(string) // Type casting is required
}
```
### How to read handler configuration in runtime code?
Any handler configuration defined in the trigger model can be accessed through `*trigger.Config`.

**trigger.json**
```json
{
  "name":"Sample Trigger",
  ......
  "settings":[
    ....
  ],
  "handler":{
     "settings":[
      {
        "name": "field1",
        "type": "string",
        "required": true,
        "value": "This is field1 value"
      }
    ]
   },
  "outputs":[
  ]
}
```
**trigger.go**
```go
package sample
 
import (
    "github.com/TIBCOSoftware/flogo-lib/core/action"
    "github.com/TIBCOSoftware/flogo-lib/core/trigger"
    "github.com/TIBCOSoftware/flogo-lib/logger"
)
 
const (
    ivField1    = "field1"
)
 
 
type SampleTrigger struct {
    // Trigger Metadata
    metadata *trigger.Metadata
    // Flow action that would create a flow instance
    runner   action.Runner
    // Trigger configuration
    config   *trigger.Config
}
......
func (t *SampleTrigger) Init(runner action.Runner) {
    t.runner = runner
    for _, handler := range t.config.Handlers { // For trigger, there would be one or more handlers
       field1 := handler.Settings[ivField1].(string) // Type casting is required
    }
}
```