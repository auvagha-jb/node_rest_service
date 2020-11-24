const Table = require('./table')

class Students extends Table {

    constructor() {
        super('Student');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS students (
            id INT(255) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
            firstName VARCHAR(255), 
            lastName VARCHAR(255), 
            email VARCHAR(255), 
            countryCode VARCHAR(11),
            phoneNumber VARCHAR(22),
            nationality VARCHAR(22)
        )`;

        return super.createTable(sql);
    }


    insert(student) {
        let sql = 'INSERT INTO students SET ?';
        return super.insert({ object: student, sql: sql })
    }

    selectById(id) {
        let sql = `SELECT * FROM students WHERE id = ${id}`;
        return sql;
    }

}


module.exports = Students;