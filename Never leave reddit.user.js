// ==UserScript==
// @name         Never leave reddit
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Require confirmation before leaving reddit page.
// @author       You
// @match        https://www.reddit.com/r/all/
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('beforeunload', function(event){
        event.returnValue = 'Nooooooooo......';
    });
})();
