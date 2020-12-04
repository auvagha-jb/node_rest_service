<!-- Modal -->
<div class="modal fade" id="facultyModalCenter" tabindex="-1" role="dialog" aria-labelledby="facultyModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="facultyModalLongTitle">New Faculty</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="POST" name="faculty-form" id="faculty-form">
                    <div class="form-group">
                        <label for="facultyName">Faculty Name</label>
                        <input type="text" class="form-control" name="facultyName" id="facultyName" placeholder="">
                        <div class="invalid-feedback" id="facultyName-feedback"></div>
                    </div>
                </form>
                <div class="py-2">
                    <div class="alert alert-danger error-feedback" style="display: none"></div>
                    <div class="alert alert-success success-feedback" style="display: none">Alert Success</div>
                </div>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                <button type="button" class="btn btn-primary" id="faculty-form-btn">Add new faculty</button>
            </div>
        </div>
    </div>
</div>