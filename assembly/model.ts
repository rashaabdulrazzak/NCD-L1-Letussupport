

import { context, ContractPromiseBatch, logging, u128, PersistentMap, RNG, PersistentVector } from "near-sdk-as"

// Define the requird list 
export const projects = new PersistentMap<u32, Project>("p")
export const projectIdList = new PersistentVector<u32>("pl");
/**
 * Project class for projects need funds
 */
@nearBindgen
export class Project {
  id: u32;
  address: string;
  name: string;
  funds: u128;
  received: u128;
  residual: u128;
  description: string;

  constructor(name: string, address: string, funds: u128, description: string) {
    const rng = new RNG<u32>(1, u32.MAX_VALUE);
    const roll = rng.next();
    this.id = roll;
    this.address = address;
    this.name = name;
    this.funds = funds;
    this.received = u128.from(0);
    this.residual = this.funds;
    this.description = description
  }

  // Create a project and add it to project list and ids 
  // inputs : address: string, name: string, funds: string, description: string
  static createProject(address: string, name: string, funds: string, description: string): u32 {
    const funds_u128 = u128.from(funds);
    
    // length of address should be greater then 2 
    assert(address.length>2,"Address lenght should be greater than 2")

    // make sure funds is greater than zero
    assert(funds_u128 > u128.Zero, "The funds should be greater than Zero")

    const newProject = new Project(name, address, funds_u128, description);

    projects.set(newProject.id, newProject);

    logging.log("Project Id : " + (newProject.id).toString());

    projectIdList.push(newProject.id);
    return newProject.id;
  }

  // Get project by id 
  static getProjectById(projectId: u32): Project {
    return projects.getSome(projectId)
  }

  // Get list of ids of projects 
  static getAll(): Array<u32> {
    let listOfProject = new Array<u32>();
    let i: i32 = 0;

    while (i < projectIdList.length) {
      listOfProject.push(projectIdList[i])
      i++
    }
    return listOfProject;
  }

  // Get all the existing projects
  static getAllProjects(): Array<Project> {
    let projectResult = new Array<Project>();
    for (let i = 0; i < projectIdList.length; i++) {
      logging.log("Project Id : " + (projectIdList[i]).toString());

      projectResult.push(projects.getSome(projectIdList[i]))
    }
    return projectResult
  }

  // Update funds of a project 
  // We can extend this method to global update
  static updateFundOfProject(id: u32, funds: string): Project {

    // Convert the incoming fund to u128 type     
    const income = u128.fromString(funds, 10);

    // Get the project by its id 
    const project = projects.getSome(id);

    // the recievd fund is saved in received and the residual fund is calculated
    if (project.funds > income) {
      project.received = u128.add(project.received, income)
      project.residual = u128.sub(project.funds, project.received)
    }
    else {
      project.residual = u128.from(0);
      project.received = income
    }
    logging.log("Project Id : " + (project.residual).toString());

    // Update the existing project 
    projects.set(id, project);

    return project
  }

  // Transfer the money to the selected project 
  static sendDonation(accountId: string): string {
    let currentSender = context.sender;
    let amount = context.attachedDeposit;

    logging.log("Sender : " + currentSender);
    logging.log("Attached Amount : " + (amount).toString());

    // Transfer the attached money to the selectd project 
    const to_beneficiary = ContractPromiseBatch.create(accountId);
    const amount_to_receive = amount;

    to_beneficiary.transfer(amount_to_receive);

    return "Donation done successfully";
  }

  // Donate for project 
  // it require update the funds of the exsisting project 
  // also transfer the money from the sender to the account of project o testnet 
  static donateForProject(accountId: string, id: u32, funds: string): string {
    this.updateFundOfProject(id, funds);
    this.sendDonation(accountId);

    return "Donation done successfully";

  }

  // Delete project by id
  // This function will delete the project from the list of project
  // TODO Better way to delete the index from the id list know we check the index of it an call swap
  static deleteProject(projectId: u32): void {
    logging.log("Project Id : " + (projectId).toString());
    //projects.delete(projectId)
    projectIdList.pop()
    // swap_remove delete an item by its index in the list not the id 
    //projectIdList.swap_remove(i32(projectId))// take index not id 
  }

}