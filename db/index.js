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

    insertRole(data) {

        return connection.query(`INSERT INTO role SET ?`, 
        {
            title: data.title,
            salary: data.salary,
            department_id: data.department_id
        }
        )
    }
}