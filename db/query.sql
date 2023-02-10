USE employee_tracker_db;
-- viewRoles()
SELECT roles.title AS Job_Title, department.d_name AS Department, roles.salary AS Salary
FROM roles
JOIN department ON roles.department_id = department.id;

-- viewEmployees()
SELECT employee.id AS Employee_ID,
employee.first_name AS First_Name,
employee.last_name AS Last_Name,
roles.title AS Job_Title,
department.d_name AS Department,
roles.salary AS Salary,
-- we make an alias for our managers from the employee table, so here we can retrieve the first and last names of managers
manager.first_name AS Manager_first, 
manager.last_name AS Manager_last
FROM employee
JOIN roles ON employee.role_id = roles.id
JOIN department ON roles.department_id = department.id
-- we are making manager an alias for the employee table where the employee's manager id matches an existing manager/employee
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

-- view employees by manager
SELECT employee.first_name AS First_Name, 
employee.last_name AS Last_Name,
manager.first_name AS Manager_First,
manager.last_name AS Manager_last
FROM employee
JOIN employee AS manager ON employee.manager_id = manager.id
ORDER BY employee.manager_id;

SELECT roles.title FROM roles;



INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Anita", "Darren", 1, 3);
