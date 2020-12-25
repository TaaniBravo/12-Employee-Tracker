const connection = require('./connection');

module.exports = {
    getDepartments() {

        return connection.query('SELECT * FROM department')

    },

    getRoles() {

        return connection.query('SELECT * FROM role_info')

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
        LEFT JOIN role_info r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON m.id = e.manager_id`)

    },

    insertRole(data) {

        return connection.query(`INSERT INTO role_info SET ?`, 
        {
            title: data.title,
            salary: data.salary,
            department_id: data.department_id
        }
        )
    }
}