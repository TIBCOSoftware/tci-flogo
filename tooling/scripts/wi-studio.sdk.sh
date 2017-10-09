#!/bin/bash
echo "################ Downloading wi-studio SDK (${BRANCH_NAME:-master}) #############"
[ -d wi-studio ] && rm -rf wi-studio 
mkdir -pv wi-studio \
&& pushd wi-studio \
&& { \
     curl -sS "http://llbuild2.na.tibco.com:8080/guestAuth/repository/download/Atmosphere_Tci_Wi_WiStudioApi/.lastSuccessful/wi-studio.tar.gz?branch=${BRANCH_NAME:-master}" | tar -xz  || \
     { \
        echo "Branch: ${BRANCH_NAME} not found for wi-studio-API using master";
        curl -sS "http://llbuild2.na.tibco.com:8080/guestAuth/repository/download/Atmosphere_Tci_Wi_WiStudioApi/.lastSuccessful/wi-studio.tar.gz?branch=master" | tar -xz ; \
     } \
 } \
&& popd \
&& [ -d wi-studio ] && ls -al wi-studio \
[ -d wi-runtime ] && rm -rf wi-runtime 
mkdir -pv wi-runtime \
&& pushd wi-runtime \
&& { \
     curl -sS "http://llbuild2.na.tibco.com:8080/guestAuth/repository/download/Atmosphere_Tci_Wi_WiRuntime/.lastSuccessful/wi-runtime.tar.gz?branch=${BRANCH_NAME:-master}" | tar -xz  || \
     { \
        echo "Branch: ${BRANCH_NAME} not found for wi-studio-API using master";
        curl -sS "http://llbuild2.na.tibco.com:8080/guestAuth/repository/download/Atmosphere_Tci_Wi_WiRuntime/.lastSuccessful/wi-runtime.tar.gz?branch=master" | tar -xz ; \
     } \
 } \
&& popd \
&& [ -d wi-runtime ] && ls -al wi-runtime \
&& echo "#################################################################################"
