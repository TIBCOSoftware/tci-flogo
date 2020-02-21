This connector allows you to send or receive message from TIBCO Enterprise Messaging Service (EMS).

### Supported capabilities:
<li> Connection - Connection configuration</li>
<li> Trigger - Receive message(text/object) on topic/queue</li>
<li> Activity - Send message(text/object) on topic/queue</li>

### Limitations:
<li> No support for SSL</li>
<li> Support for only auto ack mode</li>

## Using connector in Flogo Enterprise
#### Prerequisite
<li> Flogo Enterprise 2.8.x and above must be installed and started</li>

#### Installation:
<li> Zip current EMS folder</li>
<li> Upload above zip from Extensions tab of Flogo Enterprise Web UI</li>

#### Limitation:
Since Golang wrapper needs platform specific native EMS libraries, neither flow tester nor any build options would work from Flogo Studio Web UI.
You must export the application and follow below steps to build application binary using CLI.

#### Building and Running Flogo application

##### On Mac:
<li> TIBCO EMS 8.4.x and above must be installed</li>
<li> Use below script to build application binary. Update <b>FLOGO_HOME</b> and <b>EMS_HOME</b> as per your installation</li>

```
export FLOGO_HOME=/Users/vnalawad/Installations/Flogo/flogo/2.8
export EMS_HOME=/Users/vnalawad/Installations/EMS/ems/8.4
export PATH=$FLOGO_HOME/bin:$PATH
ln -sf $EMS_HOME/lib/libtibems64.dylib /usr/local/lib/.
ln -sf $EMS_HOME/lib/64/libssl.1.0.0.dylib /usr/local/lib/.
ln -sf $EMS_HOME/lib/64/libcrypto.1.0.0.dylib /usr/local/lib/.

CPATH=${EMS_HOME}/include/tibems builder-darwin_amd64 build -f <exported_flogo_ems_app>
```
<li> Run application binary
 
##### On Linux:
<li> TIBCO EMS 8.4.x and above must be installed</li>
<li> Use below script to build application binary. Update <b>FLOGO_HOME</b> and <b>EMS_HOME</b> as per your installation</li>

```
export FLOGO_HOME=/Users/vnalawad/Installations/Flogo/flogo/2.8
export EMS_HOME=/Users/vnalawad/Installations/EMS/ems/8.4
export PATH=$FLOGO_HOME/bin:$PATH
export LD_LIBRARY_PATH=$EMS_HOME/lib/64:$EMS_HOME/lib:$LD_LIBRARY_PATH
export CGO_CFLAGS="-I$EMS_HOME/include/tibems"
export CGO_LDFLAGS="-L$EMS_HOME/lib -ltibems64"

builder-darwin_amd64 build -f <exported_flogo_ems_app>
```
<li> Before running binary, set <b>LD_LIBRARY_PATH=$EMS_HOME/lib/64:$EMS_HOME/lib:$LD_LIBRARY_PATH</b> 

## Using connector in TIBCO Cloud Integration(TCI)
#### Installation:
<li> Zip current EMS folder</li>
<li> Upload above zip from Extensions tab of TCI Flogo Web UI</li>

### EMS Supplement
For connector to work in TCI, Linux EMS native libraries must be uploaded. To upload required libraries, we will be using TCI supplement mechanism.

#### Build Supplement
<li> Install TIBCO EMS 8.4.x and above on <b>Linux</b> machine</li>
<li> Use below script to generate supplement. Update <b>EMS_HOME</b> as per your installation</li>

```
EMS_HOME=/Users/vnalawad/Installations/EMS/ems/8.4
cd $EMS_HOME
zip --symlinks -r ems.zip include/ lib/
```
#### Upload Supplement
> Only org admin can upload supplements. Contact your org admin in case your are not the admin.

<li> Download tibcli(https://integration.cloud.tibco.com/docs/getstarted/installation/download-tools.html) from your TCI account and add it to system PATH</li>
<li> Create temporary folder and copy supplement (ems.zip) into it </li>
<li> Change directory to above folder and run below command: </li>

```
tibcli flogoconnector supplement EMS
```
> Ensure that supplement is uploaded to correct org in case you are part of multi-org

### Build and Push application
<li> Use EMS activity/trigger in Flogo application. Make sure application is created in same org where supplement is uploaded</li>
<li> Use Push button to deploy application to TCI </li>
