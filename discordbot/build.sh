#!/bin/bash

BUILD_DIR=build

# Ensure TypeScript compiler is available
command -v tsc 2>&1 > /dev/null || { echo "Error: TypeScript compiler not installed" >&2; exit 1; }

tsc --alwaysStrict --outDir ${BUILD_DIR} src/*.ts

