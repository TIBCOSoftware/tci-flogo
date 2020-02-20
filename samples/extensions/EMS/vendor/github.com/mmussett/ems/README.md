TIBCO EMS Go client
===================

This repository contains the source code for the TIBCO EMS Go client library.


Installation and Build
----------------------

This client is designed to work with the EMS 8.4 client libraries as shipped with TIBCO EMS.

You will need to modify the cgo CFLAGS and LDFLAGS directives to the correct location of your local EMS Client Libaries

Symbolic links to the following dynamic libs are needed:

```
ln /opt/tibco/ems/ems841/ems/8.4/lib/libtibems64.dylib /usr/local/lib/.
ln /opt/tibco/ems/ems841/ems/8.4/lib/64/libssl.1.0.0.dylib /usr/local/lib/.
ln /opt/tibco/ems/ems841/ems/8.4/lib/64/libcrypto.1.0.0.dylib /usr/local/lib/.
```

Reporting bugs
--------------

Please report bugs by raising issues for this project in github https://github.com/mmussett/ems/issues



Update History
--------------


11-Nov-2019 - Breaking change to Send,SendReceive, and Receive functions

Changed Send, SendReceive, and Receive functions to include destinationType on signature.
destinationType can take 'queue' or 'topic' for the destination type now.
Tested Sending and Receiving message on both Queue and Topic types. 

