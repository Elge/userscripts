// ==UserScript==
// @name         Steam auto redeem keys
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Automatically confirms Steam key redemptions.
// @author       Elge
// @match        https://store.steampowered.com/account/registerkey?key=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById('accept_ssa').checked = true;
    window.RegisterProductKey();
})();