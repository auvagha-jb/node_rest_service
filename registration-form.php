<?php require_once('constants/countries.php');?>
<?php require_once('constants/countryCodes.php');?>
<div class="container p-5">
    <div class="lead">Student Registration form</div>
    <form method="POST" name="registration-form" id="registration-form">
        <div class="alert alert-success d-none">New Student Registered!</div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" class="form-control" name="firstName" id="firstName" placeholder="">
                    <div class="invalid-feedback" id="firstName-feedback"></div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" class="form-control" name="lastName" id="lastName" placeholder="">
                    <div class="invalid-feedback" id="lastName-feedback"></div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" class="form-control" name="email" id="email" placeholder="">
            <div class="invalid-feedback" id="email-feedback"></div>
        </div>

        <div class="form-group">
            <label for="nationality">Nationality</label>
            <select class="form-control" name="nationality" id="nationality">
                <option value="">Select your nationality</option>
                <?php foreach ($countries as $key => $value):?>
                <option value="<?=$value?>"><?=$value?></option>
                <?php endforeach;?>
            </select>
            <div class="invalid-feedback" id="nationality-feedback"></div>
        </div>

        <div class="form-group">
            <label for="nationality">Phone Number</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <select class="form-control" name="countryCode" id="countryCode">
                        <option value="">Country Code</option>
                        <?php foreach ($countryCodes as $key => $value):?>
                        <option value="<?=$key?>"><?=$value?></option>
                        <?php endforeach;?>
                    </select>
                </div>
                <input type="text" class="form-control" name="phoneNumber" id="phoneNumber" placeholder="721 123 123">
                <div class="invalid-feedback" id="countryCode-feedback"></div>
                <div class="invalid-feedback" id="phoneNumber-feedback"></div>
            </div>

            <div class="pt-3">
                <div id="error-feedback" class="alert alert-danger" style="display: none"></div>
                <div id="success-feedback" class="alert alert-success" style="display: none">Student registered
                    successfully</div>
            </div>
        </div>

        <button type="button" class="btn btn-primary" id="registration-form-btn">Submit</button>
    </form>
</div>