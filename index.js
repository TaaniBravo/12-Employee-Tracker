const inquirer = require('inquirer');
const cTable = require('console.table')
const db = require('./db');
// const connection = require('./db/connection');

const logo = require('asciiart-logo');
const config = require('./package.json');
// const { insertRole } = require('./db');

console.log(logo(config).render());

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
            switch (answer.action) {
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
                    updateEmployeeRole();
                    break;
                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Remove Role':
                    removeRole();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Remove Department':
                    removeDepartment();
                    break;
                default:
                    connection.end();

            }
        });
};

const queryAll = () => {

    db
        .getEmployees()
        .then(results => {
            console.table(results)
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
        })

};

const queryByDepartment = () => {
    db
        .getDepartments()
        .then(results => {
            inquirer
                .prompt({
                    name: "department",
                    type: "list",
                    message: "Which department would you like to view?",
                    choices: () => {
                        const choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].department_name);
                        }
                        return choiceArray;
                    }
                })
                .then(answer => {
                    for (let i = 0; i < results.length; i++) {
                        if (results[i].department_name === answer.department) {
                            db
                                .getSpecificDepartment(answer)
                                .then(department => {
                                    console.log('\n -------------------------------------- \n');
                                    console.table(department)
                                    init();
                                });
                        };
                    }
                })
        });
};

const queryByManagement = () => {
    db
        .getManagers()
        .then(results => {
            const managementChoices = results.map(managers => ({
                value: managers.id,
                name: `${managers.first_name} ${managers.last_name}`
            }));
            console.log(managementChoices)
            inquirer
                .prompt({
                    name: "manager",
                    type: "list",
                    message: "Which management team would you like to view?",
                    choices: managementChoices
                })
                .then(answer => {
                    db
                        .getManagerTeam(answer)
                        .then(team => {
                            console.log(' ')
                            console.table(team);
                            init();
                        })
                })
        });
};

const addEmployee = () => {

    db
        .getRoles()
        .then(results => {

            const roleChoices = results.map(roles => ({
                value: roles.id,
                name: roles.title
            }));

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
                        choices: roleChoices
                    },
                    ])
                .then(employee => {
                    db
                        .insertEmployee(employee)
                    console.log(`${employee.firstName} ${employee.lastName} was added to the database.\n PLEASE UPDATE their manager.`)
                    init();
                })
        })
}

const removeEmployee = () => {
    db
        .getEmployees()
        .then(employees => {
            const employeeChoices = employees.map(employee => ({
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            }));

            inquirer
                .prompt(
                    [{
                        name: "employeeId",
                        type: "list",
                        message: "Who would you like to remove from the roster?",
                        choices: employeeChoices
                    }
                    ])
                .then(answer => {
                    console.log(answer)
                    db
                        .deleteEmployee(answer)
                    console.log('Employee was removed from the database...\n')
                    init();
                })
        })

}

const addRole = () => {

    db
        .getDepartments()
        .then(departments => {

            const departmentChoices = departments.map(department => ({
                value: department.id,
                name: department.department_name
            }))

            console.log(departmentChoices)

            inquirer
                .prompt([

                    {
                        name: 'title',
                        type: 'input',
                        message: 'What`s the title of this role?'
                    },
                    {
                        name: 'salary',
                        type: 'number',
                        message: 'How much is this role`s salary?'
                    },
                    {
                        name: 'department_id',
                        type: 'list',
                        message: 'Choose a department to add role.',
                        choices: departmentChoices
                    },
                ])
                .then(answer => {
                    db
                        .insertRole(answer)
                    console.log(`${answer.title} was added to the database.\n`)
                    init();
                })
        })
}

const removeRole = () => {
    db
        .getRoles()
        .then(roles => {
            const roleChoices = roles.map(role => ({
                value: role.id,
                name: role.title
            }));

            inquirer
                .prompt(
                    [{
                        name: "roleId",
                        type: "list",
                        message: "Which role would you like to remove?",
                        choices: roleChoices
                    }
                    ])
                .then(answer => {
                    console.log(answer)
                    db
                        .deleteRole(answer)
                    console.log('Role was removed from the database...\n')
                    init();
                })
        })

}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'department_name',
                type: 'input',
                message: 'What is the department name?'
            },
        ])
        .then(answer => {
            db
                .insertDepartment(answer)
            console.log(`${answer.department - name} was added to the database.\n`)
            init();
        })
}

const removeDepartment = () => {
    db
        .getDepartments()
        .then(departments => {
            const departmentChoices = departments.map(department => ({
                value: department.id,
                name: department.department_name
            }));

            inquirer
                .prompt(
                    [{
                        name: "departmentId",
                        type: "list",
                        message: "Which department would you like to remove?",
                        choices: departmentChoices
                    }
                    ])
                .then(answer => {
                    db
                        .deleteDepartment(answer)
                    console.log('Department was removed from the database...\n')
                    init();
                })
        })

}

const updateEmployeeRole = () => {
    db
        .getEmployees()
        .then(employees => {
            const employeeChoices = employees.map(employee => ({
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            }));

            db
                .getRoles()
                .then(roles => {
                    const roleChoices = roles.map(role => ({
                        value: role.id,
                        name: role.title
                    }));

                    inquirer
                        .prompt(
                            [{
                                name: "employeeId",
                                type: "list",
                                message: "Which employee`s role would you like to update?",
                                choices: employeeChoices
                            },
                            {
                                name: "newRole",
                                type: "list",
                                message: "What is their new role?",
                                choices: roleChoices
                            },
                            ])
                        .then(answer => {
                            db
                                .updateEmployeeRole(answer)
                            console.log(`Information updated... \n`)
                            init();
                        })
                })
        })
}

const updateEmployeeManager = () => {
    db
        .getEmployees()
        .then(employees => {
            const employeeChoices = employees.map(employee => ({
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            }));

            db
                .getRoles()
                .then(roles => {
                    const roleChoices = roles.map(role => ({
                        value: role.id,
                        name: role.title
                    }));

                    inquirer
                        .prompt(
                            [{
                                name: "employeeId",
                                type: "list",
                                message: "Which employee`s role would you like to update?",
                                choices: employeeChoices
                            },
                            {
                                name: "newRole",
                                type: "list",
                                message: "What is their new role?",
                                choices: roleChoices
                            },
                            ])
                        .then(answer => {
                            db
                                .updateEmployeeRole(answer)
                            console.log(`Information updated... \n`)
                            init();
                        })
                })
        })
}

init();