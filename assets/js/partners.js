"use strict";

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");

    if (pair[0] == variable) {
      return pair[1];
    }
  }

  return false;
}

var partner = getQueryVariable('partner');

if (partner) {
  document.cookie = 'partner=' + partner + '; path=/; expires=' + new Date(Date.now() + 7776000000).toUTCString();
}

var utm_source = getQueryVariable('utm_source');

if (utm_source) {
  document.cookie = 'utm_source=' + utm_source + '; path=/; expires=' + new Date(Date.now() + 31536000000).toUTCString();
}

var utm_medium = getQueryVariable('utm_medium');

if (utm_medium) {
  document.cookie = 'utm_medium=' + utm_medium + '; path=/; expires=' + new Date(Date.now() + 31536000000).toUTCString();
}

var utm_campaign = getQueryVariable('utm_campaign');

if (utm_campaign) {
  document.cookie = 'utm_campaign=' + utm_campaign + '; path=/; expires=' + new Date(Date.now() + 31536000000).toUTCString();
}

var utm_content = getQueryVariable('utm_content');

if (utm_content) {
  document.cookie = 'utm_content=' + utm_content + '; path=/; expires=' + new Date(Date.now() + 31536000000).toUTCString();
}