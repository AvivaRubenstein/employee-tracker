USE employee_tracker_db;

SELECT roles.title AS Job_Title, department.d_name AS Department, roles.salary AS Salary
FROM roles
JOIN department ON roles.department_id = department.id;

SELECT employee.id AS Employee_ID,
employee.first_name AS First_Name,
employee.last_name AS Last_Name,
roles.title AS Job_Title,
department.d_name AS Department,
roles.salary AS Salary,
FROM roles
JOIN department ON roles.department_id = department.id
JOIN employee ON employee.role_id = roles.id;


-- FROM employee
-- JOIN roles ON employee.role_id = roles.id,
-- JOIN department ON roles.department_id = department.id;