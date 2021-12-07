#!/usr/bin/env bash
set -e

echo
echo 'About to call listOfProjects() on the contract'
echo
echo \$CONTRACT is $CONTRACT
echo 'List of Projects'
echo

near view $CONTRACT listOfProjects 
