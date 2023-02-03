
const inquirer = require('inquirer');

const questions = [{
    type: 'list',  //user selects an option from the list
    message: 'Please select one of the following options: ',
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role" ],
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

    // switch(answers.menu) {
    //     case "View all departments":
    
    //     case: "View all roles":
        
    //     case: "View all employees":

    //     case:  "Add a department":

    //     case: "Add a role":

    //     case: "Add an employee":

    //     case: "Update an employee role":
    // }
});
}
