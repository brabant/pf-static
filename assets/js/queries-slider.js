"use strict";

// Queries on the main page
(function () {
  var queriesSlider = document.querySelector('.js-query-slider');

  if (queriesSlider) {
    var cleanSiteLink = function cleanSiteLink(link) {
      if (link.indexOf('http://') !== -1) {
        return link.slice(7);
      }

      if (link.indexOf('https://') !== -1) {
        return link.slice(8);
      }

      return link;
    };

    $.ajax({
      type: "GET",
      url: "https://api.pressfeed.ru/external/top-queries",
      success: function success(data) {
        var queries = data.data;
        var bannerStr = '';

        var formatDate = function formatDate(date) {
          var d = new Date(date.replace(/-/g, '/'));
          var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          var currentYearOptions = {
            month: 'long',
            day: 'numeric'
          };
          var currentYear = new Date().getFullYear();

          if (d.toString().indexOf(currentYear) === -1) {
            return d.toLocaleString("ru", options).slice(0, -3);
          }

          return d.toLocaleString("ru", currentYearOptions);
        };

        for (var i = 0; i < queries.length; i++) {
          bannerStr += "\n                    <a class=\"pf-query-item\" target=\"_blank\" href=\"".concat(queries[i].link, "\">\n                        <div class=\"pf-query-item-body\">\n                            <span class=\"d-flex justify-content-start align-items-center text-primary fw-500 pb-1\">\n                                <img class=\"mr-2\" src=\"//").concat(cleanSiteLink(queries[i].site), "/favicon.ico\" onerror=\"this.classList.add('pf-favicon-placeholder')\">\n                                ").concat(queries[i].smi_name, "\n                            </span>\n                            ").concat(queries[i].title, "\n                        </div>\n                        <div class=\"pf-query-item-append d-none d-md-inline-block\">\n                            <div class=\"f-xs text-muted mb-1\">\u0414\u043E ").concat(formatDate(queries[i].deadline), "</div>\n                            <div class=\"btn f-xs f-semi btn-sm btn-secondary\">\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C</div>\n                        </div>\n                    </a>");
        }

        queriesSlider.innerHTML = bannerStr;
        $(queriesSlider).slick({
          vertical: true,
          infinite: true,
          dots: false,
          arrows: false,
          slidesToShow: 5,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1500,
          speed: 1500,
          swipeToSlide: true,
          verticalSwiping: true,
          responsive: [{
            breakpoint: 600,
            settings: {
              autoplay: true,
              verticalSwiping: false,
              swipeToSlide: false
            }
          }]
        });
      }
    });
  }
})();