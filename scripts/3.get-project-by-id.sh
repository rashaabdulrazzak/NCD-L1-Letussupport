#!/usr/bin/env bash
set -e

echo
echo 'About to call getProject() on the contract to get the project by its id'
echo
echo \$CONTRACT is $CONTRACT
echo
# the id of the project we get it after run add-project.sh script and save the resulted id
# near view $CONTRACT  getProject '{ "projectId" : 4165907653 }'
near view $CONTRACT  getProject '{ "projectId" : 4165907653 }'
