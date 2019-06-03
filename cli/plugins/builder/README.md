[Flogo CLI](https://github.com/project-flogo/cli) Plugin for Flogo Enterprise Builder


Preparation:

     1. Install Flogo CLI first, please following CLI guideline
     2. Set FLOGO_HOME Env Variable, such as: 
        export FLOGO_HOME=/opt/tibco/flogo/2.6

Installation
    
      1. Install plugin: flogo plugin install github.com/TIBCOSoftware/tci-flogo/cli/plugins/builder
      2. Just update plugin if you want to update flogo plugin update github.com/TIBCOSoftware/tci-flogo/cli/plugins/builder
      
Usage:
    
    The plugin wrapper Flogo Enterprise builder, so all build options will available at this command as well.
   
     Example:
     flogo febuilder build --f ~/Downloads/log.json