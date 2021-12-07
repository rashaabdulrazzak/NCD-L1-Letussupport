#!/usr/bin/env bash
set -e

echo
echo 'About to call donateForPoject() on the contract todonate for a project'
echo
echo \$CONTRACT is $CONTRACT
echo
# To be able to call this function:
# first run the script 3.get-project-by-id with the id you want to donate for here : 4165907653
# from the result you need the address of the project and its id 
# you need to pass your account id to donate from it 
# near call $CONTRACT donateForPoject '{"accountId" : "greeting.rashaabdulrazzak.testnet", "id" : 4165907653 , "funds" : "1"}' --account-id rashaabdulrazzak.testnet --amount -1
near call $CONTRACT donateForPoject '{"accountId" : "greeting.rashaabdulrazzak.testnet", "id" : 4165907653 , "funds" : "1"}' --account-id rashaabdulrazzak.testnet --amount -1
