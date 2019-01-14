"use strict";function guid(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+e()+e()}function getCookie(e){var n=document.cookie.match(new RegExp("(?:^|; )".concat(e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1"),"=([^;]*)")));return n?decodeURIComponent(n[1]):void 0}$(document).ready(function(){for(var e=1;e<=9;e++)!function(){var c="#reg"+e;$(c).on("submit",function(e){e.preventDefault();var n=guid(),t=$(c+" input").val();localStorage.setItem("email_for_reg",t.trim()),localStorage.setItem("hash_for_reg",n);var a=getCookie("utm_source"),s=getCookie("utm_medium"),i=getCookie("utm_campaign"),r=getCookie("utm_content"),o={stage:"email",email:t.trim(),hash:n};a&&(o.utm_source=a),s&&(o.utm_medium=s),i&&(o.utm_campaign=i),r&&(o.utm_content=r),$.ajax({method:"POST",url:"https://api.pressfeed.ru/logs/registration",data:o}).done(function(){window.location.href="/signup"})})}()});var gformArr=document.querySelectorAll(".js-gform");function validEmail(e){return/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e)}function getFormData(e){var n=e,a=n.elements,t=Object.keys(a).filter(function(e){return"honeypot"!==a[e].name}).map(function(e){return void 0!==a[e].name?a[e].name:0<a[e].length?a[e].item(0).name:void 0}).filter(function(e,n,t){return t.indexOf(e)==n&&e}),s={};return t.forEach(function(e){s[e]=a[e].value;var n="";if("checkbox"===a[e].type)n="".concat(n+a[e].checked,", "),s[e]=n.slice(0,-2);else if(a[e].length)for(var t=0;t<a[e].length;t++)a[e].item(t).checked&&(n="".concat(n+a[e].item(t).value,", "),s[e]=n.slice(0,-2))}),s.formDataNameOrder=JSON.stringify(t),s.formGoogleSheetName=n.dataset.sheet||"responses",s.formGoogleSendEmail=n.dataset.email||"",s}function handleFormSubmit(e){e.preventDefault();var n=e.target,t=getFormData(n);if($(n).find("input[type=tel]").val(""),$(n).find("input[type=tel]").attr("placeholder","Заявка отправлена").focus().blur(),t.email&&!validEmail(t.email)){var a=document.getElementById("email-invalid");if(a)return!(a.style.display="block")}else{var s=e.target.action,i=new XMLHttpRequest;i.open("POST",s),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.onreadystatechange=function(){$(".js-modal-form-vp").modal("show"),setTimeout(function(){$(".js-modal-form-vp").modal("hide")},1e4)};var r=Object.keys(t).map(function(e){return"".concat(encodeURIComponent(e),"=").concat(encodeURIComponent(t[e]))}).join("&");i.send(r)}}function loaded(){for(var e=0;e<gformArr.length;e++)gformArr[e].addEventListener("submit",handleFormSubmit,!1)}if(0<gformArr.length&&document.addEventListener("DOMContentLoaded",loaded,!1),localStorage.token){var plansLink=document.querySelector("a.js-plans-link");plansLink&&(plansLink.href="/plans")}$(function(){$('[data-toggle="popover"]').popover()}),$(function(){$('[data-toggle="tooltip"]').tooltip()}),window.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("menu-mob-trigger"),n=document.getElementById("menu-mob");e.addEventListener("click",function(e){e.preventDefault(),this.classList.toggle("is-open"),n.classList.toggle("is-open")})});var publicationsSection=document.querySelector(".js-pb");publicationsSection&&$.ajax({type:"GET",url:"https://api.pressfeed.ru/publications/search?limit=5&smi_is_top=1",success:function(e){for(var n,t,a=e.data,s=document.querySelector(".js-slider-publications"),i="",r=0;r<a.length;r++){var o=a[r].smi_name,c=a[r].query_title,l=a[r].query_text.substring(0,500),u="//pressfeed.ru/query/"+a[r].query_id,d=a[r].publication_title,p=a[r].publication_link,m="";0===r&&(m="active"),i+='\n                <div class="carousel-item '.concat(m,'">\n                    <div class="row justify-content-center mb-4 mb-sm-6">\n                        <div class="col-md-5">\n                            <a class="card pf-card-query" target="_blank" href="').concat(u,'">\n                                <div class="card-header">\n                                    <div class="d-flex justify-content-center align-items-center">\n                                        <img class="mr-2 js-img-cheking" onerror="this.style.display=\'none\'" src="//').concat((t=a[r].smi_site,-1!==t.indexOf("http://")?t.slice(7):-1!==t.indexOf("https://")?t.slice(8):t),'/favicon.ico">\n                                        <span class="f-semi text-nowrap">').concat(o,'</span>\n                                    </div>\n                                    <div class="d-flex justify-content-center align-items-center">\n                                        <span>Запрос</span>\n                                    </div>\n                                </div>\n                                <div class="card-body">\n                                    <h3 class="f-semi t-m mt-2 mb-3">').concat(c,"</h3>\n                                    <div>").concat(l,'</div>\n                                </div>\n                            </a>\n                        </div>\n                        <div class="col-md-1 d-flex justify-content-center">\n                            <i class="material-icons d-block d-md-none my-2 text-danger">arrow_downward</i>\n                            <svg class="img-fluid d-none d-md-inline-block" width="124" height="22" viewBox="0 0 124 22"\n                         xmlns="http://www.w3.org/2000/svg"\n                         xmlns:xlink="http://www.w3.org/1999/xlink">\n                        <defs>\n                            <path d="M522.62 169l-5.055-5.055-.026-3.861 11.775 10.853-11.629 10.998-.027-4.1 4.835-4.835h-116.493v-4h116.62z"\n                                  id="a"/>\n                        </defs>\n                        <g transform="translate(-406 -160)" fill="none">\n                            <mask>\n                                <use xlink:href="#a"/>\n                            </mask>\n                            <use fill="#FF5252" xlink:href="#a"/>\n                        </g>\n                    </svg>\n                        </div>\n                        <div class="col-md-5">\n                            <a class="card pf-card-article pf-card-article-').concat(r+1,'" target="_blank" href="').concat(p,'">\n                                <div class="card-header text-right">\n                                    <span class="align-middle">Публикация</span>\n                                </div>\n                                <div class="card-body">\n                                    <div class="t-s pb-2">').concat((n=a[r].publication_created_at,new Date(n).toLocaleString("ru",{month:"long",day:"numeric",year:"numeric"}).slice(0,-3)),"</div>\n                                    <h3>").concat(d,'</h3>\n                                </div>\n                                <div class="card-layer"></div>\n                            </a>\n                        </div>\n                    </div>\n                </div>')}s.innerHTML=i}});var planSwitcher=document.querySelector(".js-plan-switcher");if(planSwitcher)for(var scroll=new SmoothScroll('a[href*="#"]',{header:"[data-scroll-header]",ignore:"[data-scroll-ignore]",offset:70}),_loop=function(s){planSwitcher.getElementsByTagName("a")[s].addEventListener("click",function(e){e.preventDefault(),planSwitcher.querySelector(".active").classList.remove("active"),this.classList.add("active");for(var n=document.querySelectorAll(".js-plan-price"),t=function(e){n[e].classList.add("isChanged"),setTimeout(function(){n[e].classList.remove("isChanged")},750)},a=0;a<n.length;a++)t(a);0===s?(document.querySelector(".js-plan-1 .js-plan-price").innerHTML='3591 <span class="f-xs">&#8381</span>',document.querySelector(".js-plan-2 .js-plan-price").innerHTML='8910 <span class="f-xs">&#8381</span>',document.querySelector(".js-plan-3 .js-plan-price").innerHTML='25 200 <span class="f-xs">&#8381</span>',document.querySelector(".js-plan-1 .js-plan-note").innerHTML='В месяц при подписке на год<br><span class="text-black">Экономия 4788&nbsp;&#8381</span>',document.querySelector(".js-plan-2 .js-plan-note").innerHTML='В месяц при подписке на год<br><span class="text-black">Экономия 11 880&nbsp;&#8381</span>',document.querySelector(".js-plan-3 .js-plan-note").innerHTML='В месяц при подписке на год<br><span class="text-black">Экономия 33 600&nbsp;&#8381</span>'):1===s?(document.querySelector(".js-plan-1 .js-plan-price").innerHTML='3790 <span class="f-xs">&#8381</span>',document.querySelector(".js-plan-2 .js-plan-price").innerHTML='9405 <span class="f-xs">&#8381</span>',document.querySelector(".js-plan-3 .js-plan-price").innerHTML='26 400 <span class="f-xs">&#8381</span>',document.querySelector(".js-plan-1 .js-plan-note").innerHTML="В месяц при подписке на полгода<br>&nbsp;",document.querySelector(".js-plan-2 .js-plan-note").innerHTML="В месяц при подписке на полгода<br>&nbsp;",document.querySelector(".js-plan-3 .js-plan-note").innerHTML="В месяц при подписке на полгода<br>&nbsp;"):2===s&&(document.querySelector(".js-plan-1 .js-plan-price").innerHTML='3990 <span class="f-xs">&#8381</span>',document.querySelector(".js-plan-2 .js-plan-price").innerHTML='9900 <span class="f-xs">&#8381</span>',document.querySelector(".js-plan-3 .js-plan-price").innerHTML='28 000 <span class="f-xs">&#8381</span>',document.querySelector(".js-plan-1 .js-plan-note").innerHTML="В месяц при подписке на&nbsp;3&nbsp;месяца<br>&nbsp;",document.querySelector(".js-plan-2 .js-plan-note").innerHTML="В месяц при подписке на&nbsp;3&nbsp;месяца<br>&nbsp;",document.querySelector(".js-plan-3 .js-plan-note").innerHTML="В месяц при подписке на&nbsp;3&nbsp;месяца<br>&nbsp;")})},x=0;x<3;x++)_loop(x);!function(){var e=document.querySelector(".js-testimonials-more-button");if(e){var n=document.querySelector(".js-pf-testimonials-extra");e.addEventListener("click",function(){return n.classList.remove("d-none"),void e.classList.add("d-none")})}}();var bsCarousel=document.querySelector("#slider-features");if(bsCarousel){var listHowtoItems=document.querySelectorAll(".pf-number-big");for(x=0;x<listHowtoItems.length;x++)listHowtoItems[x].addEventListener("click",function(){$(bsCarousel).carousel("next")})}function getQueryVariable(e){for(var n=window.location.search.substring(1).split("&"),t=0;t<n.length;t++){var a=n[t].split("=");if(a[0]==e)return a[1]}return!1}var partner=getQueryVariable("partner");partner&&(document.cookie="partner="+partner+"; path=/; expires="+new Date(Date.now()+7776e6).toUTCString());var utm_source=getQueryVariable("utm_source");utm_source&&(document.cookie="utm_source="+utm_source+"; path=/; expires="+new Date(Date.now()+31536e6).toUTCString());var utm_medium=getQueryVariable("utm_medium");utm_medium&&(document.cookie="utm_medium="+utm_medium+"; path=/; expires="+new Date(Date.now()+31536e6).toUTCString());var utm_campaign=getQueryVariable("utm_campaign");utm_campaign&&(document.cookie="utm_campaign="+utm_campaign+"; path=/; expires="+new Date(Date.now()+31536e6).toUTCString());var utm_content=getQueryVariable("utm_content");utm_content&&(document.cookie="utm_content="+utm_content+"; path=/; expires="+new Date(Date.now()+31536e6).toUTCString()),function(){var e=document.querySelector(".js-pubs-featured");if(e){var n=e;document.addEventListener("DOMContentLoaded",function(){var d;d=n,$.ajax({type:"get",url:"https://api.pressfeed.ru/publications/search?limit=5&smi_is_top=1",success:function(e){for(var n,t,a,s,i=e.data,r=0;r<i.length;r++){var o="",c="Запрос";0===r&&(o="&nbsp;&nbsp;"+(t=i[r].publication_created_at,a=void 0,a=new Date(t.replace(/-/g,"/")),s=(new Date).getFullYear(),-1===a.toString().indexOf(s)?a.toLocaleString("ru",{year:"numeric",month:"long",day:"numeric"}).slice(0,-3):a.toLocaleString("ru",{month:"long",day:"numeric"})),c='Как выглядел запрос СМИ <span class="d-none d-sm-inline">для этой публикации</span>');var l=i[r].publication_link||i[r].publication_document,u='\n                            <div class="'.concat(0===r?"col-md-8 ":"col-md-4 ",' mb-4">\n                                <div class="pf-pubs-featured-item ').concat(0===r?" -first":"",'">\n                                    <div class="d-flex justify-content-start align-items-center mb-2 t-s">\n                                        <img onerror="this.classList.add(\'pf-favicon-placeholder\')" \n                                        src="//').concat((n=i[r].smi_site,-1!==n.indexOf("http://")?n.slice(7):-1!==n.indexOf("https://")?n.slice(8):n),'/favicon.ico" alt="">\n                                        <a class="fw-800 text-gray-dark ml-2" href="').concat(l,'" target="_blank">').concat(i[r].smi_name,"</a>\n                                        ").concat(o,'\n                                    </div>\n                                    <h2><a class="text-black" href="').concat(l,'" target="_blank">').concat(i[r].publication_title,'</a></h2>\n                                    <a class="badge-arrow mt-auto mr-sm-3" href="//pressfeed.ru/query/').concat(i[r].query_id,'" target="_blank">').concat(c,"</a>\n                                </div>\n                            </div>");d.insertAdjacentHTML("beforeEnd",u)}}})})}}(),document.querySelector(".js-pubs-wrapper")&&function(){var n=document.querySelector(".js-featured"),t=document.querySelector(".js-pubs"),a="https://api.pressfeed.ru/publications/search?limit=5&smi_is_top=1",l="https://api.pressfeed.ru/publications/search",u=0,d=0,e=document.querySelector(".js-publications-search"),s=e.querySelector("input"),i=e.querySelectorAll(".js-pubs-search-hint"),c=function(e){var n=new Date(e.replace(/-/g,"/")),t=(new Date).getFullYear();return-1===n.toString().indexOf(t)?n.toLocaleString("ru",{year:"numeric",month:"long",day:"numeric"}).slice(0,-3):n.toLocaleString("ru",{month:"long",day:"numeric"})},p=function(e){return-1!==e.indexOf("http://")?e.slice(7):-1!==e.indexOf("https://")?e.slice(8):e},m=function(e,n){var t=n.publication_link||n.publication_document,a='\n            <div class="pf-publication-item">\n                <a class="pf-publication-prepend" href="'.concat(t,'" target="_blank">\n                   <img onerror="this.classList.add(\'pf-favicon-placeholder\')" \n                        src="//').concat(p(n.smi_site),'/favicon.ico" alt="">\n                </a>\n                <a class="pf-publication-body" href="').concat(t,'" target="_blank">\n                    <h2 class="text-black mb-0">').concat(n.publication_title,'</h2>\n                    <span class="t-s fw-600 d-inline-block">').concat(n.smi_name,'</span>\n                    <span class="t-s text-gray-light text-nowrap">').concat(c(n.publication_created_at),'</span>\n                </a>\n                <div class="pf-publication-append">\n                    <a class="badge-arrow" href="https://pressfeed.ru/query/').concat(n.query_id,'" target="_blank">Запрос</a>\n                </div>\n            </div>');e.insertAdjacentHTML("beforeEnd",a)},f=function(e,r,o,n,c){var t=e+"?limit="+o+"&offset="+n+"&match="+c;$.ajax({type:"get",url:t,success:function(e){for(var n,t,a=e.count,s=e.data,i=0;i<s.length;i++)"0"===s[i].smi_is_top&&d<=5&&m(r,s[i]),"1"===s[i].smi_is_top&&d++,5<d&&m(r,s[i]);(u+=o)<a&&(t=c,(n=r).insertAdjacentHTML("beforeEnd",'<div class="text-center p-3 js-add-publications"><a class="btn btn-outline-primary" href="">Еще публикации</a></div>'),n.querySelector(".js-add-publications").addEventListener("click",function(e){e.preventDefault(),this.parentNode.removeChild(this),f(l,n,20,u,t)})),a<1&&(r.innerHTML='\n                    <div class="pf-pubs-empty">\n                        <p>Пока таких публикаций нет. Попробуйте написать другие слова.\n                        <br>Или <a href="https://pressfeed.ru/query/new">добавьте запрос на&nbsp;Pressfeed</a>, \n                        чтобы получить свою публикацию в&nbsp;СМИ</p>\n                    </div>')}})},r=function(e,o){$.ajax({type:"get",url:e,success:function(e){for(var n=e.data,t=0;t<n.length;t++){var a="",s="Запрос";0===t&&(a="&nbsp;&nbsp;".concat(c(n[t].publication_created_at)),s='Как выглядел запрос СМИ <span class="d-none d-sm-inline">для этой публикации</span>');var i=n[t].publication_link||n[t].publication_document,r='\n                            <div class="'.concat(0===t?"col-md-8 ":"col-md-4 ",' mb-4">\n                                <div class="pf-pubs-featured-item ').concat(0===t?" -first":"",'">\n                                    <div class="d-flex justify-content-start align-items-center mb-2 t-s">\n                                        <img onerror="this.classList.add(\'pf-favicon-placeholder\')" \n                                        src="//').concat(p(n[t].smi_site),'/favicon.ico" alt="">\n                                        <a class="fw-800 text-gray-dark ml-2" href="').concat(i,'" target="_blank">').concat(n[t].smi_name,"</a>&nbsp;&nbsp;").concat(a,'\n                                    </div>\n                                    <h2><a class="text-black" href="').concat(i,'" target="_blank">').concat(n[t].publication_title,'</a></h2>\n                                    <a class="badge-arrow mt-auto mr-sm-3" href="//pressfeed.ru/query/').concat(n[t].query_id,'" target="_blank">').concat(s,"</a>\n                                </div>\n                            </div>");o.insertAdjacentHTML("beforeEnd",r)}}})},o=function(e){t.innerHTML="",n.innerHTML="",u=0,e||(d=0,r(a,n)),f(l,t,20,u,e)};document.addEventListener("DOMContentLoaded",function(){r(a,n),f(l,t,20,u,0)}),e.addEventListener("submit",function(e){e.preventDefault(),o(s.value.toLowerCase())});for(var g=function(n){i[n].addEventListener("click",function(e){e.preventDefault(),s.value=i[n].innerText,o(i[n].innerText)})},v=0;v<i.length;v++)g(v)}(),function(){var c=document.querySelector(".js-query-slider");if(c){$.ajax({type:"GET",url:"https://api.pressfeed.ru/external/top-queries",success:function(e){for(var n,t,a,s,i=e.data,r="",o=0;o<i.length;o++)r+='\n                    <a class="pf-query-item" target="_blank" href="'.concat(i[o].link,'">\n                        <div class="pf-query-item-body">\n                            <span class="d-flex justify-content-start align-items-center text-primary fw-500 pb-1">\n                                <img class="mr-2" src="//').concat((s=i[o].site,-1!==s.indexOf("http://")?s.slice(7):-1!==s.indexOf("https://")?s.slice(8):s),'/favicon.ico" onerror="this.classList.add(\'pf-favicon-placeholder\')">\n                                ').concat(i[o].smi_name,"\n                            </span>\n                            ").concat(i[o].title,'\n                        </div>\n                        <div class="pf-query-item-append d-none d-md-inline-block">\n                            <div class="f-xs text-muted mb-1">До ').concat((n=i[o].deadline,t=void 0,t=new Date(n.replace(/-/g,"/")),a=(new Date).getFullYear(),-1===t.toString().indexOf(a)?t.toLocaleString("ru",{year:"numeric",month:"long",day:"numeric"}).slice(0,-3):t.toLocaleString("ru",{month:"long",day:"numeric"})),'</div>\n                            <div class="btn f-xs f-semi btn-sm btn-secondary">Ответить</div>\n                        </div>\n                    </a>');c.innerHTML=r,$(c).slick({vertical:!0,infinite:!0,dots:!1,arrows:!1,slidesToShow:5,slidesToScroll:1,autoplay:!0,autoplaySpeed:1500,speed:1500,swipeToSlide:!0,verticalSwiping:!0,responsive:[{breakpoint:600,settings:{autoplay:!0,verticalSwiping:!1,swipeToSlide:!1}}]})}})}}(),$(document).ready(function(){if(document.querySelector(".js-signup-form")){var r=!1,o=!1;$(".js-signup-tab").click(function(e){$(".js-signup-footer").css("backgroundColor","white"),$(".js-signup-tab").removeClass("is-invalid"),e.target.classList.contains("js-tab-jour")&&(o=!(r=!1),$(".js-pane-jour input").attr("required",!0),$(".js-pane-expert input").attr("required",!1)),e.target.classList.contains("js-tab-expert")&&(o=!(r=!0),$(".js-pane-jour input").attr("required",!1),$(".js-pane-expert input").attr("required",!0))}),$(".js-signup-form").submit(function(e){e.preventDefault();var n="https://api.pressfeed.ru",a=n+"/auth",s={};if($(".js-signup-form .js-input-common").each(function(){s[this.name]=$(this).val()}),r){var t={};$(".js-signup-form .js-input-expert").each(function(){t[this.name]=$(this).val()}),s.companies=[t],t={}}if(o){var i={};$(".js-signup-form .js-input-jour").each(function(){i[this.name]=$(this).val()}),i.id=0,i.geo_id=0,s.smi=[i],i={}}r&&(s.type="expert"),o&&(s.type="journalist"),r||o?($(".js-submit-button").text("Регистрация..."),$.ajax({method:"POST",url:"https://api.pressfeed.ru/registration",headers:{"Current-Version":"v1","Content-Type":"application/json"},data:JSON.stringify(s),dataType:"json",success:function(e){var t;console.log("success:",e),$(".js-submit-button").text("Регистрация готова"),$(".js-signup-form input").val(""),$(".js-signup-message").removeClass("d-flex").addClass("d-none"),t={email:s.email,password:s.password},$.ajax({method:"POST",url:a,headers:{"Current-Version":"v1","Content-Type":"application/json"},data:JSON.stringify(t),dataType:"json",success:function(e){localStorage.setItem("token",JSON.stringify(e.data));var n={myParam:"Рега в кейсе",email:t.email};window.ym(27035592,"reachGoal","RegistrationSuccess",n,console.log("Запрос в Метрику отправлен")),window.location.pathname="/s-hello.html"},error:function(e){console.log("error on login: ",e)}})},error:function(e){$(".js-submit-button").text("Зарегистрироваться"),console.log("error on registration: ",e.responseJSON),$(".js-signup-message").removeClass("d-none").addClass("d-flex"),$(".js-signup-message-text").text(e.responseJSON.message),"Need Captcha"===e.responseJSON.message&&$(".js-signup-message-text").text("Слишком много попыток зарегистрироваться. Попробуйте позже, пожалуйста")}})):$(".js-signup-tab").addClass("is-invalid")});var e=document.querySelector(".js-password-toggle"),n=document.querySelector(".js-password-input"),t=document.querySelector(".js-password-icon");e.addEventListener("click",function(){"password"===n.type?(n.type="text",t.textContent="visibility_off"):(n.type="password",t.textContent="visibility")})}});