// ==UserScript==
// @name         IMDB additional watch
// @namespace    http://tampermonkey.net/
// @version      1
// @description  try to take over the world!
// @author       You
// @match        https://www.imdb.com/title/*
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    let urlPropertyName = 'imdb.aw.url';
    let labelPropertyName = 'imdb.aw.label';

    $(document).ready(function() {
        let url = GM_getValue(urlPropertyName);
        if (!url) {
            url = window.prompt('Please enter the url');
            GM_setValue(urlPropertyName, url);
        }
        let label = GM_getValue(labelPropertyName);
        if (!label) {
            label = window.prompt('Please enter the label');
            GM_setValue(labelPropertyName, label);
        }

        let id = /^https?:\/\/www.imdb.com\/title\/(tt[^\/]+)\/?.*/.exec(location.href)[1];
        url += '/search.php?search_keywords=' + id + '&search_terms=all&search_forum=4,57,88&search_fields=msgonly';

        $('div.showtime.full-table').append('<div title="On WarezBB" class="watch-option secondary-watch-option" data-href="' + url + '">'
                                            + '<div class="watch-icon tv"></div>'
                                            + '<div class="secondary-info">ON&nbsp;' + label + '</div>'
                                            + '</div>');
    });
})();