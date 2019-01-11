// All Publications Feed

(function () {

    let featuredWrapper = document.querySelector('.js-pubs-featured');

    if (featuredWrapper) {

        let featuredContainer = featuredWrapper;

        let featuredSource = 'https://api.pressfeed.ru/publications/search?limit=5&smi_is_top=1';

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

        // init
        document.addEventListener('DOMContentLoaded', () => {
            addFeatured(featuredSource, featuredContainer);
        });

    }

})();