package engine

import (
	"os"
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
)

//TestNewPooledConfigOk
func TestNewPooledConfigDefault(t *testing.T) {
	pooledConfig := NewPooledRunnerConfig()

	// assert Success
	assert.Equal(t, RUNNER_WORKERS_DEFAULT, pooledConfig.NumWorkers)
	assert.Equal(t, RUNNER_QUEUE_SIZE_DEFAULT, pooledConfig.WorkQueueSize)
}

//TestNewPooledConfigOk
func TestNewPooledConfigOverride(t *testing.T) {
	previousWorkers := os.Getenv(ENV_RUNNER_WORKERS_KEY)
	defer os.Setenv(ENV_RUNNER_WORKERS_KEY, previousWorkers)
	previousQueue := os.Getenv(ENV_RUNNER_QUEUE_SIZE_KEY)
	defer os.Setenv(ENV_RUNNER_QUEUE_SIZE_KEY, previousQueue)

	newWorkersValue := 6
	newQueueValue := 60

	// Change values
	os.Setenv(ENV_RUNNER_WORKERS_KEY, strconv.Itoa(newWorkersValue))
	os.Setenv(ENV_RUNNER_QUEUE_SIZE_KEY, strconv.Itoa(newQueueValue))

	pooledConfig := NewPooledRunnerConfig()

	// assert Success
	assert.Equal(t, newWorkersValue, pooledConfig.NumWorkers)
	assert.Equal(t, newQueueValue, pooledConfig.WorkQueueSize)
}
