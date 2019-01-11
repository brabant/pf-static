$(document).ready(function () {
  for (var i = 1; i <= 9; i++) {
    (function () {
      var a = '#reg' + i;
      $(a).on('submit', function (event) {
        event.preventDefault();
        var hash = guid();
        var email = $(a + ' input').val();
        localStorage.setItem('email_for_reg', email.trim());
        localStorage.setItem('hash_for_reg', hash);
        var utm_source = getCookie('utm_source');
        var utm_medium = getCookie('utm_medium');
        var utm_campaign = getCookie('utm_campaign');
        var utm_content = getCookie('utm_content');
        var data = {
          stage: 'email',
          email: email.trim(),
          hash: hash,
        };
        if (utm_source) {
          data.utm_source = utm_source;
        }
        if (utm_medium) {
          data.utm_medium = utm_medium;
        }
        if (utm_campaign) {
          data.utm_campaign = utm_campaign;
        }
        if (utm_content) {
          data.utm_content = utm_content;
        }
        $.ajax({
          method: 'POST',
          url: 'https://api.pressfeed.ru/logs/registration',
          data: data,
        })
          .done(function() {
            window.location.href = '/signup';
          });
      });
    })();
  }
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4();
}

function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
