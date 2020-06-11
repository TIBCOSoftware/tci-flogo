This CLI tool allows you to export Flogo applications from TIBCO Flogo Enterprise Web UI. Using this tool you can export applictions to a local directory and use your choice of tooling to check them in a Version Control System such as Git. 

# Using CLI
#### Prerequisite
<li> Flogo Enterprise 2.9.x and above must be installed and the Web UI must be runnng</li>

#### Installation:
<li> Download/Checkout this repository</li>
<li> Add `tools/app-dev` directory to system PATH</li>


#### Usage

##### On Mac:
```
flogodesign-darwin_amd64 --help
```

 
##### On Linux:
```
flogodesign-linux_amd64 --help
```

##### On Windows:
```
flogodesign-windows_amd64.exe --help
```

#### Examples
```
flogodesign-darwin_amd64 export <app_name>
```
```
flogodesign-darwin_amd64 export <app_name> --property json
```
```
flogodesign-darwin_amd64 export <app_name> --property env
```
