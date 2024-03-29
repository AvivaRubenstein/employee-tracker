const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

var employeesArray;
var managersArray;
var rolesArray;
var departmentsArray;
var newRoleId;
var managerForNew;
var updateManager;
var deptId;
var updateEmplName;
var newRoleId;



const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_tracker_db'

    }, console.log('Connected to employee tracker database!')
);

const menuQ = [{
    type: 'list',  //user selects an option from the list
    message: 'Please select one of the following options: ',
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "View employees by managers", "Exit"],
    name: 'menu',
}];
var addDeptQ = [
    {
        type: 'input',
        message: "Department name: ",
        name: 'newDeptName',
    }];
var addRoleQs = [
    {
        type: 'input',
        message: "What is the name of the new role?",
        name: 'newRoleName',
    },
    {
        type: 'input',
        message: "What is the salary for the new role?",
        name: 'newRoleSalary',
    },
    {
        type: 'list',
        message: "What department is the new role under?",
        choices: departmentsArray,
        name: 'newRoleDept',
    }];
var addEmployeeQs = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'newEmployeeFirstName',

    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'newEmployeeLastName',
    },
    {
        type: 'list',
        message: "What is the employee's role?",
        choices: rolesArray,
        name: 'newEmployeeRole',

    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        choices: managersArray,
        name: 'newEmployeeManager',

    }];
var updateEmployeeQs = [
    {
        //TODO: update the choices to include all existing employees
        type: 'list',
        message: "Please select which Employee you would like to update:",
        choices: employeesArray,
        name: 'selectEmployeeToUpdate',

    },
    {
        //TODO: update the choices to include all existing role
        type: 'list',
        message: "What is this employee's new role?",
        choices: rolesArray,
        name: 'updateRole',

    },
];



function init() {
    //this function will prompt the user with the menu question, and then run more functions based on the selection
    inquirer.prompt(menuQ)
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
                case "View employees by managers":
                    viewEmployeesByManagers();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    //to close the application
                    process.exit();
                    break;

            }
        });
}
//function will show a table with all department names and ids
function viewDepartments() {

    db.query('SELECT id, d_name AS Department FROM department', (err, result) => {
        console.table(result);
        init();
    });
}
//job title, role id, the department, and the salary 

