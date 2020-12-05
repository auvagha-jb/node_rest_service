<div class="container p-5">
    <div class="row float-right">

        <div class="px-1">
            <button class="btn btn-primary" id="all-students-btn">
                <i class="fa fa-users"></i> All Students
            </button>
        </div>

        <div class="px-1">
            <button class="btn btn-primary" id="all-courses-btn">
                <i class="fa fa-graduation-cap"></i> All Courses
            </button>
        </div>
    </div>


    <div class="row">
        <div class="col-md-4">
            <form class="form-inline" name="search-form" id="search-form">
                <div class="input-group mb-2 mr-sm-2">
                    <input type="text" class="form-control" id="studentId" placeholder="Student Number">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-primary mb-2" id="search-form-btn">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    <div class="invalid-feedback" id="studentId-feedback"></div>
                </div>
            </form>
        </div>
    </div>


    <div class="row">
        <div class="col-md-4">
            <form class="form-inline" name="course-search-form" id="course-search-form">
                <div class="form-group">
                    <div class="input-group">
                        <select class="form-control faculties" name="facultyIdSearch" id="facultyIdSearch">
                            <option value="">Waiting...</option>
                        </select>
                        <div class="invalid-feedback" id="facultyIdSearch-feedback"></div>
                    </div>
                </div>

                <div class="form-group course-form-group" style="display:none">
                    <div class="input-group">
                        <select class="form-control courses" name="courseIdSearch" id="courseIdSearch">
                            <option value="">Waiting...</option>
                        </select>
                        <div class="invalid-feedback" id="courseIdSearch-feedback"></div>
                    </div>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-primary" id="course-search-form-btn">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>


    <div class="search-results py-3">

    </div>
</div>