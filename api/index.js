const express = require('express')

const app = express();

//Middleware that assembles json sent in post request
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


const db = require('./mysql/db');

//Init Tables
const Students = require('./mysql/students.js');
const Courses = require('./mysql/courses.js');
const Faculties = require('./mysql/faculties.js');
const Enrollment = require('./mysql/enrollment.js');

const students = new Students();
const courses = new Courses();
const faculties = new Faculties();
const enrollment = new Enrollment();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


//Init routes
app.post('/student/', (req, res) => {
    if (Object.keys(req.body).length === 6) {
        let response = students.insert(req.body);
        console.log('Request body :');
        console.log(req.body);
        res.send(response);
    } else {
        console.log(req.body);
        res.send({ status: false, message: "None or not all the properties were sent for student" })
    }
});

app.get('/student/:id/', (req, res) => {
    let sql = students.selectById(req.params.id);

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/student/', (req, res) => {
    let sql = students.selectAll();

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

//Courses

app.post('/course/', (req, res) => {
    let response = courses.insert(req.body);
    console.log('Request body :');
    console.log(req.body);
    res.send(response);
});

app.get('/course/names/', (req, res) => {
    let sql = courses.selectCourses();

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/course/names/:facultyId', (req, res) => {
    let sql = courses.selectCoursesByFacultyId(req.params.facultyId);

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


//Faculties
app.post('/faculty/', (req, res) => {
    let response = faculties.insert(req.body);
    console.log('Request body :');
    console.log(req.body);
    res.send(response);
});

app.get('/faculty/names/', (req, res) => {
    let sql = faculties.selectFacultyNames();

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


//Enrollemnt
app.post('/enrollment/', (req, res) => {
    let response = enrollment.insert(req.body);
    console.log('Request body :');
    console.log(req.body);
    res.send(response);
});