#!/bin/bash
docker exec --rm -ti -v $PWD:/src wi-cli:latest $@
