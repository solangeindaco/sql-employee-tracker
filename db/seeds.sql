INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000, 1),
       ("Sales Lead", 75000, 2),
       ("Accountant", 65000, 3),
       ("Lawyer", 80000, 4),
       ("Salesperson", 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Mike", "Chan", 1, 1),
       ("Ashley", "Rodriguez", 2, NULL),
       ("Kevin", "Tupik", 3, 3),
       ("Malia", "Brown", 4, NULL),
       ("Sarah", "Lourd", 5, 3),
       ("Tom", "Allen", 5, 5),
       ("Samantha", "Jones", 5, 4);