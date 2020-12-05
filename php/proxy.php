<?php
require_once('curl.php');

$BASE_URL = 'http://127.0.0.1:5000';

if(isset($_POST['addStudent'])) {

    $data = [
        'countryCode' => $_POST['countryCode'], 
        'email' => $_POST['email'], 
        'firstName' => $_POST['firstName'], 
        'lastName' => $_POST['lastName'], 
        'nationality' => $_POST['nationality'], 
        'phoneNumber' => $_POST['phoneNumber'] 
    ];

    // API URL
    $url = "$BASE_URL/student";
    echo sendPostRequest($url, $data);
    
    
} else if(isset($_POST['addFaculty'])) {
    $url = "$BASE_URL/faculty/";
    $data = ['facultyName' => $_POST['facultyName']];
    echo sendPostRequest($url, $data);


} else if(isset($_POST['addCourse'])) {
    $url = "$BASE_URL/course/";
    $data = [
        'facultyId' => $_POST['facultyIdCourse'],
        'courseName' => $_POST['courseName'],
        'courseType' => $_POST['courseType'],
    ];
    echo sendPostRequest($url, $data);


} else if(isset($_POST['addEnrollment'])) {
    $url = "$BASE_URL/enrollment";
    $data = [ 
        'courseId' => $_POST['courseId'], 
        'studentId' => $_POST['studentIdEnrollment'], 
    ];
    echo sendPostRequest($url, $data);

    
} else if(isset($_GET['getStudentById'])) {

    $studentId = $_GET['studentId'];

    // echo json_encode($studentId);

    // API URL
    $url = "$BASE_URL/student/$studentId";
    echo sendGetRequest($url);


} else if(isset($_GET['getAllStudents'])) {
    // echo json_encode($studentId);

    // API URL
    $url = "$BASE_URL/student/";
    echo sendGetRequest($url);


} else if(isset($_GET['getCourses'])) {

    $facultyId = $_GET['facultyId'];
    // API URL
    $url = "$BASE_URL/course/names/$facultyId";
    echo sendGetRequest($url);


} else if(isset($_GET['getFaculties'])) {

    // API URL
    $url = "$BASE_URL/faculty/names";
    echo sendGetRequest($url);

} 