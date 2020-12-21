const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table')
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2b.D_?rtwbjm",
    database: "employee_tracker_db",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Welcome...')
    init();
});

const init = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Management',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'EXIT'
            ],
        })
        .then(answer => {
            if (answer.action === 'View All Employees') {
                console.log('\n -------------------------------------- \n');
                queryAll();
            }
            else if (answer.action === 'View All Employees By Department') {
                console.log('\n -------------------------------------- \n');
                queryByDepartment();
            }
            else if (answer.action === 'View All Employees By Management') {
                console.log('\n -------------------------------------- \n');
                queryByManagement();
            }
            else if (answer.action === 'Add Employee') {
                console.log('\n -------------------------------------- \n');
                addEmployee();
            }
            else if (answer.action === 'Remove Employee') {
                console.log('\n -------------------------------------- \n');
                removeEmployee();
            }
            else if (answer.action === 'Update Employee Role') {
                console.log('\n -------------------------------------- \n');
                updateRole();
            }
            else if (answer.action === 'Update Employee Manager') {
                console.log('\n -------------------------------------- \n');
                updateEmployeeManager();
            }
            else {
                connection.end();
            };
        });
};

const queryAll = () => {
    connection.query('SELECT employee.id, first_name, last_name, title, department_name, salary, manager_id FROM employee INNER JOIN role_info ON employee.role_id = role_info.id INNER JOIN department ON role_info.department_id = department.id;', (err, res) => {
        if (err) throw err;
        console.table(res)
        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: ['Continue', 'EXIT']
            })
            .then(answer => {
                if (answer.action === 'Continue') init();
                else connection.end();
            });
    });
};

const queryByDepartment = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err
        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "Which department would you like to view?",
                choices: () => {
                    const choiceArray = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].department_name);
                    }
                    return choiceArray;
                }
            })
            .then(answer => {
                let chosenDepartment;
                for (let i = 0; i < res.length; i++) {
                    if (res[i].department_name === answer.action) {
                        connection.query('SELECT employee.id, first_name, last_name, title, department_name, salary, manager_id FROM department INNER JOIN role_info ON role_info.department_id = department.id INNER JOIN employee ON employee.role_id = role_info.id WHERE department_name = ?;', [answer.action], (err, res) => {
                            if (err) throw err
                            console.log('\n -------------------------------------- \n');
                            console.table(res)
                        });
                        inquirer
                            .prompt({
                                name: "action",
                                type: "list",
                                message: "What would you like to do?",
                                choices: ['Continue', 'EXIT']
                            })
                            .then(answer => {
                                if (answer.action === 'Continue') init();
                                else connection.end();
                            });
                    };
                }
            })
    });
};