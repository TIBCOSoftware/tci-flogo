#!/bin/bash
set -x
if [ -f "$HOME/.wicli" ]; then
    source "$HOME/.wicli"
    mkdir -p wi-studio &&
    pushd wi-studio &&
    curl -sS $WI_STUDIO_URL | tar -xz &&
    popd
    mkdir -p wi-runtime &&
    pushd wi-runtime &&
    curl -sS $WI_RUNTIME_URL | tar -xz &&
    popd
else
    WI_STUDIO_URL=$( curl -s "https://api.github.com/repos/TIBCOSoftware/tci-webintegrator/releases/latest" \
    | jq -r '.assets[] | select(.name=="wi-studio.tar.gz") | .browser_download_url' )
    WI_RUNTIME_URL=$( curl -s "https://api.github.com/repos/TIBCOSoftware/tci-webintegrator/releases/latest" \
    | jq -r '.assets[] | select(.name=="wi-runtime.tar.gz") | .browser_download_url' )
    curl -LO "${WI_STUDIO_URL}" &&
    mkdir -p wi-studio &&
    pushd wi-studio &&
    tar -xvzf ../wi-studio.tar.gz && 
    popd
    curl -LO "${WI_RUNTIME_URL}" &&
    mkdir -p wi-runtime &&
    pushd wi-runtime &&
    tar -xvzf ../wi-runtime.tar.gz && 
    popd
fi
cp -r $PWD/wi-studio $PWD/node_modules
