const connection = require('./connection');

module.exports = {
    getDepartments() {

        return connection.query('SELECT * FROM department')

    },

    getRoles() {

        return connection.query('SELECT * FROM role_info')

    },

    getEmployees() {

        return connection.query('SELECT * FROM employee')

    },
}