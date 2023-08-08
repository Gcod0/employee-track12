CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (role)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
);

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000.00, 1),
    ('Salesperson', 80000.00, 1),
    ('Lead Engineer', 150000.00, 2),
    ('Software Engineer', 120000.00, 2),
    ('Accountant', 125000.00, 3),
    ('Legal Team Lead', 250000.00, 4),
    ('Lawyer', 190000.00, 4);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

CREATE TABLE managers (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id),
);
