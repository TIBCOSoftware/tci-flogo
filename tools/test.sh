#!/bin/bash
docker run --rm -ti -v $PWD:/src --entrypoint bash wi-cli:latest
