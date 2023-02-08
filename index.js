const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

var employeesArray;
var managersArray;
var rolesArray;

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
    type: 'list',
    message: "What is the employee's role?",
    choices: rolesArray,
    name: 'newEmployeeRole',
    //using "when" keyword means this question will only be asked based on what we answered in the menu
    when: (answers) => answers.menu === "Add an employee",
},
{
    type: 'list',
    message: "Who is the employee's manager?",
    choices: managersArray,
    name: 'newEmployeeManager',
    //using "when" keyword means this question will only be asked based on what we answered in the menu
    when: (answers) => answers.menu === "Add an employee",
},
{
    //TODO: update the choices to include all existing employees
    type: 'list',
    message: "Please select which Employee you would like to update:",
    choices: employeesArray,
    name: 'selectEmployeeToUpdate',
    //using "when" keyword means this question will only be asked based on what we answered in the menu
    when: (answers) => answers.menu === "Update an employee role",
},
{
    //TODO: update the choices to include all existing role
    type: 'list',
    message: "What is this employee's new role?",
    choices: rolesArray,
    name: 'updateRole',
    //using "when" keyword means this question will only be asked based on what we answered in the menu
    when: (answers) => answers.menu === "Update an employee role",
},
];



function init() {
    //make this function recursive 
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
                    populateRolesArray();
                    break;
                case "Add an employee":
                    addEmployee(answers.newEmployeeFirstName, answers.newEmployeeLastName, answers.newEmployeeRole, answers.newEmployeeManager);
                    populateEmployeesAndManagersArrays();
                    break;
                case "Update an employee role":
                    break;
            }
        });
}
//function will show a table with all department names and ids
function viewDepartments() {

    db.query('SELECT id, d_name AS Department FROM department', (err, result) => {
        console.table(result);
    });
}
//job title, role id, the department, and the salary 

function viewRoles() {
    db.query('SELECT roles.title AS Job_Title, department.d_name AS Department, roles.salary AS Salary FROM roles JOIN department ON roles.department_id = department.id', (err, result) => {
        //destructuring with mapping
        //use for updates, and use the array for choices
        rolesArray = [];
        rolesArray = result.map((res)=> {
            return {role: res.Job_Title,
                department: res.Department,
                 salary : res.Salary
            }
            
        });
         console.table(result);
        // console.log(result);
        //console.log(rolesArray);
    });
}
//employee ids, first names, last names, job titles, departments, salaries, and managers
function viewEmployees() {
    db.query(`SELECT employee.id AS Employee_ID,
    employee.first_name AS First_Name,
    employee.last_name AS Last_Name,
    roles.title AS Job_Title,
    department.d_name AS Department,
    roles.salary AS Salary,
    manager.first_name AS Manager_first, 
    manager.last_name AS Manager_last
    FROM employee
    JOIN roles ON employee.role_id = roles.id
    JOIN department ON roles.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, (err, result) => {
        employeesArray = result.map((res)=> {
            return {
                id: res.Employee_ID,
                name: res.First_Name + " " + res.Last_Name,
                role: res.Job_Title,
                department: res.Department,
                salary: res.Salary,
                manager: res.Manager_first + " " + res.Manager_last,
               
            }
        });
        console.table(result);
        //console.log(employeesArray);
    });
}

function addDepartment(name) {
    db.query(`INSERT INTO department (d_name) VALUES ("${name}")`);
    console.log(`${name} department added.`);
}
function addRole(title, salary, department) {
    db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${title}", "${salary}", "${department}")`);
    console.log(`${title} role added.`);
}

function addEmployee(fName, lName, role, manager) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${fName}", "${lName}", "${role}", "${manager}")`);
}


function populateRolesArray(){
    db.query('SELECT roles.title AS Job_Title, department.d_name AS Department, roles.salary AS Salary FROM roles JOIN department ON roles.department_id = department.id', (err, result) => {
        //destructuring with mapping
        //use for updates, and use the array for choices
        rolesArray = [];
        //flatMap "flattens" the mapped array by 1 level, meaning in this case it will create 1 array with all of the roles 
        //within in, as opposed to creating a larger array with smaller arrays within which each contain a role
        rolesArray = result.flatMap((res)=> {
            return res.Job_Title;
        });
        // console.log(rolesArray);
     
});}


function populateEmployeesAndManagersArrays() {
    db.query(`SELECT employee.id AS Employee_ID,
    employee.first_name AS First_Name,
    employee.last_name AS Last_Name,
    roles.title AS Job_Title,
    department.d_name AS Department,
    roles.salary AS Salary,
    manager.first_name AS Manager_first, 
    manager.last_name AS Manager_last
    FROM employee
    JOIN roles ON employee.role_id = roles.id
    JOIN department ON roles.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, (err, result) => {
        // employeesArray = [];
        // managersArray = [];
        employeesArray = result.flatMap((res)=> {
            return res.First_Name + " " + res.Last_Name;
            
        });
        managersArray = result.flatMap((res)=> {
            //some of the items in the array will be "null null" because there was no manager first/last names
            //we are setting those items to be empty quotes, and setting all of the items that ARE NOT null
            //so that the first and last names are joined together in the array
            if(res.Manager_first || res.Manager_last !== null) {
            return res.Manager_first + " " + res.Manager_last;}
            else {return "";}
            
        
        });
        //here we are filtering out any places where manager was set to empty quotes/ was originally null
        managersArray = managersArray.filter(manager => manager !== "");
        // console.log(employeesArray);
//TODO:  figure out how to omit null/undefined managers from the array
        // console.log(managersArray);
    });
}


//TODO: add updateEmployeeRole function here!

populateRolesArray();
populateEmployeesAndManagersArrays();
init();



