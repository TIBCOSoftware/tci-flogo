pushd supplement/EMS || exit $?
    mkdir ems
    unzip -q *.zip -d ems|| exit $?
popd
export EMS_HOME=`pwd`/supplement/EMS/ems
export LD_LIBRARY_PATH=$EMS_HOME/lib/64:$EMS_HOME/lib:$LD_LIBRARY_PATH
export CGO_CFLAGS="-I$EMS_HOME/include/tibems"
export CGO_LDFLAGS="-L$EMS_HOME/lib -ltibems64"