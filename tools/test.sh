#!/bin/bash
docker run --rm -ti -v $PWD:/src --entrypoint bash flogo-enterprise-cli:latest
