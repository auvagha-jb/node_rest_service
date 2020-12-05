$(function () {

    //Registers new student
    $(`#registration-form-btn`).click(function () {
        let formId = 'registration-form';
        console.log('Submit button clicked');

        let invalidFields = [];

        let input = {
            addStudent: 'true',
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phoneNumber: $('#phoneNumber').val(),
            nationality: $('#nationality').val(),
            countryCode: '+'.concat($('#countryCode').val()),
        }

        console.log(input);

        // Iterate through the fields valdating text
        let formIsValid = formValidation(input, invalidFields);

        //Submit form if validation passes
        if (formIsValid) {
            console.log('Form is validated. Sending...');
            //Submit form
            let api = new Api();
            api.sendRequest({
                method: api.method.post,
                formData: input,
                formId: formId
            });
        }

    });


    //Shows students by Id
    $(`#search-form-btn`).click(function () {
        console.log('Submit button clicked');

        let formId = 'search-form';
        let form = document.forms[formId];

        let invalidFields = [];

        let input = {
            getStudentById: 'true',
            studentId: form['studentId'].value,
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

        getStudents({
            formId: formId,
            formData: input,
            emptyMessage: `No student with id ${input.studentId} found`
        });
    });

    //Shows all students in the db
    $('#all-students-btn').click(function () {
        console.log('All button clicked');

        let input = {
            getAllStudents: true,
        }

        console.log(input);

        getStudents({
            formId: 'all-students',
            formData: input,
            emptyMessage: `No students found in database`
        });
    });

    //Shows all courses in the db
    $('#all-courses-btn').click(function () {
        console.log('All button clicked');

        let input = {
            getAllCourses: true,
        }

        console.log(input);

        let api = new Api();

        api.sendRequest({
            method: api.method.get,
            formData: input,
        }).then(function (courses) {
            if (courses.length > 0) {
                printCoursesTable(courses);
            } else {
                printAlert('No courses found')
            }
        });
    });

    $('.faculties').change(function () {
        let value = $(this).val();
        console.log({ value });

        if (value != "") {
            let facultyId = parseInt(value);
            populateCourses(facultyId);
            $('#facultyIdCourse').val(facultyId);
            $('.course-form-group').fadeIn('slow')
        } else {
            $('.course-form-group').fadeOut('fast')
        }
    });


    $('#enrollment-form-btn').click(function () {
        let formId = 'enrollment-form';

        let input = {
            addEnrollment: 'true',
            facultyId: $('#facultyId').val(),
            courseId: $('#courseId').val(),
            studentIdEnrollment: $('#studentIdEnrollment').val(),
        }

        console.log(input);

        let invalidFields = [];

        if (formValidation(input, invalidFields)) {
            //Submit form
            let api = new Api();
            api.sendRequest({
                method: api.method.post,
                formData: input,
                formId: formId
            }).then(function () {
                let action = new FormActions();
                populateFaculties();
                action.manualFormReset(input);
            });
        }
    });

    $('#course-search-form-btn').click(function () {
        let input = {
            getCourseByEnrollment: 'true',
            courseIdSearch: $('#courseIdSearch').val(),
            facultyIdSearch: $('#facultyIdSearch').val(),
        }

        console.log(input);

        let invalidFields = [];

        let api = new Api();

        if (formValidation(input, invalidFields)) {
            //Submit form
            api.sendRequest({
                method: api.method.get,
                formData: input,
            }).then(function (data) {
                if (data.length > 0) {
                    printCourseEnrollemntTable(data);
                } else {
                    printAlert(`No one enrolled to ${$('#courseIdSearch option:selected').html()}`)
                }
            });
        }

    });


    //Modals
    //New faculty
    $(document).on('click', '#faculty-form-btn', function () {
        console.log('Submit faculty form');

        let input = {
            addFaculty: 'true',
            facultyName: $('#facultyName').val(),
        };

        let invalidFields = [];

        console.log(input);

        if (formValidation(input, invalidFields)) {
            //Submit form
            let api = new Api();
            api.sendRequest({
                method: api.method.post,
                formData: input,
                formId: 'faculty-form'
            }).then(function () {
                let action = new FormActions();
                populateFaculties();
                action.manualFormReset(input);
            });
        }
    });

    //New course
    $(document).on('click', '#course-form-btn', function () {
        console.log('Submit course form');

        let input = {
            addCourse: 'true',
            courseName: $('#courseName').val(),
            facultyIdCourse: $('#facultyIdCourse').val(),
            courseType: $('#courseType').val(),
        };

        let invalidFields = [];

        console.log(input);

        if (formValidation(input, invalidFields)) {
            let facultyId = input['facultyIdCourse'];

            //Submit form
            let api = new Api();
            api.sendRequest({
                method: api.method.post,
                formData: input,
                formId: 'course-form'
            }).then(function () {
                let action = new FormActions();
                $('#facultyId').val(facultyId);
                populateCourses(facultyId);
                action.manualFormReset(input);
            });
        }
    });

    function getStudents({ formId, formData, emptyMessage }) {
        //Submit form
        let api = new Api();
        api.sendRequest({
            method: api.method.get,
            formId: formId,
            formData: formData,
        }).then(function (student) {

            if (student.length > 0) {
                printStudentsTable(student);
            } else {
                printAlert(emptyMessage)
            }
        });
    }

    function printAlert(message) {
        $('.search-results').html(`
        <div class="alert alert-primary">
            ${message}
        </div>
        `)
    }

    class Api {

        method = {
            get: "GET",
            post: "POST",
        }

        sendRequest({ method, formData, formId }) {
            console.log({ method, formData });
            let submitBtn = $(`#${formId}-btn`);
            let action = null;

            if (formId != null) action = new FormActions(formId, submitBtn, submitBtn.html());

            return $.ajax({
                url: 'php/proxy.php',
                method: method,
                dataType: 'json',//Specify format 
                data: formData,
                beforeSend: function () {
                    if (action != null) action.showLoader();
                },
                success: function (data) {
                    console.log(data);
                    if (action != null) action.onSend(data.message, true);
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error(xhr.responseText);
                    console.error(textStatus);
                    console.error(errorThrown);
                    if (action != null) action.onSend('Something went wrong. Please try again.', false);
                }
            });
        }

    }

    function getSelectItems({ formData }) {
        //Submit form
        let api = new Api();
        return api.sendRequest({
            method: api.method.get,
            formData: formData,
        });
    }

    populateFaculties();

    function populateCourses(facultyId) {
        getSelectItems({
            formData: { getCourses: true, facultyId },
        }).then(function (courses) {
            let select = $('.courses');

            if (courses.length < 1) {
                select.html('<option value="">No courses added</option>');
                return;
            }

            select.html('<option value="">Select your course</option>');

            for (let course of courses) {
                console.log(`${course.courseId} : ${course.courseName}`);
                select.append(`<option value="${course.courseId} ">
                    ${course.courseName}
                </option>`);
            }
        });
    }

    function populateFaculties() {
        getSelectItems({
            formData: { getFaculties: true },
        }).then(function (faculties) {
            let select = $('.faculties');

            if (faculties.length < 1) {
                select.html('<option value="">No faculties added</option>');
                return;
            }

            select.html('<option value="">Select your faculty</option>');

            for (let faculty of faculties) {
                console.log(`${faculty.facultyId} : ${faculty.facultyName}`);
                select.append(`<option value="${faculty.facultyId}">
                    ${faculty.facultyName}
                </option>`);
            }
        });
    }


    class FormActions {
        loader = '<center> <div class="loader-animation"></div> </center>';
        successFeedback = $('.success-feedback');
        errorFeedback = $('.error-feedback');
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
            this.submitBtn.html(this.defaultBtnText);

            if (success) {
                this.hideErrorMessage();
                this.showSuccessMessage(message);
                this.resetForm();
            } else {
                this.showErrorMessage(message);
            }

        }

        showSuccessMessage(message) {
            this.successFeedback.html(message);
            //Fade in the success message
            this.successFeedback.fadeIn('fast', () => { })

            //After five seconds, fadeOut message 
            setTimeout(() => {
                this.successFeedback.fadeOut('slow', () => { })
            }, this.delayTime);
        }

        showErrorMessage(message) {
            message = message ?? 'Something went wrong .Please try again later';
            this.errorFeedback.fadeIn('fast', () => { })
            this.errorFeedback.html(message);
        }

        hideErrorMessage() {
            this.errorFeedback.fadeOut('slow', () => { });
        }

        resetForm() {
            let form = document.getElementById(this.formId);
            if (form != null) {
                form.reset();
            }
        }

        manualFormReset(input) {
            for (let key in input) {
                let field = $(`#${key}`);

                if (field != null) {
                    field.val("");
                }
            }
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


    class Table {
        constructor(headers, body) {
            this.headers = headers;
            this.body = body;
        }

        tableHeader(data) {
            return `<th scope="col">${data}</th>`;
        }

        tableRow(data) {
            return `<td>${data}</td>`;
        }

        printHeader() {
            let th = '';
            for (let header of this.headers) {
                th = th.concat(this.tableHeader(header));
            }
            return th;
        }

        printRow(row) {
            let tr = '<tr>';
            for (let key in row) {
                tr = tr.concat(this.tableRow(row[key]))
            }
            tr = tr.concat('</td>')
            return tr;
        }

        printBody() {
            let tr = '';
            for (let row of this.body) {
                console.log({ row });
                tr = tr.concat(this.printRow(row));
            }
            console.log(tr);
            return tr;
        }

        printTable() {
            return `<table class="table">
            <thead class="thead-dark">
                <tr>
                    ${this.printHeader()}
                </tr>
            </thead>
            <tbody>
                ${this.printBody()}
            </tbody>
            </table>`;
        }

    }

    function printStudentsTable(responseData) {
        let headers = [
            '#',
            'Full Name',
            'Email Address',
            'Phone Number',
            'Nationality'
        ];

        let students = []

        for (let data of responseData) {
            let student = {
                studentId: data['studentId'],
                fullName: `${data['firstName']} ${data['lastName']}`,
                email: data['email'],
                fullPhoneNumber: `${data['countryCode']}${data['phoneNumber']}`,
                nationality: data['nationality'],
            }
            students.push(student);
        }

        let table = new Table(headers, students);

        $('.search-results').html(table.printTable())
    }

    function printCoursesTable(responseData) {
        let headers = [
            '#',
            'Course Type',
            'Course Name',
            'Faculty',
        ];

        let courses = []

        let count = 0;
        for (let data of responseData) {
            count++;
            let courseType = data['courseType'];
            let course = {
                no: count,
                courseType: courseType.charAt(0).toUpperCase() + courseType.slice(1),
                courseName: data['courseName'],
                facultyName: data['facultyName'],
            }
            courses.push(course);
        }


        let table = new Table(headers, courses);


        $('.search-results').html(table.printTable())
    }

    function printCourseEnrollemntTable(responseData) {
        let headers = [
            '#',
            'Full Name',
            'Student Id',
            'Phone Number',
            'Email Address'
        ];

        let table = new Table(headers, responseData);

        $('.search-results').html(`
        <div class="lead">${$("#courseIdSearch option:selected").html()}
        </div>`);
        $('.search-results').append(table.printTable());
    }


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

            case 'phoneNumber':
                validate.phoneValidation();
                break;

            case 'countryCode':
                validate.countryCodeValidation();
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
                studentId: 'Please enter the student number',
                facultyId: 'Please choose a faculty',
                courseId: 'Please choose a course',
                firstName: 'Please enter your first name',
                lastName: 'Please enter your first name',
                email: 'Please enter your email address',
                countryCode: 'Please choose your country code',
                phoneNumber: 'Please enter your phone number',
                nationality: 'Please choose your nationality',
            }

            let message = fieldEmptyMessage[key] ?? 'This field is required';

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

        countryCodeValidation() {
            let testPassed = this.value.length > 1;
            this.status = testPassed;
            this.message = testPassed ? this.testPassedMessage : 'Please choose a country code';
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

});