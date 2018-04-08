// ==UserScript==
// @name         Steam Login fix page title
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Add " - Steam" at the end of the login page title
// @author       You
// @match        *://store.steampowered.com/login*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    document.title = document.title + ' - Steam';
})();