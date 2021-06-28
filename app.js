const inquirer = require("inquirer");
let TableAccess = require("./TableAccess.js");
let consoleTable = require("console.table");
const db = new TableAccess({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Niyyahis2",
  database: "employeeTracker_db",
});

//VIEWS for ALL ROLES
async function viewAllRoles() {
  console.log("in function view all roles");
  let query = "SELECT * from role";
  const roles = await db.query(query);
  console.table(roles);
  return roles;
}

viewAllRoles();

//VIEW for all Departments
async function viewAllDepartments() {
  console.log("in function view all departments");
  let query = "SELECT * from department";
  const departments = await db.query(query);
  console.table(departments);
  return departments;
}
viewAllDepartments();

//View for all employees
async function viewAllEmployee() {
  console.log("in function view all employee");
  let query = "SELECT * from employee";
  const employee = await db.query(query);
  console.table(employee);
  return employee;
}
viewAllEmployee();

//ADD Department
async function addDepartment(dept) {
  let query = "INSERT into department (name) VALUES (?)";
  let params = [dept];
  const departments = await db.query(query, params);
  console.log(`added department ${dept}`);
}
addDepartment("marketing");
console.table(dept);
//ADD ROLE
//ADD EMPLOYEE
