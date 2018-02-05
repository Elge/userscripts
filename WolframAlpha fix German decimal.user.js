// ==UserScript==
// @name         WolframAlpha fix German decimal
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Replaces commas with dots when pasting into WolframAlpha
// @author       Elge
// @match        *://www.wolframalpha.com
// @match        *://www.wolframalpha.com/*
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