function viewRoles() {
    db.query('SELECT roles.title AS Job_Title, department.d_name AS Department, roles.salary AS Salary FROM roles JOIN department ON roles.department_id = department.id', (err, result) => {
        //destructuring with mapping
        //we need an array of roles to be the choices in the prompt questions
        rolesArray = [];
        rolesArray = result.map((res) => {
            return {
                role: res.Job_Title,
                department: res.Department,
                salary: res.Salary
            }

        });
        console.table(result);
        init();
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
        employeesArray = result.map((res) => {
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
        init();
        //console.log(employeesArray);
    });
}
function viewEmployeesByManagers() {
    db.query(`SELECT employee.first_name AS First_Name, 
    employee.last_name AS Last_Name,
    manager.first_name AS Manager_First,
    manager.last_name AS Manager_last
    FROM employee
    JOIN employee AS manager ON employee.manager_id = manager.id
    ORDER BY employee.manager_id;`, (err, result) => {
        console.table(result);
        init();
    }
    );

}

function addDepartment() {
    inquirer.prompt(addDeptQ)
        .then((answers) => {
            db.query(`INSERT INTO department (d_name) VALUES ("${answers.newDeptName}")`);
            console.log(`${answers.newDeptName} department added.`);
            init();
        });

}
function addRole() {
    //we are querying for the department name and id, and then pushing those results into an array
    db.query('SELECT id, d_name AS Department FROM department', (err, result) => {
        departmentsArray = result.flatMap((res) => {
            return {
                id: res.id,
                name: res.Department
            };
        });
        //console.log(departmentsArray);
        //we are taking the array of departments created from the query above, and setting the choices of the relevant question
        //to be the contents of that array
        addRoleQs[2].choices = departmentsArray;
        //then we actually prompt the user with the questions about adding a role (with the choices prepopulated from the array above)
        inquirer.prompt(addRoleQs)
            //and then we can do a query to insert the new role into the roles table, with all of the associated information
            .then((answers) => {
                db.query(`SELECT id from department WHERE d_name = "${answers.newRoleDept}"`, (err, res) => {
                    deptId = res[0].id;
                    // console.log(res[0].id);

                    db.query(`INSERT INTO roles(title, salary, department_id) VALUES ("${answers.newRoleName}", "${answers.newRoleSalary}", ${deptId})`, (err, res) => {
                        console.log(`${answers.newRoleName} role added.`);
                        init();
                    });

                });
            
            });
    });
}

function addEmployee() {
    //need to ask about the role and the manager!
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
        employeesArray = result.flatMap((res) => {
            return {
                id: res.Employee_ID,
                name: res.First_Name + " " + res.Last_Name
            };

        });
        managersArray = result.flatMap((res) => {
            //some of the items in the array will be "null null" because there was no manager first/last names
            //we are setting those items to be empty quotes, and setting all of the items that ARE NOT null
            //so that the first and last names are joined together in the array
            if (res.Manager_first || res.Manager_last !== null) {
                return { name: res.Manager_first + " " + res.Manager_last };
            }
            else { return ""; }


        });
        //here we are filtering out any places where manager was set to empty quotes/ was originally null
        managersArray = managersArray.filter(manager => manager !== "");
        // console.log(employeesArray);
        // console.log(managersArray);

        // db.query(`SELECT roles.title AS Job_Title FROM roles;`, (err, result) => {
        rolesArray = result.flatMap((res) => {
            return res.Job_Title;
            // });
        });
        addEmployeeQs[2].choices = rolesArray;
        addEmployeeQs[3].choices = managersArray;

        inquirer.prompt(addEmployeeQs)
            .then((answers) => {
                managerForNew = answers.newEmployeeManager.split(" ");
                db.query(`SELECT roles.id FROM roles WHERE roles.title = "${answers.newEmployeeRole}"`, (err, result) => {
                    newRoleId = result[0].id;
                    // console.log(result[0].id);

                    db.query(`SELECT employee.id FROM employee WHERE employee.first_name = "${managerForNew[0]}" AND employee.last_name = "${managerForNew[1]}"`, (err, res) => {
                        updateManager = res[0].id;
                        // console.log(res[0].id);

                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.newEmployeeFirstName}", "${answers.newEmployeeLastName}" ,${newRoleId}, ${updateManager})`, (req, response) => {
                            console.log("Employee added");
                        });
                        init();
                    });


                }
                );
            });



    });

}


//TODO: add updateEmployeeRole function here!
function updateEmployeeRole(employee, newRole) {
    db.query(`SELECT employee.first_name AS First_Name, employee.last_name AS Last_Name, employee.id AS Employee_ID FROM employee`, (err, result) => {
        employeesArray = result.map((res) => {
            return {
                id: res.Employee_ID,
                name: res.First_Name + " " + res.Last_Name,
            }
        });
        db.query(`SELECT roles.id, roles.title AS Title FROM roles`, (err, result) => {
            rolesArray = result.map((response) => {
                return {
                    name: response.Title,
                    id: response.id
                }
            });
            updateEmployeeQs[0].choices = employeesArray;
            updateEmployeeQs[1].choices = rolesArray;
            inquirer.prompt(updateEmployeeQs)
                .then((answers) => {
                    updateEmplName = answers.selectEmployeeToUpdate.split(" ");
                    db.query(`SELECT id FROM roles WHERE roles.title = "${answers.updateRole}"`, (err, response) => {
                        newRoleId = response[0].id;

                        db.query(`UPDATE employee SET role_id = ${newRoleId} WHERE first_name = "${updateEmplName[0]}" AND last_name = "${updateEmplName[1]}"`, (err, result) => {
                            console.log("Update complete!");
                            init();
                        }
                        );
                    });

                }
                );
        }
        );
    });
}




init();



