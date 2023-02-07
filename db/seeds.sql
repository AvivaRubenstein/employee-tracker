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
VALUES ("John", "Doe", 8, 8),
("Janet", "Swanson", 2, 5 ),
("Sally", "Johnson", 4, 4),
("Jane", "Foster", 3, NULL),
("Billy", "Piper", 1, NULL),
("Lucy", "Lovett", 5, NULL),
("Nancy", "Wilson", 6, 6),
("Jason", "Simons", 7, NULL);