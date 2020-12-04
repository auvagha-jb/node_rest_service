const db = require('./db');
const Enrollment = require('./enrollment');
const Table = require('./table')
const enrollment = new Enrollment();

class Students extends Table {

    constructor() {
        super('Student');
        this.createTable();
        new Enrollment();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS students (
            studentId INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
            firstName VARCHAR(255), 
            lastName VARCHAR(255), 
            email VARCHAR(255), 
            countryCode VARCHAR(11),
            phoneNumber VARCHAR(22),
            nationality VARCHAR(22)
        );`;

        return super.createTable(sql);
    }


    // insert(data, response) {
    //     let student = {
    //         firstName: data['firstName'],
    //         lastName: data['lastName'],
    //         email: data['email'],
    //         countryCode: data['countryCode'],
    //         phoneNumber: data['phoneNumber'],
    //         nationality: data['nationality']
    //     };

    //     let enrollment = {
    //         courseId: data['courseId'],
    //     };


    //     let studentQuery = 'INSERT INTO students SET ?';
    //     let enrollmentQuery = 'INSERT INTO enrollment SET ?';

    //     this.transaction({ studentQuery, student, enrollmentQuery, enrollment , response});
    // }

    insert(student) {
        let sql = 'INSERT INTO students SET ?';
        return super.insert({
            object: student,
            sql,
            successMessage: `${student.firstName} ${student.lastName} added successfully`
        });
    }

    transaction({ studentQuery, student, enrollmentQuery, enrollment, response }) {

        db.beginTransaction(function (err) {
            if (err) {
                throw err;
            }

            db.query(studentQuery, student, function (error, results, fields) {
                if (error) {
                    return db.rollback(function () {
                        response.send({ status: false });
                        throw error;
                    });
                }

                enrollment['studentId'] = results.insertId;
                // var log = 'Post ' + results.insertId + ' added';

                db.query(enrollmentQuery, enrollment, function (error, results, fields) {
                    if (error) {
                        return db.rollback(function () {
                            response.send({ status: false });
                            throw error;
                        });
                    }
                    db.commit(function (err) {
                        if (err) {
                            return db.rollback(function () {
                                throw err;
                            });
                        }
                        response.send({ status: true });
                    });
                });
            });
        });

    }

    selectById(studentId) {
        let sql = `SELECT * FROM students WHERE studentId = ${studentId}`;
        return sql;
    }

    selectAll() {
        let sql = 'SELECT * FROM students';
        return sql;
    }

}


module.exports = Students;