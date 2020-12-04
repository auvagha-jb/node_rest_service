<?php require_once('constants/courseTypes.php');?>

<!-- Modal -->
<div class="modal fade" id="courseModalCenter" tabindex="-1" role="dialog" aria-labelledby="courseModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="courseModalLongTitle">New Course</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="post" name="course-form" id="course-form">
                    <div class="form-group">
                        <label for="facultyId">Faculty</label>
                        <div class="input-group">
                            <select class="form-control faculties" name="facultyIdCourse" id="facultyIdCourse">
                                <option value="">Waiting...</option>
                            </select>
                            <div class="invalid-feedback" id="facultyIdCourse-feedback"></div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="courseType">Course Type</label>
                        <select class="form-control" name="courseType" id="courseType">
                            <option value="">Select the course type</option>
                            <?php foreach ($courseTypes as $key => $value):?>
                            <option value="<?=$key?>"><?=$value?></option>
                            <?php endforeach;?>
                        </select>
                        <div class="invalid-feedback" id="courseType-feedback"></div>
                    </div>

                    <div class="form-group">
                        <label for="courseName">Course Name</label>
                        <input type="text" class="form-control" name="courseName" id="courseName" placeholder="">
                        <div class="invalid-feedback" id="countryCode-feedback"></div>
                    </div>

                    <div class="py-2">
                        <div class="alert alert-danger error-feedback" style="display: none"></div>
                        <div class="alert alert-success success-feedback" style="display: none">Alert Success</div>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                <button type="button" class="btn btn-primary" id="course-form-btn">Add new course</button>
            </div>
        </div>
    </div>
</div>