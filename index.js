const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table')
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2b.D_?rtwbjm",
    database: "greatBay_DB",
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
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;

    })
};