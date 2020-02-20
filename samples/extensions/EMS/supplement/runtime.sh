pushd supplement/EMS || exit $?
    mkdir ems
    unzip -q *.zip -d ems|| exit $?
popd
export EMS_HOME=`pwd`/supplement/EMS/ems
export LD_LIBRARY_PATH=$EMS_HOME/lib/64:$EMS_HOME/lib:$LD_LIBRARY_PATH