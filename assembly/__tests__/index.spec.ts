// contract/assembly/__tests__/index.spec.ts

import { u128 } from "near-sdk-as";
import { projects, projectIdList } from "../model";
import { create, getProject, listOfProjects, listOfIdProject, updateFund, donateForPoject,getNumberOfProjects } from "../index";

describe("contract methods", () => {
  // Creat a project
  it("creates a project", () => {
    // call the create method
    let name = 'Build School';
    let address = "voying.testnet";
    let funds = '200';
    let description = "let's build schools";
    let category = 'uncategorized'

    // it will create a project and return its id as a result
    let project = create(address, name, funds, description,category);

    // expect the projectIdList length to increased by 1 
    //expect the projects presistent map to cantain project whos id the resulted id 
    // and its content is the provided name, address, funds and description

    expect(projectIdList.length).toBe(1);
    expect(projects.getSome(project).name).toStrictEqual(name)
    expect(projects.getSome(project).address).toStrictEqual(address)
    expect(projects.getSome(project).funds).toStrictEqual(u128.from(funds))
    expect(projects.getSome(project).description).toStrictEqual(description)
    expect(projects.getSome(project).category).toStrictEqual(category)
  });

  // Get project by its id 
  it("gets a project by its id", () => {
    // create two projects 
    let projectOneId = create("projectOne.testnet", "projectOne", "12", "project One description","Personal");
    let projectTwoId = create("projectTwo.testnet", "projectTwo", "12", "project Two description","Charity");

    // get each project by its id
    // info for project one
    expect(getProject(projectOneId)).toBeTruthy()
    expect(getProject(projectOneId).name).toStrictEqual("projectOne")
    expect(getProject(projectOneId).address).toStrictEqual("projectOne.testnet")
    expect(getProject(projectOneId).funds).toStrictEqual(u128.from("12"))
    expect(getProject(projectOneId).description).toStrictEqual("project One description")
    expect(getProject(projectOneId).category).toStrictEqual("Personal")
    // info for project two
    expect(getProject(projectTwoId)).toBeTruthy()
    expect(getProject(projectTwoId).name).toStrictEqual("projectTwo")
    expect(getProject(projectTwoId).address).toStrictEqual("projectTwo.testnet")
    expect(getProject(projectTwoId).funds).toStrictEqual(u128.from("12"))
    expect(getProject(projectTwoId).description).toStrictEqual("project Two description")
    expect(getProject(projectTwoId).category).toStrictEqual("Charity")

  });

  // List the existing projects
  it("displays all existing projects", () => {
    // create two projects 
    let projectOneId = create("projectOne.testnet", "projectOne", "12", "project One description","Charity");
    let projectTwoId = create("projectTwo.testnet", "projectTwo", "12", "project Two description","Charity");
    // call listOfProjects
    let resultProjects = listOfProjects();

    // the resulted array should contain 2 elements    
    expect(resultProjects.length).toBe(2)

    // the first element should be project One
    expect(resultProjects[0].name).toStrictEqual("projectOne")

    // the second element should be project Two
    expect(resultProjects[1].name).toStrictEqual("projectTwo")
  });

  // List the ids of the existing projects
  it("displays all existing projects", () => {
    // create two projects 
    let projectOneId = create("projectOne.testnet", "projectOne", "12", "project One description","Charity");
    let projectTwoId = create("projectTwo.testnet", "projectTwo", "12", "project Two description","Charity");

    // call listOfIdProject
    let resultProjects = listOfIdProject();

    // the resulted array should contain 2 elements    
    expect(resultProjects.length).toBe(2)

    // the first element should be project One id
    expect(resultProjects[0]).toStrictEqual(projectOneId)

    // the second element should be project Two id 
    expect(resultProjects[1]).toStrictEqual(projectTwoId)
  });

  // Update the fund of an existing project
  // it will check the incoming fund 
  // if its greater than the existed fund it will make the needed ammount to zero
  // and it will assign the incoming fund to the received value
  // if the incoming fund is less than the existing fund 
  // it means the project still need funds

  it("update the fund of an existing project by its id", () => {
    // create a project 
    let projectOneId = create("projectOne.testnet", "projectOne", "12", "project One description","Charity");

    // call update fund
    let updatedProject = updateFund(projectOneId, "25");

    //check the values of updated project  
    expect(updatedProject.name).toStrictEqual("projectOne")
    expect(updatedProject.address).toStrictEqual("projectOne.testnet")
    expect(updatedProject.funds).toStrictEqual(u128.from("12"))
    expect(updatedProject.residual).toStrictEqual(u128.from("0"))
    expect(updatedProject.received).toStrictEqual(u128.from("25"))
    expect(updatedProject.description).toStrictEqual("project One description")
  });

  // donate for project 
  it("donate for an existing project by its id", () => {
    // create a project 
    let projectOneId = create("projectOne.testnet", "projectOne", "12", "project One description","Charity");

    // get the address of the project to donate to 
    let projectInfo = getProject(projectOneId)
    let addressInfo = projectInfo.address
    let residual = projectInfo.residual
    let received = projectInfo.received

    // call donate function
    let donationResult = donateForPoject(addressInfo, projectOneId, "1");
    expect(donationResult).toStrictEqual("Donation done successfully")

    // check if the value has updated with the incoming donation
    let projectAfterDonation = getProject(projectOneId)
    expect(projectAfterDonation.residual).toStrictEqual(u128.sub(residual, u128.from("1")))
    expect(projectAfterDonation.received).toStrictEqual(u128.add(received, u128.from("1")))
  });

  // get the total number of added projects
  it("it gives the number of all existing projects", () => {
    // create one project
    let projectOneId = create("projectOne.testnet", "projectOne", "12", "project One description","Charity");
    
    // call getNumberOfProjects
    let resultProjects = getNumberOfProjects();

    // the result should be 1 
    expect(resultProjects).toBe(1)    
  });


});