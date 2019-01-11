// All Publications Feed

(function () {

    let pubsWrapper = document.querySelector('.js-pubs-wrapper');

    if (pubsWrapper) {

        let featuredContainer = document.querySelector('.js-featured');
        let publicationsContainer = document.querySelector('.js-pubs');

        let featuredSource = 'https://api.pressfeed.ru/publications/search?limit=5&smi_is_top=1';
        let publicationsSource = 'https://api.pressfeed.ru/publications/search';

        let publicationsLimit = 20;
        let publicationsAdded = 0;
        let topCounter = 0;

        let publicationsSearchForm = document.querySelector('.js-publications-search');
        let publicationsSearchInput = publicationsSearchForm.querySelector('input');
        let pubsSearchHints = publicationsSearchForm.querySelectorAll('.js-pubs-search-hint');

        const formatDate = (date) => {

            let d = new Date(date.replace(/-/g, '/'));
            let options = {year: 'numeric', month: 'long', day: 'numeric'};
            let currentYearOptions = {month: 'long', day: 'numeric'};
            let currentYear = (new Date()).getFullYear();

            if (d.toString().indexOf(currentYear) === -1) {
                return d.toLocaleString("ru", options).slice(0, -3);
            }

            return d.toLocaleString("ru", currentYearOptions);

        };

        const cleanSiteLink = (link) => {
            if (link.indexOf('http://') !== -1) {
                return link.slice(7)
            }
            if (link.indexOf('https://') !== -1) {
                return link.slice(8)
            }
            return link;
        };

        const addMoreBtn = (container, search) => {
            let el = '<div class="text-center p-3 js-add-publications"><a class="btn btn-outline-primary" href="">Еще публикации</a></div>';
            container.insertAdjacentHTML('beforeEnd', el);
            let btn = container.querySelector('.js-add-publications');

            btn.addEventListener('click', function (e) {
                e.preventDefault();
                this.remove();
                addPubs(publicationsSource, container, publicationsLimit, publicationsAdded, search);
            });

        };

        const renderPubsItem = (container, item) => {

            let pubsLink = item.publication_link || item.publication_document;

            let el = `
            <div class="pf-publication-item">
                <a class="pf-publication-prepend" href="${pubsLink}" target="_blank">
                   <img onerror="this.classList.add('pf-favicon-placeholder')" 
                        src="//${cleanSiteLink(item.smi_site)}/favicon.ico" alt="">
                </a>
                <a class="pf-publication-body" href="${pubsLink}" target="_blank">
                    <h2 class="text-black mb-0">${item.publication_title}</h2>
                    <span class="t-s fw-600 d-inline-block">${item.smi_name}</span>
                    <span class="t-s text-gray-light text-nowrap">${formatDate(item.publication_created_at)}</span>
                </a>
                <div class="pf-publication-append">
                    <a class="badge-arrow" href="https://pressfeed.ru/query/${item.query_id}" target="_blank">Запрос</a>
                </div>
            </div>`;
            container.insertAdjacentHTML('beforeEnd', el);
        };

        const addPubs = (source, container, limit, offset, search) => {

            let url = source + '?limit=' + limit + '&offset=' + offset + '&match=' + search;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {

                    let publicationsFetched = data.count;
                    let obj = data.data;
                    for (let i = 0; i < obj.length; i++) {

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
                        console.log(publicationsFetched);
                        container.innerHTML = `
                    <div class="pf-pubs-empty">
                        <p>Пока таких публикаций нет. Попробуйте написать другие слова.
                        <br>Или <a href="https://pressfeed.ru/query/new">добавьте запрос на&nbsp;Pressfeed</a>, 
                        чтобы получить свою публикацию в&nbsp;СМИ</p>
                    </div>`;
                    }

                });
        };

        const addFeatured = (source, container) => {
            fetch(source)
                .then(res => res.json())
                .then((data) => {
                    let obj = data.data;
                    obj.forEach((item, i) => {
                        let date = '';
                        let queryStr = 'Запрос';
                        if (i === 0) {
                            date = `&nbsp;&nbsp;${formatDate(item.publication_created_at)}`;
                            queryStr = `Как выглядел запрос СМИ <span class="d-none d-sm-inline">для этой публикации</span>`;
                        }

                        let pubsLink = item.publication_link || item.publication_document;

                        let el = `
                <div class="pf-pubs-featured-item">
                    <div class="d-flex justify-content-start align-items-center mb-2 t-s">
                        <img onerror="this.classList.add('pf-favicon-placeholder')" 
                        src="//${cleanSiteLink(item.smi_site)}/favicon.ico" alt="">
                        <a class="fw-800 text-gray-dark ml-2" href="${pubsLink}" target="_blank">${item.smi_name}</a>&nbsp;&nbsp;${date}
                    </div>
                    <h2><a class="text-black" href="${pubsLink}" target="_blank">${item.publication_title}</a></h2>
                    <a class="badge-arrow mt-auto mr-sm-3" href="//pressfeed.ru/query/${item.query_id}" target="_blank">${queryStr}</a>
                </div>`;
                        container.insertAdjacentHTML('beforeEnd', el);
                    })
                });
        };

        const searchPubs = (value) => {
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
        };

        // init
        document.addEventListener('DOMContentLoaded', () => {
            addFeatured(featuredSource, featuredContainer);
            addPubs(publicationsSource, publicationsContainer, publicationsLimit, publicationsAdded, 0);
        });

        // search
        publicationsSearchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            searchPubs(publicationsSearchInput.value.toLowerCase());
        });

        // search by hints
        pubsSearchHints.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                publicationsSearchInput.value = item.innerText;
                searchPubs(item.innerText);
            })
        })

    }

})();