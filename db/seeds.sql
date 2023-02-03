INSERT INTO department(d_name)
VALUES ("Engineering"),
("Finance"),
("Legal"),
("Sales");
 
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
("Salesperson", 80000, 4),
("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Account Manager", 160000, 2),
("Accountant", 125000, 2),
("Legal Team Lead", 250000, 3),
("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 8, 2),
("Janet", "Swanson", 2, 3 ),
("Sally", "Johnson", 4, 1),
("Jane", "Foster", 3, 1),
("Billy", "Piper", 1, NULL),
("Lucy", "Lovett", 5, 5),
("Nancy", "Wilson", 6, 1),
("Jason", "Simons", 7, 2);