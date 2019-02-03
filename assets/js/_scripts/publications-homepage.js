// All Publications Feed

(function () {

        let featuredWrapper = document.querySelector('.js-pubs-featured');

        if (featuredWrapper) {

            let featuredContainer = featuredWrapper;

            function formatDate(date) {

                let d = new Date(date.replace(/-/g, '/'));
                let options = {year: 'numeric', month: 'long', day: 'numeric'};
                let currentYearOptions = {month: 'long', day: 'numeric'};
                let currentYear = (new Date()).getFullYear();

                if (d.toString().indexOf(currentYear) === -1) {
                    return d.toLocaleString("ru", options).slice(0, -3);
                }

                return d.toLocaleString("ru", currentYearOptions);

            }

            function cleanSiteLink(link) {
                if (link.indexOf('http://') !== -1) {
                    return link.slice(7)
                }
                if (link.indexOf('https://') !== -1) {
                    return link.slice(8)
                }
                return link;
            }

            function addFeatured(container) {
                $.ajax({
                    type: 'get',
                    url: 'https://api.pressfeed.ru/publications/search?limit=5&smi_is_top=1',
                    success: function (data) {
                        let obj = data.data;
                        for (let i = 0; i < obj.length; i++) {
                            let date = '';
                            let queryStr = 'Запрос';
                            if (i === 0) {
                                date = '&nbsp;&nbsp;' + formatDate(obj[i].publication_created_at);
                                queryStr = 'Как выглядел запрос СМИ <span class="d-none d-sm-inline">для этой публикации</span>';
                            }

                            let pubsLink = obj[i].publication_link || obj[i].publication_document;

                            let el = `
                            <div class="${i === 0 ? 'col-md-8 ' : 'col-md-4 '} mb-4">
                                <div class="pf-pubs-featured-item ${i === 0 ? ' -first' : ''}">
                                    <div class="d-flex justify-content-start align-items-center mb-2 t-s">
                                        <img onerror="this.classList.add('pf-favicon-placeholder')" 
                                        src="//${cleanSiteLink(obj[i].smi_site)}/favicon.ico" alt="">
                                        <a class="fw-800 text-gray-dark ml-2" href="${pubsLink}" target="_blank">${obj[i].smi_name}</a>
                                        ${date}
                                    </div>
                                    <h2><a class="text-black" href="${pubsLink}" target="_blank">${obj[i].publication_title}</a></h2>
                                    <a class="badge-arrow mt-auto mr-sm-3" href="//pressfeed.ru/query/${obj[i].query_id}" target="_blank">${queryStr}</a>
                                </div>
                            </div>`;

                            container.insertAdjacentHTML('beforeEnd', el);
                        }
                    }
                });
            }

            // init
            document.addEventListener('DOMContentLoaded', () => {
                addFeatured(featuredContainer);
            })

        }

    }
)();