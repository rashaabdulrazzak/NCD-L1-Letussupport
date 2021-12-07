#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"

echo --------------------------------------------
echo
echo "cleaning up the /neardev folder"
echo
rm -rf ./neardev

# exit on first error after this point to avoid redeploying with successful build
set -e

echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"
echo
yarn build:release

echo --------------------------------------------
echo
echo "redeploying the contract"
echo
near dev-deploy ./build/release/newprojects.wasm 

echo --------------------------------------------
echo run the following commands
echo
echo 'export CONTRACT=<dev-123-456>'
echo
echo

exit 0