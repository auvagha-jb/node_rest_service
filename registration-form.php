<?php require_once('constants/countries.php');?>
<?php require_once('constants/countryCodes.php');?>
<div class="container p-5">
    <div class="lead">Student Registration form</div>
    <form method="POST" name="register-form">
        <div class="alert alert-success d-none">New Student Registered!</div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" class="form-control" name="firstName" id="firstName" placeholder="" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" class="form-control" name="lastName" id="lastName" placeholder="" required>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" class="form-control" name="email" id="email" placeholder="" required>
        </div>

        <div class="form-group">
            <label for="nationality">Nationality</label>
            <select class="form-control" name="nationality" id="nationality" required>
                <option value="">Select your nationality</option>
                <?php foreach ($countries as $key => $value):?>
                <option value="<?=$value?>"><?=$value?></option>
                <?php endforeach;?>
            </select>
        </div>

        <div class="form-group">
            <label for="nationality">Phone Number</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <select class="form-control" name="nationality" id="nationality">
                        <option value="">Country Code</option>
                        <?php foreach ($countryCodes as $key => $value):?>
                        <option value="<?=$value?>"><?=$value?></option>
                        <?php endforeach;?>
                    </select>
                </div>
                <input type="text" class="form-control" name="phoneNumber" id="phoneNumber" placeholder="721 123 123">
            </div>
        </div>

        <button type="submit" class="btn btn-primary" id="register-form-btn">Submit</button>
    </form>
</div>