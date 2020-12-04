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

    selectCourses() {
        let sql = 'SELECT courseId, courseName FROM courses';
        return sql;
    }

    selectCoursesByFacultyId(facultyId) {
        let sql = ` SELECT courses.courseId, courses.courseName 
                    FROM courses
                    JOIN faculties ON 
                    courses.facultyId = faculties.facultyId
                    WHERE courses.facultyId = ${facultyId}`;

        return sql;
    }

}


module.exports = Courses;