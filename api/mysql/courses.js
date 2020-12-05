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

    selectAllCourses() {
        let sql = ` SELECT courses.courseType, courses.courseName, faculties.facultyName
                    FROM courses
                    JOIN faculties ON 
                    courses.facultyId = faculties.facultyId
                    ORDER BY courses.facultyId DESC
                    `;

        return sql;
    }

    selectCoursesByFacultyId(facultyId) {
        let sql = ` SELECT courses.courseId, courses.courseName 
                    FROM courses
                    JOIN faculties ON 
                    courses.facultyId = faculties.facultyId
                    WHERE courses.facultyId = ${facultyId}
                    ORDER BY courses.courseType DESC
                    `;

        return sql;
    }

}


module.exports = Courses;