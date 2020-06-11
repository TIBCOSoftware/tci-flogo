This CLI tool allows you to export Flogo application from running Flogo Enterprise Web UI. This can be used as an alternative to explicit application export from the Web UI in your CICD pipelines.

# Using CLI
#### Prerequisite
<li> Flogo Enterprise 2.9.x and above must be installed and started</li>

#### Installation:
<li> Download/Checkout this repository</li>
<li> Add `tools/app-dev` directory to system PATH</li>


#### Usage

##### On Mac:
``
flogodesign-darwin_amd64 --help
``

 
##### On Linux:
``
flogodesign-linux_amd64 --help
``

##### On Windows:
``
flogodesign-windows_amd64.exe --help
``

#### Examples
``
flogodesign-darwin_amd64 export <app_name>
flogodesign-darwin_amd64 export <app_name> --property json
flogodesign-darwin_amd64 export <app_name> --property env
``