package engine

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"runtime/debug"

	"github.com/TIBCOSoftware/flogo-lib/app"
	"github.com/TIBCOSoftware/flogo-lib/config"
	"github.com/TIBCOSoftware/flogo-lib/core/action"
	"github.com/TIBCOSoftware/flogo-lib/core/property"
	"github.com/TIBCOSoftware/flogo-lib/core/trigger"
	"github.com/TIBCOSoftware/flogo-lib/engine/runner"
	"github.com/TIBCOSoftware/flogo-lib/logger"
	"github.com/TIBCOSoftware/flogo-lib/util"
)

// Interface for the engine behaviour
// Todo: rename to Engine once the refactoring is completed
type IEngine interface {
	Start()
	Stop()
}

// Engine creates and executes FlowInstances.
type Engine struct {
	generator      *util.Generator
	runner         action.Runner
	serviceManager *util.ServiceManager
	engineConfig   *Config
	triggersConfig *TriggersConfig
}

// EngineConfig is the type for the Engine Configuration
type EngineConfig struct {
	App            *app.Config
	LogLevel       string
	runner         action.Runner
	serviceManager *util.ServiceManager
}

// New creates a new Engine
func New(app *app.Config) (IEngine, error) {
	// App is required
	if app == nil {
		return nil, errors.New("Error: No App configuration provided")
	}
	// Name is required
	if len(app.Name) == 0 {
		return nil, errors.New("Error: No App name provided")
	}
	// Version is required
	if len(app.Version) == 0 {
		return nil, errors.New("Error: No App version provided")
	}

	logLevel := config.GetLogLevel()

	runnerType := config.GetRunnerType()

	var r action.Runner
	// Todo document this values for engine configuration
	if runnerType == "DIRECT" {
		r = runner.NewDirect()
	} else {
		runnerConfig := defaultRunnerConfig()
		r = runner.NewPooled(runnerConfig.Pooled)
	}

	return &EngineConfig{App: app, LogLevel: logLevel, runner: r, serviceManager: util.GetDefaultServiceManager()}, nil
}

//Start initializes and starts the Triggers and initializes the Actions
func (e *EngineConfig) Start() {
	logger.Info("Engine: Starting...")

	// Initialize the properties
	for id, value := range e.App.Properties {
		property.Register(id, value)
	}

	instanceHelper := app.NewInstanceHelper(e.App, trigger.Factories(), action.Factories())

	// Create the trigger instances
	tInstances, err := instanceHelper.CreateTriggers()
	if err != nil {
		errorMsg := fmt.Sprintf("Engine: Error Creating trigger instances - %s", err.Error())
		logger.Error(errorMsg)
		panic(errorMsg)
	}

	// Initialize and register the triggers
	for key, value := range tInstances {
		triggerInterface := value.Interf

		//Init
		triggerInterface.Init(e.runner)
		//Register
		trigger.RegisterInstance(key, value)
	}

	// Create the action instances
	actions, err := instanceHelper.CreateActions()
	if err != nil {
		errorMsg := fmt.Sprintf("Engine: Error Creating action instances - %s", err.Error())
		logger.Error(errorMsg)
		panic(errorMsg)
	}

	// Initialize and register the actions,
	for key, value := range actions {

		action.Register(key, value)
		//do we need an init? or start
	}

	runner := e.runner.(interface{})
	managedRunner, ok := runner.(util.Managed)

	if ok {
		util.StartManaged("ActionRunner Service", managedRunner)
	}

	logger.Info("Engine: Starting Services...")

	err = e.serviceManager.Start()

	if err != nil {
		logger.Error("Engine: Error Starting Services - " + err.Error())
	} else {
		logger.Info("Engine: Started Services")
	}

	// Start the triggers
	for key, value := range tInstances {
		err := util.StartManaged(fmt.Sprintf("Trigger [ '%s' ]", key), value.Interf)
		if err != nil {
			logger.Infof("Trigger [%s] failed to start due to error [%s]", key, err.Error())
			value.Status = trigger.Failed
			value.Error = err
			logger.Debugf("StackTrace: %s", debug.Stack())
			if config.StopEngineOnError() {
				logger.Debugf("{%s=true}. Stopping engine", config.STOP_ENGINE_ON_ERROR_KEY)
				logger.Info("Engine: Stopped")
				os.Exit(1)
			}
		} else {
			logger.Infof("Trigger [%s] started", key)
			value.Status = trigger.Started
		}
	}

	logger.Info("Engine: Started")
}

