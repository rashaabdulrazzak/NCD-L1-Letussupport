## Main Idea:

Create a platform where people can donate to charity projects and ask for a donation to their projects.

##### Video Link: https://www.loom.com/share/65ca5aa2b7874670b2bc1057d3f374bf

##### Frontend Live Link: https://projects-web.herokuapp.com/

### How to use:

1. Clone the repository.
2. Run `yarn install`.
3. Run `yarn dev`.
4. Export the contract using `export CONTRACT=dev-1637159318973-57576165741839`
5. Start exploring the contract

### Basic instructions:

1. Create project:

```
 near call $CONTRACT  create '{"name" : "plant trees" ,"address" : "greeting.rashaabdulrazzak.testnet", "funds" : "500", "description" : "Let us make the environment cleaner"}' --account-id dev-1637159318973-57576165741839
```

- If the upper code runs successfully, We get the id of the project and a link to check the resulted execution on testnet

```
264861165 which locates on [this link](https://explorer.testnet.near.org/transactions/CUryNguUtGDWfVLLi6SUHTcJiDyxm9YkjbvoQntmT3g1)
```

2.  Get a project by its id. We run

```
near view $CONTRACT  getProject '{ "projectId" : 1012091477 }'

```

and the result will be like:

```
Transaction Id Abd22fu7xnjrS4BSfHxWBDbQU2gnxjjgrD4GkYQwyqmz
{
 id: 264861165,
 address: 'greeting.rashaabdulrazzak.testnet',
 name: 'build school',
 funds: '500',
 received: '0',
 residual: '500',
 description: 'Let us help them get knowledge'
}
```

3.  List the existing projects

```
near view $CONTRACT  listOfProjects

```

result:

```
[
 {
   id: 1753503761,
   address: 'greeting.rashaabdulrazzak.testnet',
   name: 'build school',
   funds: '500',
   received: '23',
   residual: '477',
   description: 'Let us help them get knowledge'
 },
 {
   id: 4215344824,
   address: 'rashaabdulrazzak.testnet',
   name: 'build home',
   funds: '1000',
   received: '0',
   residual: '1000',
   description: 'Let us help them feel safe'
 }
]
```

4.  List the id of the exsiting projects

```
near view $CONTRACT  listOfIdProject

```

result

```
[
  1753503761,
  4215344824,
  1012091477,
  2766981404,
  4222731976,
  1141998315
]
```

5.  Delete a project by its id
    we run :

```
near call $CONTRACT deleteProjectById  '{"projectId" : 670204848}'  --account-id dev-1637159318973-5757616574183
```

6. Donate with `x` Near to a specific project and transfer the money to the related account:

```
near call $CONTRACT donateForPoject '{"accountId" : "greeting.rashaabdulrazzak.testnet", "id" : 1012091477 , "funds" : "1"}' --account-id rashaabdulrazzak.testnet --amount -1
```

7. Update funds to a project in the project information without transfering any money to the related account.

```
 near call $CONTRACT  updateFund '{ "projectId" : 264861165 , "fund" : "500"}' --account-id dev-1637159318973-5757616574183
```

8. Get the total number of added projects:

```
near call $CONTRACT getNumberOfProjects --account-id $CONTRACT

```

### Used Technology:

- Near sdk.
- Near cli.
- Near-api-js.
- Assemply script for writing the contract.
- React for the front end.

```

```
