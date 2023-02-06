const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//TODO: make options for choosing a dept, or a manager, or role etc be added as choices


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_tracker_db'

    }, console.log('Connected to employee tracker database!')
);

const questions = [{
    type: 'list',  //user selects an option from the list
    message: 'Please select one of the following options: ',
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
    name: 'menu',
},
{
    type: 'input',
    message: "Department name: ",
    name: 'newDeptName',
    //using "when" keyword means this question will only be asked if the answer to the menu question was that we wanted to add a department
    when: (answers) => answers.menu === "Add a department",
},
{
    type: 'input',
    message: "What is the name of the new role?",
    name: 'newRoleName',
    when: (answers) => answers.menu === "Add a role",
},
{
    type: 'input',
    message: "What is the salary for the new role?",
    name: 'newRoleSalary',
    when: (answers) => answers.menu === "Add a role",
},
{
    type: 'input',
    message: "What department is the new role under?",
    name: 'newRoleDept',
    when: (answers) => answers.menu === "Add a role",
},
{
    type: 'input',
    message: "What is the employee's first name?",
    name: 'newEmployeeFirstName',
    //using "when" keyword means this question will only be asked based on what we answered in the menu
    when: (answers) => answers.menu === "Add an employee",
},
{
    type: 'input',
    message: "What is the employee's last name?",
    name: 'newEmployeeLastName',
    //using "when" keyword means this question will only be asked based on what we answered in the menu
    when: (answers) => answers.menu === "Add an employee",
},
{
    type: 'input',
    message: "What is the employee's role?",
    name: 'newEmployeeRole',
    //using "when" keyword means this question will only be asked based on what we answered in the menu
    when: (answers) => answers.menu === "Add an employee",
},
{
    type: 'input',
    message: "Who is the employee's manager?",
    name: 'newEmployeeManager',
    //using "when" keyword means this question will only be asked based on what we answered in the menu
    when: (answers) => answers.menu === "Add an employee",
},
{
    //TODO: update the choices to include all existing employees
    type: 'list',
    message: "Please select which Employee you would like to update:",
    choices: ["PLACEHOLDER"],
    name: 'selectEmployeeToUpdate',
    //using "when" keyword means this question will only be asked based on what we answered in the menu
    when: (answers) => answers.menu === "Update an employee role",
},
{
    //TODO: update the choices to include all existing role
    type: 'list',
    message: "What is this employee's new role?",
    choices: ["PLACEHOLDER"],
    name: 'updateRole',
    //using "when" keyword means this question will only be asked based on what we answered in the menu
    when: (answers) => answers.menu === "Update an employee role",
},
];



function init() {
    inquirer.prompt(questions)
        .then((answers) => {

            switch (answers.menu) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    addDepartment(answers.newDeptName);
                    break;
                case "Add a role":
                    addRole(answers.newRoleName, answers.newRoleSalary, answers.newRoleDept);
                    break;
                case "Add an employee":
                    addEmployee(answers.newEmployeeFirstName, answers.newEmployeeLastName, answers.newEmployeeRole, answers.newEmployeeManager);
                    break;
                case "Update an employee role":
                    break;
            }
        });
}
//function will show a table with all department names and ids
function viewDepartments() {

    db.query('SELECT * FROM department', (err, result) => {
        console.table(result);
    });
}
//job title, role id, the department, and the salary 
function viewRoles() {
    db.query('SELECT * FROM roles JOIN department ON roles.department_id = department.id', (err, result) => {
        console.table(result);
    });
}
//employee ids, first names, last names, job titles, departments, salaries, and managers
function viewEmployees() {
    db.query('SELECT * FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id', (err, result) => {
        console.table(result);
    });
}

function addDepartment(name) {
    db.query(`INSERT INTO department (d_name) VALUES ("${name}")`);
    console.log(`${name} department added.`)
}
function addRole(title, salary, department) {
    db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${title}", "${salary}", "${department}")`);
    console.log(`${title} role added.`)
}

function addEmployee(fName, lName, role, manager) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${fName}", "${lName}", "${role}", "${manager}")`);
}

//TODO: add updateEmployeeRole function here!


init();