## Main Idea:  
Create a platform where people can donate to charity projects and ask for a donation to their projects.

##### Video Link: https://www.loom.com/share/65ca5aa2b7874670b2bc1057d3f374bf
##### Frontend Live Link: https://projects-web.herokuapp.com/ 

### How to use:
1. Clone the repository.
2. Run   `yarn install`. 
3. Run  `yarn dev`.
4. Start exploring the contract   

### Basic instructions: 
  1. Create project:  

  ```
  npx near call $(cat neardev/dev-account)  create '{"name" : "plant trees" ,"address" : "greeting.rashaabdulrazzak.testnet", "funds" : "500", "description" : "Let us make the environment cleaner"}' --account-id dev-1637159318973-57576165741839 
  ```
 *  If the upper code runs successfully, We get the id of the project and a link to check the resulted execution on testnet  
 
 ```
 264861165 which locates on [this link](https://explorer.testnet.near.org/transactions/CUryNguUtGDWfVLLi6SUHTcJiDyxm9YkjbvoQntmT3g1)
 ```


 2. Get a project by its id. We run 
 
 ```
  npx near call $(cat neardev/dev-account)  getProject '{ "projectId" : 1012091477 }'  --account-id dev-1637159318973-57576165741839

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
 3. List the existing projects 
 ``` 
 npx near call $(cat neardev/dev-account)  listOfProjects --account-id dev-1637159318973-57576165741839

 ``` 
 result: 

 ```
 Transaction Id 7nz4mQNMGWqQmxjQ5rfg6n8WSZUkrFNaJSA7rMzWsP1i
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
 4. List the id of the exsiting projects 
 
 ```
 npx near call $(cat neardev/dev-account)  getProject '{ "projectId" : 3669904913 }' --account-id dev-1637159318973-5757616574183

 ```
 result  

 ``` 
 Transaction Id GPtrZ2sDrZ2Ay8nGGGdxwt6xNT9vSrm3X7sZpuP2MU1U
 {
  id: 3669904913,
  address: 'buildhome.testnet',
  name: 'build home',
  funds: '800',
  received: '0',
  residual: '800',
  description: 'Let us help him feel safe'
}
 ```
 5. Delete a project by its id 
 we run : 

```
npx near call $(cat neardev/dev-account) deleteProjectById  '{"projectId" : 670204848}'  --account-id dev-1637159318973-5757616574183
``` 

6. Donate with `x` Near to a specific project and transfer the money to the related account: 

 ```
 npx near call $(cat neardev/dev-account) donateForPoject '{"accountId" : "greeting.rashaabdulrazzak.testnet", "id" : 1012091477 , "funds" : "1"}' --account-id rashaabdulrazzak.testnet --amount -1
 ```
7. Update funds to a project in the project information without transfering any money to the related account. 
``` 
 npx near call $(cat neardev/dev-account)  updateFund '{ "projectId" : 264861165 , "fund" : "500"}' --account-id dev-1637159318973-5757616574183
```

### Used Technology:
* Near sdk. 
* Near cli. 
* Near-api-js.
* Assemply script for writing the contract.
* React for the front end. 
