const Table = require('./table')

class Faculties extends Table {

    constructor() {
        super('Faculty');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS faculties (
            facultyId INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
            facultyName VARCHAR(255) 
        );`;

        return super.createTable(sql);
    }


    insert(faculty) {
        let sql = 'INSERT INTO faculties SET ?';
        return super.insert({
            object: faculty,
            sql: sql,
            successMessage: `${faculty.facultyName} added successfully`
        })
    }

    selectFacultyNames() {
        let sql = 'SELECT facultyName FROM faculties';
        return sql;
    }

}

module.exports = Faculties;