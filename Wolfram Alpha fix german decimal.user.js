// ==UserScript==
// @name         Wolfram Alpha fix german decimal
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Replaces commata with dots when pasting into WolframAlpha!
// @author       You
// @match        https://www.wolframalpha.com
// @match        https://www.wolframalpha.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        var field = document.getElementById('query');
        field.addEventListener('paste', function(event) {
            window.setTimeout(function() {
                field.value = field.value.replace(/,/g, '.');
            }, 10);
        });
    });
})();