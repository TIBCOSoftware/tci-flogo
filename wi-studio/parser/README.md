# Web Integrator Mapper Expression Parser #

Steps:-

Import in package.json
```
yarn install wi-mapper-parser
```

Users should import @types/pegjs
```
import * as Parser from "@types/pegjs";
```
and setup the map: and package: in systemjs.config.js
```
map:{
    "wi-mapper-parser" : "npm:wi-mapper-parser"
}

packages : {
    "wi-mapper-parser" : { main: "map-grammar.umd.min.js", defaultExtension: "js" }
}
```
