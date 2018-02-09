// ==UserScript==
// @name         dragonballsuperdub.com list seasons
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Replaces series episode numbers with season episode numbers (i.e. Episode 49 -> Episode S4 E3).
// @author       Elge
// @match        http://ww3.dragonballsuperdub.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    var regex = /(?<!Kai )Episode \d+/;

    $('*:contains("Episode")').contents().filter(function() {
        return this.nodeType == 3 && regex.test(this.textContent);
    }).each(function() {
        var episodeNumber = this.textContent.match(/\d+/)[0];
        var replacement;
        if (episodeNumber <= 14) {
            replacement = "S1 E" + episodeNumber;
        } else if (episodeNumber <= 27) {
            replacement = "S2 E" + (episodeNumber - 14);
        } else if (episodeNumber <= 46) {
            replacement = "S3 E" + (episodeNumber - 27);
        } else if (episodeNumber <= 76) {
            replacement = "S4 E" + (episodeNumber - 46);
        } else {
            replacement = "S5 E" + (episodeNumber - 76);
        }
        this.textContent = this.textContent.replace(episodeNumber, replacement);
    });
})();