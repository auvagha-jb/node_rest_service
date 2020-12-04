<div class="container p-5">
    <form method="post" id="enrollment-form">

        <div class="form-group">
            <label for="studentIdEnrollment">Student Number</label>
            <input type="text" class="form-control" id="studentIdEnrollment" placeholder="">
            <div class="invalid-feedback" id="studentIdEnrollment-feedback"></div>
        </div>

        <div class="form-group">
            <label for="facultyId">Faculty</label>
            <div class="input-group">
                <select class="form-control faculties" name="facultyId" id="facultyId">
                    <option value="">Waiting...</option>
                </select>
                <div class="input-group-append">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-outline-primary" data-toggle="modal"
                        data-target="#facultyModalCenter">
                        <i class="fa fa-plus-circle"></i>
                    </button>
                    <?php require('modals/faculty-modal.php');?>
                </div>
                <div class="invalid-feedback" id="facultyId-feedback"></div>
            </div>
        </div>

        <div class="form-group course-form-group" style="display:none">
            <label for="courseId">Course</label>
            <div class="input-group">
                <select class="form-control courses" name="courseId" id="courseId">
                    <option value="">Waiting...</option>
                </select>
                <div class="input-group-append">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-outline-primary" data-toggle="modal"
                        data-target="#courseModalCenter">
                        <i class="fa fa-plus-circle"></i>
                    </button>
                    <?php require('modals/course-modal.php');?>
                </div>
                <div class="invalid-feedback" id="courseId-feedback"></div>
            </div>
        </div>

        <button type="button" class="btn btn-primary" id="enrollment-form-btn">Submit</button>
    </form>
</div>