package builder

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"time"

	"github.com/project-flogo/cli/common"
	"github.com/spf13/cobra"
)

func init() {

	fePluginCommand.Flags().StringVar(&file, "file", "", "Path to Flogo application json file")
	fePluginCommand.Flags().StringVar(&file, "f", "", "Path to Flogo application json file")

	fePluginCommand.Flags().StringVar(&name, "name", "", "Name of the binary. If not provided, binary with name <APPNAME>-<OS_NAME>-<OS_ARCH> will be generated")
	fePluginCommand.Flags().StringVar(&name, "n", "", "Name of the binary. If not provided, binary with name <APPNAME>-<OS_NAME>-<OS_ARCH> will be generated")

	fePluginCommand.Flags().StringVar(&output, "output", "", "Folder where binary to be created. By default, binary will be created in current directory")
	fePluginCommand.Flags().StringVar(&output, "o", "", "Folder where binary to be created. By default, binary will be created in current directory")

	fePluginCommand.Flags().StringVar(&platform, "platform", "", "Build binary for specific platform. Value must be specified in the form of <OS_NAME>/<OS_ARCHITECTURE> e.g. linux/386, linux/amd64, By default, current OS is used")
	fePluginCommand.Flags().StringVar(&platform, "p", "", "Build binary for specific platform. Value must be specified in the form of <OS_NAME>/<OS_ARCHITECTURE> e.g. linux/386, linux/amd64, By default, current OS is used")

	fePluginCommand.Flags().BoolVar(&verbose, "verbose", false, "Enables verbose progress and debug output")
	fePluginCommand.Flags().BoolVar(&verbose, "v", false, "Enables verbose progress and debug output")

	enterpriseBuilderCmd.AddCommand(fePluginCommand)

	common.RegisterPlugin(enterpriseBuilderCmd)
}

var file, name, output, platform string
var verbose bool

var enterpriseBuilderCmd = &cobra.Command{
	Use:   "febuilder",
	Short: "Flogo Enterprise builder support",
	Long:  "Using this command to build Flogo Enterprise apps",
	PersistentPreRun: func(cmd *cobra.Command, args []string) {
	},
}

var fePluginCommand = &cobra.Command{
	Use:   "build [-f flogo.json]",
	Short: "build -f flogo.json",
	Long:  "build the flogo.json file",
	Run: func(cmd *cobra.Command, args []string) {

		var newArg []string
		if len(file) > 0 {
			newArg = append(newArg, "-f", file)
		}

		if len(name) > 0 {
			newArg = append(newArg, "-n", name)
		}

		if len(output) > 0 {
			newArg = append(newArg, "-o", output)
		} else {
			currentDir, err := os.Getwd()
			if err != nil {
				fmt.Fprintf(os.Stderr, "Failed to abtain currect dir, due to %s", err)
				os.Exit(1)
			}
			output = currentDir
		}

		if len(platform) > 0 {
			newArg = append(newArg, "-p", platform)
		}

		if verbose {
			newArg = append(newArg, "-v")
		}

		binFolder, excName := getFEBuilder()
		err := runBuilder(binFolder, excName, newArg)
		if err != nil {
			fmt.Println("Build app eror:", err.Error())
			os.Exit(1)
		}

	},
}

func runBuilder(builderBin string, builderName string, args []string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)

	buildArgs := make([]string, len(args)+1)
	buildArgs[0] = "build"

	for i, v := range args {
		buildArgs[i+1] = v
	}

	path := os.Getenv("PATH")
	path = fmt.Sprintf("%s:%s", path, builderBin)
	os.Setenv("PATH", path)

	builderCmd := exec.CommandContext(ctx, builderName, buildArgs...)
	builderCmd.Dir = builderBin
	builderCmd.Stdout = os.Stdout
	builderCmd.Stderr = os.Stderr
	defer func() {
		cancel()
	}()

	err := builderCmd.Run()
	if err != nil {
		if err.Error() == "signal: killed" {
			return fmt.Errorf("build app timeout")
		} else {
			return fmt.Errorf("build app failed, %s", err.Error())
		}
	}
	defer func() {
		os.Setenv("PATH", path)
	}()
	return nil
}

func getFEBuilder() (string, string) {
	flogoHome, ok := os.LookupEnv("FLOGO_HOME")
	if !ok {
		fmt.Fprintf(os.Stderr, "Flogo Enterprise Home(FLOGO_HOME) env var must set")
		os.Exit(1)
	}

	builderBin := filepath.Join(flogoHome, "bin")
	var builderName string
	if runtime.GOOS == "linux" {
		builderName = "builder-linux_amd64"
	} else if runtime.GOOS == "darwin" {
		builderName = "builder-darwin_amd64"
	} else if runtime.GOOS == "windows" {
		builderName = "builder-windows_amd64.exe"
	} else {
		fmt.Fprintf(os.Stderr, "Unsupport os [%s] defect,  supported os [linux,windows,darwin]", runtime.GOOS)
		os.Exit(1)
	}

	if _, err := os.Stat(filepath.Join(builderBin, builderName)); os.IsNotExist(err) {
		fmt.Fprintf(os.Stderr, "builder executable [%s] not exist", filepath.Join(builderBin, builderName))
		os.Exit(1)
	}

	return builderBin, builderName
}
