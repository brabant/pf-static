"use strict";

// Dynamic header plans link
if (localStorage.token) {
  var plansLink = document.querySelector('a.js-plans-link');

  if (plansLink) {
    plansLink.href = '/plans';
  }
} // BS popovers and tooltips


$(function () {
  $('[data-toggle="popover"]').popover();
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
}); // Mobile menu

(function () {
  window.addEventListener('DOMContentLoaded', function () {
    var menuMobBtn = document.getElementById('menu-mob-trigger');
    var menuMob = document.getElementById('menu-mob');
    menuMobBtn.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('is-open');
      menuMob.classList.toggle('is-open');
    });
  });
})(); // Handling queries and publictions on the main page


var publicationsSection = document.querySelector('.js-pb');

if (publicationsSection) {
  $.ajax({
    type: "GET",
    url: 'https://api.pressfeed.ru/publications/search?limit=5&smi_is_top=1',
    success: function success(msg) {
      var queries = msg.data;
      var publicationSlider = document.querySelector('.js-slider-publications');
      var publicationHTML = '';

      for (var x = 0; x < queries.length; x++) {
        var formatDate = function formatDate(date) {
          var d = new Date(date);
          var currentYearOptions = {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          };
          return d.toLocaleString("ru", currentYearOptions).slice(0, -3);
        };

        var cleanSiteLink = function cleanSiteLink(link) {
          if (link.indexOf('http://') !== -1) {
            return link.slice(7);
          }

          if (link.indexOf('https://') !== -1) {
            return link.slice(8);
          }

          return link;
        };

        var mediaName = queries[x].smi_name;
        var queryTitle = queries[x].query_title;
        var queryText = queries[x].query_text.substring(0, 500);
        var queryLink = '//pressfeed.ru/query/' + queries[x].query_id;
        var articleDate = '';
        var articleTitle = queries[x].publication_title;
        var articleLink = queries[x].publication_link;
        var slideIsActive = '';

        if (x === 0) {
          slideIsActive = 'active';
        }

        publicationHTML += "\n                <div class=\"carousel-item ".concat(slideIsActive, "\">\n                    <div class=\"row justify-content-center mb-4 mb-sm-6\">\n                        <div class=\"col-md-5\">\n                            <a class=\"card pf-card-query\" target=\"_blank\" href=\"").concat(queryLink, "\">\n                                <div class=\"card-header\">\n                                    <div class=\"d-flex justify-content-center align-items-center\">\n                                        <img class=\"mr-2 js-img-cheking\" onerror=\"this.style.display='none'\" src=\"//").concat(cleanSiteLink(queries[x].smi_site), "/favicon.ico\">\n                                        <span class=\"f-semi text-nowrap\">").concat(mediaName, "</span>\n                                    </div>\n                                    <div class=\"d-flex justify-content-center align-items-center\">\n                                        <span>\u0417\u0430\u043F\u0440\u043E\u0441</span>\n                                    </div>\n                                </div>\n                                <div class=\"card-body\">\n                                    <h3 class=\"f-semi t-m mt-2 mb-3\">").concat(queryTitle, "</h3>\n                                    <div>").concat(queryText, "</div>\n                                </div>\n                            </a>\n                        </div>\n                        <div class=\"col-md-1 d-flex justify-content-center\">\n                            <i class=\"material-icons d-block d-md-none my-2 text-danger\">arrow_downward</i>\n                            <svg class=\"img-fluid d-none d-md-inline-block\" width=\"124\" height=\"22\" viewBox=\"0 0 124 22\"\n                         xmlns=\"http://www.w3.org/2000/svg\"\n                         xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                        <defs>\n                            <path d=\"M522.62 169l-5.055-5.055-.026-3.861 11.775 10.853-11.629 10.998-.027-4.1 4.835-4.835h-116.493v-4h116.62z\"\n                                  id=\"a\"/>\n                        </defs>\n                        <g transform=\"translate(-406 -160)\" fill=\"none\">\n                            <mask>\n                                <use xlink:href=\"#a\"/>\n                            </mask>\n                            <use fill=\"#FF5252\" xlink:href=\"#a\"/>\n                        </g>\n                    </svg>\n                        </div>\n                        <div class=\"col-md-5\">\n                            <a class=\"card pf-card-article pf-card-article-").concat(x + 1, "\" target=\"_blank\" href=\"").concat(articleLink, "\">\n                                <div class=\"card-header text-right\">\n                                    <span class=\"align-middle\">\u041F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044F</span>\n                                </div>\n                                <div class=\"card-body\">\n                                    <div class=\"t-s pb-2\">").concat(formatDate(queries[x].publication_created_at), "</div>\n                                    <h3>").concat(articleTitle, "</h3>\n                                </div>\n                                <div class=\"card-layer\"></div>\n                            </a>\n                        </div>\n                    </div>\n                </div>");
      }

      publicationSlider.innerHTML = publicationHTML;
    }
  });
} // Plans switcher


