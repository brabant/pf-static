$(document).ready(function () {

    if (document.querySelector('.js-signup-form')) {

        var flagE = false;
        var flagJ = false;

        // on tabs click
        $('.js-signup-tab').click(function (e) {
            // change footer color
            $('.js-signup-footer').css('backgroundColor', 'white');
            $('.js-signup-tab').removeClass('is-invalid');

            // change role flag
            if (e.target.classList.contains('js-tab-jour')) {
                flagE = false;
                flagJ = true;
                $('.js-pane-jour input').attr("required", true);
                $('.js-pane-expert input').attr("required", false);
            }
            if (e.target.classList.contains('js-tab-expert')) {
                flagE = true;
                flagJ = false;
                $('.js-pane-jour input').attr("required", false);
                $('.js-pane-expert input').attr("required", true);
            }

        });

        // on form submit
        $('.js-signup-form').submit(function (event) {
            event.preventDefault();

            var url = 'https://api.pressfeed.ru';
            var signupUrl = url + '/registration';
            var signinUrl = url + '/auth';

            var formData = {};

            // getting common form values
            $('.js-signup-form .js-input-common').each(function () {
                formData[this.name] = $(this).val();
            });

            // if expert, get expert [object] and add it to formData
            if (flagE) {
                var companyObj = {};
                $('.js-signup-form .js-input-expert').each(function () {
                    companyObj[this.name] = $(this).val();
                });
                formData.companies = [companyObj];
                companyObj = {};
            }

            // if jour, get jour [object] and add it to formData
            if (flagJ) {
                var smiObj = {};
                $('.js-signup-form .js-input-jour').each(function () {
                    smiObj[this.name] = $(this).val();
                });
                smiObj['id'] = 0;
                smiObj['geo_id'] = 0;
                formData.smi = [smiObj];
                smiObj = {};
            }

            // getting role type
            if (flagE) {
                formData.type = 'expert'
            }
            if (flagJ) {
                formData.type = 'journalist'
            }

            // user login
            function userLogin() {

                var loginData = {
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
                        const metrikaParams = {myParam: 'Рега в кейсе', email: loginData.email,};
                        const metrikaCallback = () => console.log('Запрос в Метрику отправлен');
                        window.ym(27035592, 'reachGoal', 'RegistrationSuccess', metrikaParams, metrikaCallback());
                        //window.location.href = "https://pressfeed.ru/all-queries";
                        window.location.pathname = '/s-hello.html';
                    },
                    error: function (response) {
                        console.log('error on login: ', response);
                    },
                })
            }

            // user registration
            function userRegistration() {
                $('.js-submit-button').text('Регистрация...');
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
                        $('.js-submit-button').text('Регистрация готова');
                        $('.js-signup-form input').val('');
                        $('.js-signup-message').removeClass('d-flex').addClass('d-none');
                        userLogin();
                    },
                    error: function (response) {
                        $('.js-submit-button').text('Зарегистрироваться');
                        console.log('error on registration: ', response.responseJSON);
                        $('.js-signup-message').removeClass('d-none').addClass('d-flex');
                        $('.js-signup-message-text').text(response.responseJSON.message);
                        if (response.responseJSON.message === 'Need Captcha') {
                            $('.js-signup-message-text').text('Слишком много попыток зарегистрироваться. Попробуйте позже, пожалуйста');
                        }
                    },
                });
            }

            // validate role choosing
            if (flagE || flagJ) {
                userRegistration();
            } else {
                $('.js-signup-tab').addClass('is-invalid');
            }
        });

        // on toggle password
        let passwordToggle = document.querySelector('.js-password-toggle');
        let passwordInput = document.querySelector('.js-password-input');
        let passwordIcon = document.querySelector('.js-password-icon');


        passwordToggle.addEventListener('click', function () {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.textContent = 'visibility_off';
            } else {
                passwordInput.type = 'password';
                passwordIcon.textContent = 'visibility';
            }
        })

    }

});
