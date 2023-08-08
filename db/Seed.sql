INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Malia', 'Brown', 5, NULL),
    ('Sarah', 'Lourd', 6, 5),
    ('Tom', 'Allen', 7, NULL),
    ('Ben', 'Finkel', 8, 7);

INSERT INTO managers (manager)
VALUES
    ('John Doe'),
    ('Ashley Rodriguez'),
    ('Malia Brown'),
    ('Tom Allen');

    SELECT * FROM employee;
    SELECT * FROM manager;