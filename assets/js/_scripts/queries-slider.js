// Queries on the main page

(function () {

    let queriesSlider = document.querySelector('.js-query-slider');

    if (queriesSlider) {

        function cleanSiteLink(link) {
            if (link.indexOf('http://') !== -1) {
                return link.slice(7)
            }
            if (link.indexOf('https://') !== -1) {
                return link.slice(8)
            }
            return link;
        }

        $.ajax({
            type: "GET",
            url: "https://api.pressfeed.ru/external/top-queries",
            success: function (data) {
                var queries = data.data;
                var bannerStr = '';

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

                for (var i = 0; i < queries.length; i++) {
                    bannerStr += `
                    <a class="pf-query-item" target="_blank" href="${queries[i].link}">
                        <div class="pf-query-item-body">
                            <span class="d-flex justify-content-start align-items-center text-primary fw-500 pb-1">
                                <img class="mr-2" src="//${cleanSiteLink(queries[i].site)}/favicon.ico" onerror="this.classList.add('pf-favicon-placeholder')">
                                ${queries[i].smi_name}
                            </span>
                            ${queries[i].title}
                        </div>
                        <div class="pf-query-item-append d-none d-md-inline-block">
                            <div class="f-xs text-muted mb-1">До ${formatDate(queries[i].deadline)}</div>
                            <div class="btn f-xs f-semi btn-sm btn-secondary">Ответить</div>
                        </div>
                    </a>`;
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
                    responsive: [
                        {
                            breakpoint: 600,
                            settings: {
                                autoplay: true,
                                verticalSwiping: false,
                                swipeToSlide: false,
                            },
                        }],
                });

            }
        });
    }

})();