func (e *EngineConfig) Stop() {
	logger.Info("Engine: Stopping...")

	// Stop Triggers
	tConfigs := e.App.Triggers

	for _, tConfig := range tConfigs {
		// Get instance
		tInst := trigger.Instance(tConfig.Id)
		if tInst == nil {
			//nothing to stop
			continue
		}
		tInterf := tInst.Interf
		if tInterf == nil {
			//nothing to stop
			continue
		}
		util.StopManaged("Trigger [ "+tConfig.Id+" ]", tInterf)
	}

	runner := e.runner.(interface{})
	managedRunner, ok := runner.(util.Managed)

	if ok {
		util.StopManaged("ActionRunner", managedRunner)
	}

	//TODO temporarily add services
	logger.Info("Engine: Stopping Services...")

	err := e.serviceManager.Stop()

	if err != nil {
		logger.Error("Engine: Error Stopping Services - " + err.Error())
	} else {
		logger.Info("Engine: Stopped Services")
	}

	logger.Info("Engine: Stopped")
}

// NewEngine create a new Engine
func NewEngine(engineConfig *Config, triggersConfig *TriggersConfig) *Engine {

	var engine Engine
	engine.generator, _ = util.NewGenerator()
	engine.engineConfig = engineConfig

	engine.triggersConfig = triggersConfig
	engine.serviceManager = util.NewServiceManager()

	runnerConfig := engineConfig.RunnerConfig

	if runnerConfig.Type == "direct" {
		engine.runner = runner.NewDirect()
	} else {
		engine.runner = runner.NewPooled(runnerConfig.Pooled)
	}

	cfgJSON, _ := json.MarshalIndent(engineConfig, "", "  ")
	logger.Debugf("Engine Configuration:\n%s\n", string(cfgJSON))

	cfgJSON, _ = json.MarshalIndent(triggersConfig, "", "  ")
	logger.Debugf("Triggers Configuration:\n%s\n", string(cfgJSON))

	return &engine
}

// RegisterService register a service with the engine
func (e *Engine) RegisterService(service util.Service) {
	e.serviceManager.RegisterService(service)
}

// Start will start the engine, by starting all of its triggers and runner
func (e *Engine) Start() {

	logger.Info("Engine: Starting...")

	logger.Info("Engine: Starting Services...")

	err := e.serviceManager.Start()

	if err != nil {
		e.serviceManager.Stop()
		panic("Engine: Error Starting Services - " + err.Error())
	}

	logger.Info("Engine: Started Services")

	validateTriggers := e.engineConfig.ValidateTriggers

	triggers := trigger.Triggers()

	var triggersToStart []trigger.TriggerDeprecated

	// initialize triggers
	for _, trigger := range triggers {

		triggerConfig, found := e.triggersConfig.Triggers[trigger.Metadata().ID]

		if !found && validateTriggers {
			panic(fmt.Errorf("Trigger configuration for '%s' not provided", trigger.Metadata().ID))
		}

		if found {
			trigger.Init(triggerConfig, e.runner)
			triggersToStart = append(triggersToStart, trigger)
		}
	}

	runner := e.runner.(interface{})
	managedRunner, ok := runner.(util.Managed)

	if ok {
		util.StartManaged("ActionRunner Service", managedRunner)
	}

	// start triggers
	for _, trigger := range triggersToStart {
		err := util.StartManaged("Trigger [ "+trigger.Metadata().ID+" ]", trigger)
		if err != nil {
			panic(err)
		}
	}

	logger.Info("Engine: Started")
}

// Stop will stop the engine, by stopping all of its triggers and runner
func (e *Engine) Stop() {

	logger.Info("Engine: Stopping...")

	triggers := trigger.Triggers()

	// stop triggers
	for _, trigger := range triggers {
		util.StopManaged("Trigger [ "+trigger.Metadata().ID+" ]", trigger)
	}

	runner := e.runner.(interface{})
	managedRunner, ok := runner.(util.Managed)

	if ok {
		util.StopManaged("ActionRunner", managedRunner)
	}

	logger.Info("Engine: Stopping Services...")

	err := e.serviceManager.Stop()

	if err != nil {
		logger.Error("Engine: Error Stopping Services - " + err.Error())
	} else {
		logger.Info("Engine: Stopped Services")
	}

	logger.Info("Engine: Stopped")
}
