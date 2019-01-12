"use strict";

// All Publications Feed
(function () {
  var pubsWrapper = document.querySelector('.js-pubs-wrapper');

  if (pubsWrapper) {
    var featuredContainer = document.querySelector('.js-featured');
    var publicationsContainer = document.querySelector('.js-pubs');
    var featuredSource = 'https://api.pressfeed.ru/publications/search?limit=5&smi_is_top=1';
    var publicationsSource = 'https://api.pressfeed.ru/publications/search';
    var publicationsLimit = 20;
    var publicationsAdded = 0;
    var topCounter = 0;
    var publicationsSearchForm = document.querySelector('.js-publications-search');
    var publicationsSearchInput = publicationsSearchForm.querySelector('input');
    var pubsSearchHints = publicationsSearchForm.querySelectorAll('.js-pubs-search-hint');

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

    var addMoreBtn = function addMoreBtn(container, search) {
      var el = '<div class="text-center p-3 js-add-publications"><a class="btn btn-outline-primary" href="">Еще публикации</a></div>';
      container.insertAdjacentHTML('beforeEnd', el);
      var btn = container.querySelector('.js-add-publications');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        this.remove();
        addPubs(publicationsSource, container, publicationsLimit, publicationsAdded, search);
      });
    };

    var renderPubsItem = function renderPubsItem(container, item) {
      var pubsLink = item.publication_link || item.publication_document;
      var el = "\n            <div class=\"pf-publication-item\">\n                <a class=\"pf-publication-prepend\" href=\"".concat(pubsLink, "\" target=\"_blank\">\n                   <img onerror=\"this.classList.add('pf-favicon-placeholder')\" \n                        src=\"//").concat(cleanSiteLink(item.smi_site), "/favicon.ico\" alt=\"\">\n                </a>\n                <a class=\"pf-publication-body\" href=\"").concat(pubsLink, "\" target=\"_blank\">\n                    <h2 class=\"text-black mb-0\">").concat(item.publication_title, "</h2>\n                    <span class=\"t-s fw-600 d-inline-block\">").concat(item.smi_name, "</span>\n                    <span class=\"t-s text-gray-light text-nowrap\">").concat(formatDate(item.publication_created_at), "</span>\n                </a>\n                <div class=\"pf-publication-append\">\n                    <a class=\"badge-arrow\" href=\"https://pressfeed.ru/query/").concat(item.query_id, "\" target=\"_blank\">\u0417\u0430\u043F\u0440\u043E\u0441</a>\n                </div>\n            </div>");
      container.insertAdjacentHTML('beforeEnd', el);
    };

    var addPubs = function addPubs(source, container, limit, offset, search) {
      var url = source + '?limit=' + limit + '&offset=' + offset + '&match=' + search;
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        var publicationsFetched = data.count;
        var obj = data.data;

        for (var i = 0; i < obj.length; i++) {
          if (obj[i].smi_is_top === '0' && topCounter <= 5) {
            renderPubsItem(container, obj[i]);
          }

          if (obj[i].smi_is_top === '1') {
            topCounter++;
          }

          if (topCounter > 5) {
            renderPubsItem(container, obj[i]);
          }
        }

        publicationsAdded += limit;

        if (publicationsFetched > publicationsAdded) {
          addMoreBtn(container, search);
        }

        if (publicationsFetched < 1) {
          container.innerHTML = "\n                    <div class=\"pf-pubs-empty\">\n                        <p>\u041F\u043E\u043A\u0430 \u0442\u0430\u043A\u0438\u0445 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0439 \u043D\u0435\u0442. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u0441\u043B\u043E\u0432\u0430.\n                        <br>\u0418\u043B\u0438 <a href=\"https://pressfeed.ru/query/new\">\u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430&nbsp;Pressfeed</a>, \n                        \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u0432\u043E\u044E \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044E \u0432&nbsp;\u0421\u041C\u0418</p>\n                    </div>";
        }
      });
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
            date = "&nbsp;&nbsp;".concat(formatDate(item.publication_created_at));
            queryStr = "\u041A\u0430\u043A \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u043B \u0437\u0430\u043F\u0440\u043E\u0441 \u0421\u041C\u0418 <span class=\"d-none d-sm-inline\">\u0434\u043B\u044F \u044D\u0442\u043E\u0439 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438</span>";
          }

          var pubsLink = item.publication_link || item.publication_document;
          var el = "\n                <div class=\"pf-pubs-featured-item\">\n                    <div class=\"d-flex justify-content-start align-items-center mb-2 t-s\">\n                        <img onerror=\"this.classList.add('pf-favicon-placeholder')\" \n                        src=\"//".concat(cleanSiteLink(item.smi_site), "/favicon.ico\" alt=\"\">\n                        <a class=\"fw-800 text-gray-dark ml-2\" href=\"").concat(pubsLink, "\" target=\"_blank\">").concat(item.smi_name, "</a>&nbsp;&nbsp;").concat(date, "\n                    </div>\n                    <h2><a class=\"text-black\" href=\"").concat(pubsLink, "\" target=\"_blank\">").concat(item.publication_title, "</a></h2>\n                    <a class=\"badge-arrow mt-auto mr-sm-3\" href=\"//pressfeed.ru/query/").concat(item.query_id, "\" target=\"_blank\">").concat(queryStr, "</a>\n                </div>");
          container.insertAdjacentHTML('beforeEnd', el);
        });
      });
    };

    var searchPubs = function searchPubs(value) {
      publicationsContainer.innerHTML = '';
      featuredContainer.innerHTML = '';
      publicationsAdded = 0;

      if (value) {
        addPubs(publicationsSource, publicationsContainer, publicationsLimit, publicationsAdded, value);
      } else {
        topCounter = 0;
        addFeatured(featuredSource, featuredContainer);
        addPubs(publicationsSource, publicationsContainer, publicationsLimit, publicationsAdded, value);
      }
    }; // init


    document.addEventListener('DOMContentLoaded', function () {
      addFeatured(featuredSource, featuredContainer);
      addPubs(publicationsSource, publicationsContainer, publicationsLimit, publicationsAdded, 0);
    }); // search

    publicationsSearchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      searchPubs(publicationsSearchInput.value.toLowerCase());
    }); // search by hints

    pubsSearchHints.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        publicationsSearchInput.value = item.innerText;
        searchPubs(item.innerText);
      });
    });
  }
})();