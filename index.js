const inquirer = require('inquirer');
const mysql = require('mysq');
const consoleTable = require('console.table');

var managers = [];
var roles = [];
var employees = [];

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database:'employeeDB'
});

const getManager = () => {
    connection.query('SELECT * FROM employee WHERE manager_id IS NULL', (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++){
            const manager = res[i].manager;
            const managerId = res[i].manager_id;
            var newManager = {name: manager, value: managerId};
            managers.push(newManager);
        }
    })
    return managers;
}

const getRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        roles = [];
        for (let i = 0; i < res.length; i++){
            const id = res[i].id;
            const title = res[i].title;
            var newRole = {name: title, value: id};
            roles.push(newRole);
        }
    })
    return roles;
}

const getEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        employees = [];
        for (let i = 0; i < res.length; i++){
            const id = res[i].id;
            const first_name = res[i].first_name;
            const last_name = res[i].last_name;
            var newEmployee = {name: first_name + ' ' + last_name, value: id};
            employees.push(newEmployee);
        }
    })
    return employees;
}

const addDepartment = async () => {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ])
    connection.query('INSERT INTO department SET ?', department, (err, res) => {
        if (err) throw err;
        console.log('Department added!');
    })
}

const roleChoices = 'SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id';

const init = () => {
    getEmployees();
    getRoles();
    getManager();
}
inquirer.prompt([
    name: "init",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Role",
        "Exit"
    ]
]).then((answer) => {
    switch (answer.init) {
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "View Departments":
            viewDepartments();
            break;
        case "View Roles":
            viewRoles();
            break;
        case "View Employees":
            viewEmployees();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "Exit":
            connection.end();
            break;
    }
})

const allEmployeeManagers = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'manager',
            message: 'Choose the manager?',
            choices: managers
        }
    ]).then((answer) => {
        connection.query('SELECT * FROM employee WHERE manager_id = ?', answer.manager, (err, res) => {
            if (err) throw err;
            console.table(res);
            init();
        })
    })
}

const updateManager = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Choose the employee?',
            choices: employees
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Choose the manager?',
            choices: managers
        }
    ]).then((answer) => {
        connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', [answer.manager, answer.employee], (err, res) => {
            if (err) throw err;
            console.log('Manager updated!');
            init();
        })
    })
}

const updateRole = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Choose the employee?',
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'Choose the role?',
            choices: roles
        }
    ]).then((answer) => {
        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role, answer.employee], (err, res) => {
            if (err) throw err;
            console.log('Role updated!');
            init();
        })
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of the employee?',
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the manager of the employee?',
            choices: managers
        }
    ]).then((answer) => {
        connection.query('INSERT INTO employee SET ?', answer, (err, res) => {
            if (err) throw err;
            console.log('Employee added!');
            init();
        })
    })
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What is the department of the role?',
            choices: departments
        }
    ]).then((answer) => {
        connection.query('INSERT INTO role SET ?', answer, (err, res) => {
            if (err) throw err;
            console.log('Role added!');
            init();
        })
    })
}

const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const allManagers = () => {
    connection.query('SELECT * FROM employee WHERE manager_id IS NULL', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const allEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const allRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const allDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const removeEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Choose the employee?',
            choices: employees
        }
    ]).then((answer) => {
        connection.query('DELETE FROM employee WHERE id = ?', answer.employee, (err, res) => {
            if (err) throw err;
            console.log('Employee removed!');
            init();
        })
    })
}








// // add department
// const addDepartment = async () => {

// }

// // add role
// const addRole = async () => {
    
//     }

// // add employee
// const addEmployee = async () => {
    
//     }

// // view departments
// const viewDepartments = async () => {
        
//         }

// // update employee role
// const updateEmployeeRole = async () => {
        
//         }


//         const request = () => {
//             inquirer.prompt([
//                 {
//                     type: 'list',
//                     name: 'request',
//                     message: 'What would you like to do?',
//                     choices: [
//                         'Add Department',
//                         'Add Role',
//                         'Add Employee',
//                         'View Departments',
//                         'Update Employee Role',
//                         'Exit'
//                     ]
//                 }
//             ]).then((answer) => {
//                 switch (answer.request) {
//                     case 'Add Department':
//                         addDepartment();
//                         break;
//                     case 'Add Role':
//                         addRole();
//                         break;
//                     case 'Add Employee':
//                         addEmployee();
//                         break;
//                     case 'View Departments':
//                         viewDepartments();
//                         break;
//                     case 'Update Employee Role':
//                         updateEmployeeRole();
//                         break;
//                     case 'Exit':
//                         connection.end();
//                         break;
//                 }
//             })
//         }

//         request();

//         module.exports = request;

