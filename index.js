const inquirer = require('inquirer');
const consoleTable = require('console.table');


// add department
const addDepartment = async () => {

}

// add role
const addRole = async () => {
    
    }

// add employee
const addEmployee = async () => {
    
    }

// view departments
const viewDepartments = async () => {
        
        }

// update employee role
const updateEmployeeRole = async () => {
        
        }


        const request = () => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'request',
                    message: 'What would you like to do?',
                    choices: [
                        'Add Department',
                        'Add Role',
                        'Add Employee',
                        'View Departments',
                        'Update Employee Role',
                        'Exit'
                    ]
                }
            ]).then((answer) => {
                switch (answer.request) {
                    case 'Add Department':
                        addDepartment();
                        break;
                    case 'Add Role':
                        addRole();
                        break;
                    case 'Add Employee':
                        addEmployee();
                        break;
                    case 'View Departments':
                        viewDepartments();
                        break;
                    case 'Update Employee Role':
                        updateEmployeeRole();
                        break;
                    case 'Exit':
                        connection.end();
                        break;
                }
            })
        }

        request();

        module.exports = request;

        