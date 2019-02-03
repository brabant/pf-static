// Dynamic header plans link
if (localStorage.token) {
    const plansLink = document.querySelector('a.js-plans-link');
    if (plansLink) {
        plansLink.href = '/plans';
    }
}

// Mobile menu
(function () {
    window.addEventListener('DOMContentLoaded', () => {
        const menuMobBtn = document.getElementById('menu-mob-trigger');
        const menuMob = document.getElementById('menu-mob');

        if (menuMobBtn) {
            menuMobBtn.addEventListener('click', function (e) {
                e.preventDefault();
                this.classList.toggle('is-open');
                menuMob.classList.toggle('is-open');
            });
        }
    });
}());

// Handling queries and publictions on the main page
var publicationsSection = document.querySelector('.js-pb');

if (publicationsSection) {
    $.ajax({
        type: "GET",
        url: 'https://api.pressfeed.ru/publications/search?limit=5&smi_is_top=1',
        success: function (msg) {

            var queries = msg.data;

            var publicationSlider = document.querySelector('.js-slider-publications');
            var publicationHTML = '';

            for (var x = 0; x < queries.length; x++) {

                var mediaName = queries[x].smi_name;
                var queryTitle = queries[x].query_title;
                var queryText = queries[x].query_text.substring(0, 500);
                var queryLink = '//pressfeed.ru/query/' + queries[x].query_id;
                var articleDate = '';
                var articleTitle = queries[x].publication_title;
                var articleLink = queries[x].publication_link;
                var slideIsActive = '';

                function formatDate(date) {
                    var d = new Date(date);
                    var currentYearOptions = {month: 'long', day: 'numeric', year: 'numeric'};
                    return d.toLocaleString("ru", currentYearOptions).slice(0, -3);
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

                if (x === 0) {
                    slideIsActive = 'active';
                }

                publicationHTML += `
                <div class="carousel-item ${slideIsActive}">
                    <div class="row justify-content-center mb-4 mb-sm-6">
                        <div class="col-md-5">
                            <a class="card pf-card-query" target="_blank" href="${queryLink}">
                                <div class="card-header">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <img class="mr-2 js-img-cheking" onerror="this.style.display='none'" src="//${cleanSiteLink(queries[x].smi_site)}/favicon.ico">
                                        <span class="f-semi text-nowrap">${mediaName}</span>
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <span>Запрос</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <h3 class="f-semi t-m mt-2 mb-3">${queryTitle}</h3>
                                    <div>${queryText}</div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-1 d-flex justify-content-center">
                            <i class="material-icons d-block d-md-none my-2 text-danger">arrow_downward</i>
                            <svg class="img-fluid d-none d-md-inline-block" width="124" height="22" viewBox="0 0 124 22"
                         xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <path d="M522.62 169l-5.055-5.055-.026-3.861 11.775 10.853-11.629 10.998-.027-4.1 4.835-4.835h-116.493v-4h116.62z"
                                  id="a"/>
                        </defs>
                        <g transform="translate(-406 -160)" fill="none">
                            <mask>
                                <use xlink:href="#a"/>
                            </mask>
                            <use fill="#FF5252" xlink:href="#a"/>
                        </g>
                    </svg>
                        </div>
                        <div class="col-md-5">
                            <a class="card pf-card-article pf-card-article-${x + 1}" target="_blank" href="${articleLink}">
                                <div class="card-header text-right">
                                    <span class="align-middle">Публикация</span>
                                </div>
                                <div class="card-body">
                                    <div class="t-s pb-2">${formatDate(queries[x].publication_created_at)}</div>
                                    <h3>${articleTitle}</h3>
                                </div>
                                <div class="card-layer"></div>
                            </a>
                        </div>
                    </div>
                </div>`;
            }

            publicationSlider.innerHTML = publicationHTML;

        }
    });
}

// Plans switcher
const planSwitcher = document.querySelector('.js-plan-switcher');
if (planSwitcher) {
    for (let x = 0; x < 3; x++) {
        planSwitcher.getElementsByTagName('a')[x].addEventListener('click', function (e) {
            e.preventDefault();

            planSwitcher.querySelector('.active').classList.remove('active');
            this.classList.add('active');

            let planPrice = document.querySelectorAll('.js-plan-price');
            for (let y = 0; y < planPrice.length; y++) {
                planPrice[y].classList.add('isChanged');
                setTimeout(function () {
                    planPrice[y].classList.remove('isChanged');
                }, 750)
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

        })

    }
}

// Testimonials
(function () {

    const testimonialsBtn = document.querySelector('.js-testimonials-more-button');

    if (testimonialsBtn) {

        const testimonialsContainer = document.querySelector('.js-pf-testimonials-extra');

        const showExtraTestimonials = () => {
            testimonialsContainer.classList.remove('d-none');
            testimonialsBtn.classList.add('d-none');
        };

        testimonialsBtn.addEventListener('click', () => showExtraTestimonials());
    }

})();


// Carousel captions
let bsCarousel = document.querySelector('#slider-features');
if (bsCarousel) {
    let listHowtoItems = document.querySelectorAll('.pf-number-big');
    for (let x = 0; x < listHowtoItems.length; x++) {
        listHowtoItems[x].addEventListener('click', function () {
            $(bsCarousel).carousel('next');
        })
    }
}