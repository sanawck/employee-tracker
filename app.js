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
function MainPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "what would you like to do?",
        choices: [
          {
            name: "View Roles",
            value: "view all roles?",
          },
          {
            name: "View Employees",
            value: "view all employees?",
          },
          {
            name: "View Departments",
            value: "view all departments?",
          },
          {
            name: "Add Department",
            value: "add department?",
          },
          {
            name: "Add Roles",
            value: "add roles?",
          },
          {
            name: "Add Employee",
            value: "add emloyee?",
          },
          {
            name: "Update Employee",
            value: "update emloyee?",
          },
          {
            name: "Update Role",
            value: "update role?",
          },
          {
            name: "Update Department",
            value: "update department?",
          },
          {
            name: "quit",
            value: "quit program?",
          },
        ],
      },
    ])
    .then((data) => {
      console.log(data);
      console.log(data.userChoice);
      switch (data.userChoice) {
        case "view all departments?":
          viewAllDepartments();
          break;
        case "view all employees?":
          viewAllEmployee();
          break;
        case "view all roles?":
          viewAllRoles();
          break;
        case "add department?":
          addDepartment();
          break;
        case "add employee?":
          addEmployee();
          break;
        case "add role?":
          addRole();
          break;
        case "quit":
        default:
          console.log("goodbye");
          process.exit(0);
      }
    });
}

//VIEWS for ALL ROLES
async function viewAllRoles() {
  console.log("in function view all roles");
  let query = "SELECT * from role";
  const roles = await db.query(query);
  console.table(roles);
  MainPrompt();
  //return roles;
}

//viewAllRoles();

//VIEW for all Departments
async function viewAllDepartments() {
  console.log("in function view all departments");
  let query = "SELECT * from department";
  const departments = await db.query(query);
  console.table(departments);
  MainPrompt();
  //return departments;
}
//viewAllDepartments();

//View for all employees
async function viewAllEmployee() {
  console.log("in function view all employee");
  let query = "SELECT * from employee";
  const employee = await db.query(query);
  console.table(employee);
  MainPrompt();
  //return employee;
}
//viewAllEmployee();

//ADD Department
async function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department name",
        message: "Which Department do you want to add?",
      },
    ])
    .then((dept) => {
      let query = "INSERT into department (name) VALUES (?)";
      let params = [dept];
      //const departments = db.query(query, params);
      console.log(`added department ${dept}`);
      //addDepartment("marketing");
      console.table(dept);
      MainPrompt();
    });
}

//ADD ROLE
function addRole() {
  inquirer.prompt([
    {
      name: "role name",
      message: "Which Role do you want to add?",
    },
  ]);
  connection.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              startPrompt();
            }
          );
        });
    }
  );
}
//ADD EMPLOYEE
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter their first name ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name ",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Whats their managers name?",
        choices: selectManager(),
      },
    ])
    .then(function (val) {
      let roleId = selectRole().indexOf(val.role) + 1;
      let managerId = selectManager().indexOf(val.choice) + 1;
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          startPrompt();
        }
      );
    });
}
MainPrompt();
