// ==UserScript==
// @name         Hide unrated games on metacritic new releases
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hide games with neither critic nor user review scores from the new releases games list.
// @author       Elge
// @match        https://www.metacritic.com/browse/games/release-date/new-releases/pc/date*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    $('table.clamp-list tr:not(.spacer)')
        .filter(function(index) {return $('div.clamp-metascore .tbd', this).length === 1;})
        .filter(function(index) {return $('div.clamp-userscore .tbd', this).length === 1;})
        .hide()
        .next('.spacer')
        .hide();

    $('.browse_list_wrapper')
        .css('border', '0')
        .css('padding-top', '0');
})();
