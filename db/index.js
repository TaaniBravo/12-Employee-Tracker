const connection = require('./connection');

module.exports = {
    getDepartments() {

        return connection.query('SELECT * FROM department')

    },

    getRoles() {

        return connection.query('SELECT * FROM role')

    },

    getEmployees() {

        return connection.query(`SELECT
        e.id,
        e.first_name,
        e.last_name,
        r.title,
        d.department_name,
        r.salary,
        CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM
        employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON m.id = e.manager_id`)

    },

    getSpecificDepartment(data) {
        return connection.query('SELECT employee.id, first_name, last_name, title, department_name, salary FROM department INNER JOIN role ON role.department_id = department.id INNER JOIN employee ON employee.role_id = role.id WHERE department_name = ?;',
            [
                data.department
            ])
    },

    getManagers() {
        return connection.query('SELECT * FROM employee e WHERE manager_id IS NULL')
    },

    getManagerTeam(data) {
        return connection.query(`SELECT
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.department_name,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
              FROM
                employee e
                LEFT JOIN role r ON e.role_id = r.id
                LEFT JOIN department d ON r.department_id = d.id
                LEFT JOIN employee m ON m.id = e.manager_id
              WHERE
                m.id = ?`,
                [
                    data.manager
                ])
    },

    insertDepartment(data) {
        return connection.query('INSERT INTO department SET ?',
        {
            department_name: data.departmentName
        })
    },

    deleteDepartment(data) {

        return connection.query('DELETE FROM department WHERE ?',
        {
            id: data.departmentId
        })
    },


    insertRole(data) {

        return connection.query(`INSERT INTO role SET ?`,
            {
                title: data.title,
                salary: data.salary,
                department_id: data.department_id
            }
        )
    },

    deleteRole(data) {

        return connection.query('DELETE FROM role WHERE ?',
        {
            id: data.roleId
        })
    },

    insertEmployee(data) {

        return connection.query('INSERT INTO employee SET ?',
        {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.roleId,
            manager_id: data.managerId
        }
        )
    },

    deleteEmployee(data) {

        return connection.query('DELETE FROM employee WHERE ?',
        {
            id: data.employeeId
        })
    },

    updateEmployeeRole(data) {

        return connection.query('UPDATE employee SET ? WHERE ?',
        [{
            role_id: data.newRole
        },
        {
            id: data.employeeId
        }])
    },

    updateEmployeeManager(data) {

        return connection.query('UPDATE employee SET ? WHERE ?',
        [{
            manager_id: data.newManager
        },
        {
            id: data.employeeId
        }])
    },

    getDepartmentSalary(data) {
        return connection.query('SELECT SUM(salary) AS Total_Dept_Salary, department_name FROM role INNER JOIN department ON role.department_id = department.id WHERE ?',
        [{
            'department.id': data.departmentId
        }])
    }
}