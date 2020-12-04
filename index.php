<!DOCTYPE html>
<html lang="en">

<head>
    <title>REST Web Service</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/style.css">
</head>

<body>

    <div class="container pt-5 px-5">
        <div class="nav nav-pills" id="nav-tab" role="tablist">
            <a class="nav-item nav-link active" id="register-tab" data-toggle="tab" href="#register" role="tab"
                aria-controls="register" aria-selected="true">Register Student</a>
            <a class="nav-item nav-link" id="enrol-students-tab" data-toggle="tab" href="#enrol-students" role="tab"
                aria-controls="enrol-students" aria-selected="false">Enrollment</a>
            <a class="nav-item nav-link" id="search-students-tab" data-toggle="tab" href="#search-students" role="tab"
                aria-controls="search-students" aria-selected="false">Search</a>
        </div>
    </div>

    <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="register" role="tabpanel" aria-labelledby="register-tab">
            <?php require_once('registration-form.php');?>
        </div>
        <div class="tab-pane fade" id="enrol-students" role="tabpanel" aria-labelledby="enrol-students-tab">
            <?php require_once('enrollment-form.php');?>
        </div>
        <div class="tab-pane fade" id="search-students" role="tabpanel" aria-labelledby="search-students-tab">
            <?php require_once('search-form.php');?>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="assets/main.js"></script>
</body>

</html>