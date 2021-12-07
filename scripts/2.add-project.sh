#!/usr/bin/env bash
set -e

echo
echo 'About to call create() on the contract to create a project'
echo
echo \$CONTRACT is $CONTRACT
echo
# near call $CONTRACT  create '{"name" : "plant trees" ,"address" : "greeting.rashaabdulrazzak.testnet", "funds" : "500", "description" : "Let us make the environment cleaner"}' --account_id $CONTRACT
near call $CONTRACT  create '{"name" : "plant trees" ,"address" : "greeting.rashaabdulrazzak.testnet", "funds" : "500", "description" : "Let us make the environment cleaner"}' --account_id $CONTRACT 
# save the id of the created project 
echo 'Save the id of the created project so you can call it later'