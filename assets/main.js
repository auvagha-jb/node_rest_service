$(function () {

    $('#registration-form-btn').click(function (e) {

        console.log('Submit button clicked');
        let form = document.forms['registration-form'];
        // let formAction = getUrl('/users');

        let invalidFields = [];

        let input = {
            firstName: form['firstName'].value,
            lastName: form['lastName'].value,
            email: form['email'].value,
            countryCode: form['countryCode'].value,
            phoneNumber: form['phoneNumber'].value,
            nationality: form['nationality'].value
        }

        console.log(input);

        // Iterate through the fields valdating text
        let formIsValid = formValidation(input, invalidFields);

        //Prevent form submission if validation fails
        if (!formIsValid) {
            return;
        }

        console.log('Form is validated. Sending...');
        //Submit form
        let api = new Api();
        api.sendRequest({
            method: api.method.post,
            formData: input,
        });
    });

    $('#search-form-btn').click(function (e) {

        console.log('Submit button clicked');
        let form = document.forms['search-form'];
        // let formAction = getUrl('/users');

        let invalidFields = [];

        let input = {
            studentNumber: form['studentNumber'].value,
        }

        console.log(input);

        // Iterate through the fields valdating text
        let formIsValid = formValidation(input, invalidFields);

        //Prevent form submission if validation fails
        if (!formIsValid) {
            return;
        }

        console.log('Form is validated. Sending...');
        console.log(input);

        //Submit form
        let api = new Api();
        api.sendRequest({
            method: api.method.post,
            formData: input,
        });
    });

    function formValidation(input, invalidFields) {
        console.log('Validating form');
        let validationStatus = true;

        //Traverse through all the fields to check if the conditions have been met  
        for (let key in input) {
            let field = $(`#${key}`);
            let value = input[key];
            let feedbackDiv = $(`#${key}-feedback`);

            // console.log(`${key}-feedback: ${feedbackDiv.html().length > 0}`);

            let validate = validationRules(key, value);

            if (!validate.status) {

                feedbackDiv.html(validate.message);//Set the message
                field.addClass('is-invalid'); //Make the message visible

                invalidFields.push(key)//Push the key to the array of invalid fields for output 

                validationStatus = false;
            } else {
                field.removeClass('is-invalid');
            }
        }

        console.log(`Validation status: ${validationStatus}`);
        return validationStatus;
    }


    function validationRules(key, value) {
        let validate = new FormValidation(value);

        //Check if the field is empty first
        if (!validate.fieldHasValue(key)) {
            console.log(`${key} => ${validate.status} : ${validate.message}`);
            return validate;
        }

        switch (key) {
            case 'firstName':
                validate.nameValidation();
                break;

            case 'lastName':
                validate.nameValidation();
                break;

            case 'email':
                validate.emailValidation();
                break;

            case 'subject':
                validate.subjectValidation();
                break;

            case 'phoneNumber':
                validate.phoneValidation();
                break;

            default:
                // validate.message = `${key} case does not exist in switch`;
                validate.status = true;
                break;
        }

        console.log(`${key} : ${value} => ${validate.status} : ${validate.message}`);

        return validate;
    }

    class FormValidation {
        testPassedMessage = 'Test passed';
        status;
        message;

        constructor(value) {
            //Remove the white spaces from the values
            this.value = value.replace(/ /g, "");
        }


        getFieldEmptyMessage(key) {
            let fieldEmptyMessage = {
                studentNumber: 'Please enter the student number',
                firstName: 'Please enter your first name',
                lastName: 'Please enter your first name',
                email: 'Please enter your email address',
                countryCode: 'Please enter your country code',
                phoneNumber: 'Please enter your phone number',
                nationality: 'Please enter your nationality',
            }

            let message = fieldEmptyMessage[key];

            if (message == null) {
                console.error(`Message for ${key} is undefined`);
            }

            return message;
        }



        /**
         * Checks if thr field has a value
         * @param {string} key The name of the field
         */
        fieldHasValue(key) {
            let isFieldFilled = this.value.length > 0;
            this.status = isFieldFilled;
            this.message = isFieldFilled ? this.testPassedMessage : this.getFieldEmptyMessage(key);

            return isFieldFilled;
        }

        nameValidation() {
            let testPassed = this.value.length > 2;
            this.status = testPassed;
            this.message = testPassed ? this.testPassedMessage : 'Name needs to have at least 2 characters';
        }

        emailValidation() {
            //Check if the email follows a valid pattern
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let isValidFormat = re.test(this.value);
            let isValidDomain = this.value.endsWith("@strathmore.edu");
            let message;

            if (!isValidFormat) {
                message = 'Enter a valid email address';
            } else if (!isValidDomain) {
                message = 'Only strathmore.edu emails are allowed';
            }

            this.status = isValidFormat && isValidDomain;
            this.message = this.status ? this.testPassedMessage : message;
        }

        phoneValidation() {
            let minLength = 9;
            let maxLength = 10;
            this.status = true; //Default status

            //Make sure the length is not less than 9 digits and does not exceed 10 digts
            if (this.value.length < minLength || this.value.length > maxLength) {
                this.message = 'Phone number cannot be less than 9 digits or more than 10';
                this.status = false;
                return;
                //TODO: Trim the leading zero from phone number if the country is Kenya   
            }

            //Make sure only numbers are entered 
            let phoneIsValid = /^\d+$/.test(this.value);
            this.status = phoneIsValid;
            this.message = phoneIsValid ? this.testPassedMessage : 'Phone number must contain only numbers';
        }


        subjectValidation() {
            let subjectIsValid = this.value.length > 5;
            this.status = subjectIsValid;
            this.message = subjectIsValid ? this.testPassedMessage : 'Subject must be at least 5 characters';
        }

        messageValidation() {
            let messageIsValid = this.value.length > 10;
            this.status = messageIsValid;
            this.message = messageIsValid ? this.testPassedMessage : 'Meassage must be at least 10 characters';
        }
    }

    class Api {

        method = {
            get: "GET",
            post: "POST",
        }

        paths = {
            student: "student"
        }

        getUrl(path) {
            const BASE_URL = 'http://127.0.0.1:5000/';

            if (path == null) {
                console.error('Path cannot be null');;
            } else if (path.length < 1) {
                console.error('Path cannot be empty string');
            } else {
                console.log(path);
            }

            return BASE_URL + path;
        }

        sendRequest({ method, formData }) {
            console.log({ method, formData });
            // let submitBtn = $('#registration-form-btn');
            // let action = new FormActions('registration-form', submitBtn, submitBtn.html());

            return $.ajax({
                url: 'php/proxy.php',
                method: method,
                dataType: 'json',//Specify format 
                data: formData,
                success: function (data) {
                    // beforeSend: action.showLoader(),
                    console.log(data);
                    // action.onSend('Email Sent!', true);
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error(xhr.responseText);
                    console.error(textStatus);
                    console.error(errorThrown);
                    // action.onSend('Something went wrong. Please try again', false);
                }
            });
        }

    }


    class FormActions {
        loader = '<center> <div class="loader-animation"></div> </center>';
        successFeedback = $('#success-feedback');
        errorFeedback = $('#error-feedback');
        delayTime = 5000;

        constructor(formId = null, submitBtn = null, defaultBtnText = null) {
            if (formId != null && submitBtn != null && defaultBtnText != null) {
                this.formId = formId;
                this.submitBtn = submitBtn;
                this.defaultBtnText = submitBtn.html();
            }
        }

        showLoader() {
            this.submitBtn.html(this.loader);
        }

        onSend(message, success) {
            this.submitBtn.html(message);
            this.showSuccessMessage();

            setTimeout(() => {
                this.submitBtn.html(this.defaultBtnText);
            }, this.delayTime);

            if (success) {
                this.resetForm();
            }

        }

        showSuccessMessage() {
            //Fade in the success message
            this.successFeedback.fadeIn('fast', () => { })

            //After five seconds, fadeOut message 
            setTimeout(() => {
                this.successFeedback.fadeOut('slow', () => { })
            }, this.delayTime);
        }

        showErrorMessage(invalidFields) {
            this.errorFeedback.fadeIn('fast', () => { })
            this.errorFeedback.html(this.invalidFieldList(invalidFields));
        }

        hideErrorMessage() {
            this.errorFeedback.fadeOut('slow', () => { });
        }

        resetForm() {
            document.getElementById(this.formId).reset();
        }

        invalidFieldList(invalidFields) {
            let output = "<div>Please review your form for errors in the following fields</div>";
            output += "<ul>";
            for (let field of invalidFields) {
                output += `<li>${field}</li>`
            }
            output += "</ul>";
            return output
        }

    }

});