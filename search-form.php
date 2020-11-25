<div class="container p-5">
    <div class="row">
        <div class="col-md-3">
            <form class="form-inline" name="search-form" id="search-form">
                <!-- <label class="sr-only" for="studentNumber">Student Number</label> -->
                <div class="input-group mb-2 mr-sm-2">
                    <input type="text" class="form-control" id="studentNumber" placeholder="Student Number">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-primary mb-2" id="search-form-btn">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    <div class="invalid-feedback" id="studentNumber-feedback"></div>
                </div>
            </form>
        </div>

        <div class="col-md-9">
            <div class="form-inline">
                <button class="btn btn-primary" id="all-students-btn">
                    <i class="fa fa-users"></i> All
                </button>
            </div>
        </div>

    </div>

    <div id="search-results" class="py-3">

    </div>
</div>