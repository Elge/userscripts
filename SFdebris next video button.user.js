// ==UserScript==
// @name         SFdebris next video button
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Add a Next video button to sfdebris videos.
// @author       You
// @match        http://sfdebris.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let url = $('li > a[href="' + document.location.href + '"]').parent().next().children().attr('href');
    if (url) {
        $('div.vidtitle > h1').append('<a href="' + url + '">&nbsp;&nbsp;&nbsp;&nbsp;Next video</a>');
    }
})();