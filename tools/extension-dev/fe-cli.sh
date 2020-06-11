#!/bin/bash
docker run --rm -ti -v $PWD:/src flogo-enterprise-cli:latest $@
