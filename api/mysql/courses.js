const Table = require('./table')

class Courses extends Table {

    constructor() {
        super('Course');
        this.createTable();
    }

    createTable() {
        // Create table
        let sql = ` CREATE TABLE IF NOT EXISTS courses (
            courseId INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
            facultyId INT(11), 
            courseName VARCHAR(255), 
            courseType VARCHAR(255) 
        );`;

        return super.createTable(sql);
    }


    insert(course) {
        let sql = 'INSERT INTO courses SET ?';
        return super.insert({
            object: course,
            sql: sql,
            successMessage: `${course.courseName} added successfully`
        })
    }

    selectCourseNames() {
        let sql = 'SELECT courseName FROM courses';
        return sql;
    }

}


module.exports = Courses;