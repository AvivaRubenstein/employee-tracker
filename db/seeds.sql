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
VALUES 
("Jane", "Foster", 3, NULL),  
("Billy", "Piper", 1, NULL),   
("Lucy", "Lovett", 5, NULL),   
("Jason", "Simons", 7, NULL),   
("John", "Doe", 8, 4),
("Janet", "Swanson", 2, 2),
("Sally", "Johnson", 4, 1),
("Nancy", "Wilson", 6, 3),
("Kara", "Levits", 6, 3),
("Hugh", "Mann", 8, 4),
("Beatrice", "Rogers", 4, 1),
("Lee", "Potts", 2, 2);
