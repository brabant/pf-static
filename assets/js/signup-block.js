$(document).ready(function () {

    let flagE = false;
    let flagJ = false;

    // on tabs click
    $('.js-signup-tab-block').click(function (e) {
        // change footer color
        $('.js-signup-tab-block').removeClass('is-invalid');

        // change role flag
        if (e.target.classList.contains('js-tab-jour-block')) {
            flagE = false;
            flagJ= true;
            $('.js-pane-jour-block input').attr("required", true);
            $('.js-pane-expert-block input').attr("required", false);
        }
        if (e.target.classList.contains('js-tab-expert-block')) {
            flagE = true;
            flagJ= false;
            $('.js-pane-jour-block input').attr("required", false);
            $('.js-pane-expert-block input').attr("required", true);
        }

    });

    // on form submit
    $('.js-signup-form-block').submit(function (event) {
        event.preventDefault();

        let url = 'https://api.pressfeed.ru';
        let signupUrl = url + '/registration';
        let signinUrl = url + '/auth';

        let formData = {};

        // getting common form values
        $('.js-signup-form-block .js-input-common-block').each(function () {
            formData[this.name] = $(this).val();
        });

        // if expert, get expert [object] and add it to formData
        if (flagE) {
            let companyObj = {};
            $('.js-signup-form-block .js-input-expert-block').each(function () {
                companyObj[this.name] = $(this).val();
            });
            formData.companies = [companyObj];
            companyObj = {};
        }

        // if jour, get jour [object] and add it to formData
        if (flagJ) {
            let smiObj = {};
            $('.js-signup-form-block .js-input-jour-block').each(function () {
                smiObj[this.name] = $(this).val();
            });
            smiObj['id'] = 0;
            smiObj['geo_id'] = 0;
            formData.smi = [smiObj];
            smiObj = {};
        }

        // getting role type
        if (flagE) { formData.type = 'expert' }
        if (flagJ) { formData.type = 'journalist' }

        // user login
        function userLogin() {

            let loginData = {
                email: formData.email,
                password: formData.password,
            };

            $.ajax({
                method: 'POST',
                url: signinUrl,
                headers: {
                    'Current-Version': 'v1',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(loginData),
                dataType: "json",
                success: function (response) {
                    localStorage.setItem('token', JSON.stringify(response.data));
                    window.location.href = "https://pressfeed.ru/all-queries"
                },
                error: function (response) {
                    console.log('error: ', response);
                },
            })
        }

        // user registration
        function userRegistration() {
            $('.js-submit-button-block').text('Регистрация...');
            $.ajax({
                method: 'POST',
                url: signupUrl,
                headers: {
                    'Current-Version': 'v1',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(formData),
                dataType: "json",
                success: function (response) {
                    console.log('success:', response);
                    userLogin();
                    $('.js-submit-button-block').text('Регистрация готова');
                    $('.js-signup-form-block input').val('');
                    $('.js-signup-message-block').removeClass('d-flex').addClass('d-none');
                },
                error: function (response) {
                    $('.js-submit-button-block').text('Зарегистрироваться');
                    console.log('error: ', response.responseJSON);
                    $('.js-signup-message-block').removeClass('d-none').addClass('d-flex');
                    $('.js-signup-message-text-block').text(response.responseJSON.message);
                },
            });
        }

        // validate role choosing
        if (flagE || flagJ) {
            userRegistration();
        } else {
           $('.js-signup-tab-block').addClass('is-invalid');
        }
    });

    // on toggle password
    let passwordToggle = document.querySelector('.js-password-toggle-block');
    let passwordInput = document.querySelector('.js-password-input-block');
    let passwordIcon = document.querySelector('.js-password-icon-block');


    passwordToggle.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordIcon.textContent = 'visibility_off';
        } else {
            passwordInput.type = 'password';
            passwordIcon.textContent = 'visibility';
        }
    })

});
