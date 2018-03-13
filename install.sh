#!/bin/bash
gzcat $PWD/wi-cli.tar.gz | docker import - wi-cli:latest
