"use strict";

// All Publications Feed
(function () {
  var featuredWrapper = document.querySelector('.js-pubs-featured');

  if (featuredWrapper) {
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

    var cleanSiteLink = function cleanSiteLink(link) {
      if (link.indexOf('http://') !== -1) {
        return link.slice(7);
      }

      if (link.indexOf('https://') !== -1) {
        return link.slice(8);
      }

      return link;
    };

    var addFeatured = function addFeatured(source, container) {
      fetch(source).then(function (res) {
        return res.json();
      }).then(function (data) {
        var obj = data.data;
        obj.forEach(function (item, i) {
          var date = '';
          var queryStr = 'Запрос';

          if (i === 0) {
            date = '&nbsp;&nbsp;' + formatDate(item.publication_created_at);
            queryStr = 'Как выглядел запрос СМИ <span class="d-none d-sm-inline">для этой публикации</span>';
          }

          var pubsLink = item.publication_link || item.publication_document;
          var el = "\n                            <div class=\"pf-pubs-featured-item\">\n                                <div class=\"d-flex justify-content-start align-items-center mb-2 t-s\">\n                                    <img onerror=\"this.classList.add('pf-favicon-placeholder')\" \n                                    src=\"//".concat(cleanSiteLink(item.smi_site), "/favicon.ico\" alt=\"\">\n                                    <a class=\"fw-800 text-gray-dark ml-2\" href=\"").concat(pubsLink, "\" target=\"_blank\">").concat(item.smi_name, "</a>\n                                    ").concat(date, "\n                                </div>\n                                <h2><a class=\"text-black\" href=\"").concat(pubsLink, "\" target=\"_blank\">").concat(item.publication_title, "</a></h2>\n                                <a class=\"badge-arrow mt-auto mr-sm-3\" href=\"//pressfeed.ru/query/").concat(item.query_id, "\" target=\"_blank\">").concat(queryStr, "</a>\n                            </div>");
          container.insertAdjacentHTML('beforeEnd', el);
        });
      });
    };

    var featuredContainer = featuredWrapper;
    var featuredSource = 'https://api.pressfeed.ru/publications/search?limit=5&smi_is_top=1';
    ; // init

    document.addEventListener('DOMContentLoaded', function () {
      addFeatured(featuredSource, featuredContainer);
    });
  }
})();