var planSwitcher = document.querySelector('.js-plan-switcher');

if (planSwitcher) {
  // Animated scroll
  var scroll = new SmoothScroll('a[href*="#"]', {
    header: '[data-scroll-header]',
    ignore: '[data-scroll-ignore]',
    offset: 70
  }); // Terms switcher

  var _loop = function _loop(x) {
    planSwitcher.getElementsByTagName('a')[x].addEventListener('click', function (e) {
      e.preventDefault();
      planSwitcher.querySelector('.active').classList.remove('active');
      this.classList.add('active');
      var planPrice = document.querySelectorAll('.js-plan-price');

      var _loop2 = function _loop2(y) {
        planPrice[y].classList.add('isChanged');
        setTimeout(function () {
          planPrice[y].classList.remove('isChanged');
        }, 750);
      };

      for (var y = 0; y < planPrice.length; y++) {
        _loop2(y);
      }

      if (x === 0) {
        document.querySelector('.js-plan-1 .js-plan-price').innerHTML = '3591 <span class="f-xs">&#8381</span>';
        document.querySelector('.js-plan-2 .js-plan-price').innerHTML = '8910 <span class="f-xs">&#8381</span>';
        document.querySelector('.js-plan-3 .js-plan-price').innerHTML = '25 200 <span class="f-xs">&#8381</span>';
        document.querySelector('.js-plan-1 .js-plan-note').innerHTML = 'В месяц при подписке на год<br><span class="text-black">Экономия 4788&nbsp;&#8381</span>';
        document.querySelector('.js-plan-2 .js-plan-note').innerHTML = 'В месяц при подписке на год<br><span class="text-black">Экономия 11 880&nbsp;&#8381</span>';
        document.querySelector('.js-plan-3 .js-plan-note').innerHTML = 'В месяц при подписке на год<br><span class="text-black">Экономия 33 600&nbsp;&#8381</span>';
      } else if (x === 1) {
        document.querySelector('.js-plan-1 .js-plan-price').innerHTML = '3790 <span class="f-xs">&#8381</span>';
        document.querySelector('.js-plan-2 .js-plan-price').innerHTML = '9405 <span class="f-xs">&#8381</span>';
        document.querySelector('.js-plan-3 .js-plan-price').innerHTML = '26 400 <span class="f-xs">&#8381</span>';
        document.querySelector('.js-plan-1 .js-plan-note').innerHTML = 'В месяц при подписке на полгода<br>&nbsp;';
        document.querySelector('.js-plan-2 .js-plan-note').innerHTML = 'В месяц при подписке на полгода<br>&nbsp;';
        document.querySelector('.js-plan-3 .js-plan-note').innerHTML = 'В месяц при подписке на полгода<br>&nbsp;';
      } else if (x === 2) {
        document.querySelector('.js-plan-1 .js-plan-price').innerHTML = '3990 <span class="f-xs">&#8381</span>';
        document.querySelector('.js-plan-2 .js-plan-price').innerHTML = '9900 <span class="f-xs">&#8381</span>';
        document.querySelector('.js-plan-3 .js-plan-price').innerHTML = '28 000 <span class="f-xs">&#8381</span>';
        document.querySelector('.js-plan-1 .js-plan-note').innerHTML = 'В месяц при подписке на&nbsp;3&nbsp;месяца<br>&nbsp;';
        document.querySelector('.js-plan-2 .js-plan-note').innerHTML = 'В месяц при подписке на&nbsp;3&nbsp;месяца<br>&nbsp;';
        document.querySelector('.js-plan-3 .js-plan-note').innerHTML = 'В месяц при подписке на&nbsp;3&nbsp;месяца<br>&nbsp;';
      }
    });
  };

  for (var x = 0; x < 3; x++) {
    _loop(x);
  }
} // Testimonials


(function () {
  var testimonialsBtn = document.querySelector('.js-testimonials-more-button');

  if (testimonialsBtn) {
    var testimonialsContainer = document.querySelector('.js-pf-testimonials-extra');

    var showExtraTestimonials = function showExtraTestimonials() {
      testimonialsContainer.classList.remove('d-none');
      testimonialsBtn.classList.add('d-none');
    };

    testimonialsBtn.addEventListener('click', function () {
      return showExtraTestimonials();
    });
  }
})(); // Carousel captions


var bsCarousel = document.querySelector('#slider-features');

if (bsCarousel) {
  var listHowtoItems = document.querySelectorAll('.pf-number-big');

  for (var x = 0; x < listHowtoItems.length; x++) {
    listHowtoItems[x].addEventListener('click', function () {
      $(bsCarousel).carousel('next');
    });
  }
}