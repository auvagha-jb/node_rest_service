const Table = require('./table')

class Enrollment extends Table {

    constructor() {
        super('Enrollemnt');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS enrollment (
            studentId INT(11) NOT NULL, 
            courseId INT(11) NOT NULL
        );`;

        return super.createTable(sql);
    }


    insert({ studentId, courseId }) {
        let sql = 'INSERT INTO enrollment SET ?';
        return super.insert({
            object: { studentId, courseId },
            sql: sql,
        })
    }

}

module.exports = Enrollment;