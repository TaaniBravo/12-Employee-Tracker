const inquirer = require('inquirer');
const cTable = require('console.table')
const db = require('./db');

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
                'Add Role',
                'Remove Role',
                'Add Department',
                'Remove Department',
                'EXIT'
            ],
        })
        .then(answer => {
            switch(answer.action) {
                case 'View All Employees':
                    queryAll();
                    break;
                case 'View All Employees By Department':
                    queryByDepartment();
                    break;
                case 'View All Employees By Management':
                    queryByManagement();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Remove Employee':
                    removeEmployee();
                    break;
                case 'Update Employee Role':
                    // updateEmployeeRole();
                    break;
                case 'Update Employee Manager':
                    // updateEmployeeManager();
                    break;
                case 'Add Role':
                    // addRole();
                    break;
                case 'Remove Role':
                    // removeRole();
                    break;
                case 'Add Department':
                    // addDepartment();
                    break;
                case 'Remove Department':
                    // removeDepartment();
                    break;
                default:
                    break;
                
            }
        });
};

const queryAll = () => {
    const query = `SELECT
    e.id,
    e.first_name,
    e.last_name,
    r.title,
    d.department_name,
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM
    employee e
    LEFT JOIN role_info r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON m.id = e.manager_id`

    connection.query(
        query, (err, res) => {
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
                for (let i = 0; i < res.length; i++) {
                    if (res[i].department_name === answer.action) {
                        connection.query('SELECT employee.id, first_name, last_name, title, department_name, salary FROM department INNER JOIN role_info ON role_info.department_id = department.id INNER JOIN employee ON employee.role_id = role_info.id WHERE department_name = ?;', [answer.action], (err, res) => {
                            if (err) throw err
                            console.log('\n -------------------------------------- \n');
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
                }
            })
    });
};

const queryByManagement = () => {
    connection.query('SELECT * FROM employee WHERE manager_id IS NULL', (err, res) => {
        if (err) throw err
        const choiceArray = [];
        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "Which management team would you like to view?",
                choices: () => {

                    for (let i = 0; i < res.length; i++) {
                        choiceArray[i] = `${res[i].first_name} ${res[i].last_name}`
                    }
                    return choiceArray;
                }
            })
            .then(answer => {
                const query = `SELECT
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.department_name,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
              FROM
                employee e
                LEFT JOIN role_info r ON e.role_id = r.id
                LEFT JOIN department d ON r.department_id = d.id
                LEFT JOIN employee m ON m.id = e.manager_id
              WHERE
                m.id = ?`
                // console.log(answer.action)
                for (let i = 0; i < res.length; i++) {
                    if (choiceArray[i] === answer.action) {
                        connection.query(query,
                            [
                                i + 1
                            ],
                            (err, res) => {
                                if (err) throw err
                                console.log('\n -------------------------------------- \n');
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
                }
            })
    });
};

// const roleDefine = answer => {
//     const query = `SELECT
//     *,
//     CONCAT(m.first_name, ' ', m.last_name) AS manager
//   FROM
//     employee e
//     LEFT JOIN role_info r ON e.role_id = r.id
//     LEFT JOIN department d ON r.department_id = d.id
//     LEFT JOIN employee m ON m.id = e.manager_id`

//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         for (let i = 0; i < res.length; i++) {
//             if (res[i].title = answer) return res[i].role_id
//         }
//         return 3
//     })
// }

// const managerDefine = answer => {
//     const query = `SELECT
//     *,
//     CONCAT(m.first_name, ' ', m.last_name) AS manager
//   FROM
//     employee e
//     LEFT JOIN role_info r ON e.role_id = r.id
//     LEFT JOIN department d ON r.department_id = d.id
//     LEFT JOIN employee m ON m.id = e.manager_id`

//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         for (let i = 0; i < res.length; i++) {
//             if (res[i].manager = answer) return res[i].manager_id
//         }
//         return null
//     })
// }

const addEmployee = () => {
    const query = `SELECT id, CONCAT(first_name, ' ', last_name) AS Manager FROM employee WHERE manager_id IS NULL;`
    const queryTwo = 'Select id, title, salary FROM role_info'

    const roles =
        connection.query(queryTwo, (err, role) => {
            if (err) throw err;
            role.map(({ value, name }) => ({
                value: `${role.id}`,
                name: `${role.title}`
            }))
        })

    console.log(roles)

    const managers =
        connection.query(query, (err, manager) => {
            if (err) throw err;
            manager.map(({ id, Manager }) => ({
                value: `${id}`,
                name: `${Manager}`,
            }))
        })

    inquirer
        .prompt(
            [{
                name: "firstName",
                type: "input",
                message: "What is their first name?",
            },
            {
                name: "lastName",
                type: "input",
                message: "What is their last name?",
            },
            {
                name: "roleId",
                type: "list",
                message: "What is their role?",
                choices: roles
            },
            {
                name: "managerId",
                type: "list",
                message: "Select their manager...",
                choices: managers
            }]
        )
        .then(answer => {
            const queryThree = `INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES (${answer.firstName}, ${answer.lastName}, ${answer.roleId.id}, ${answer.managerId.id})`

            connection.query(queryThree, (err, res) => {
                if (err) throw err
                console.log(`${answer.firstName} ${answer.lastName} was add to the roster.`)
                    .then(
                        inquirer
                            .prompt({
                                name: "action",
                                type: "list",
                                message: "What would you like to do?",
                                choices: ['Add Another Employee', 'Main Menu', 'EXIT']
                            })
                            .then(answer => {
                                if (answer.action === 'Add Another Employee') addEmployee();
                                else if (answer.action === 'Main Menu') init();
                                else connection.end();
                            })

                    )
            })
        })
};

// const removeEmployee = () => {
//     connection.query(`SELECT employee.id, CONCAT(first_name, ' ', last_name) AS Employees FROM employee;`, (err, res) => {
//         if (err) throw err;
//         inquirer
//             .prompt(
//                 {
//                     name: "employee",
//                     type: "list",
//                     message: "Which employee would you like to remove from the roster?",
//                     choices: [res.Employees]
//                 },
//             )
//             .then(answer => {
//                 console.log(answer.employee)
//                 connection.query(
//                     'DELETE FROM employee WHERE first_name = AND last_name = ',
//                     []
//                     (err, res) => {
//                         if (err) throw err;
//                         console.log(res.affectedRows + ' was removed from datebase.\n')
//                     }
//                 )
//             })

//             .then(
//                 inquirer
//                     .prompt({
//                         name: "action",
//                         type: "list",
//                         message: "What would you like to do?",
//                         choices: ['Remove Another Employee', 'Main Menu', 'EXIT']
//                     })
//                     .then(answer => {
//                         if (answer.action === 'Remove Another Employee') removeEmployee();
//                         else if (answer.action === 'Main Menu') init();
//                         else connection.end();
//                     })

//             )
//     })
// };