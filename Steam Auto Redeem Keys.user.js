// ==UserScript==
// @name         Steam auto redeem keys
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically confirms Steam key redemptions.
// @author       Elge
// @match        https://store.steampowered.com/account/registerkey?key=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Abort if error is displayed
    if (document.querySelector('#error_display').visible() === true) return;

    // Patch success function to close window
    window.oldOnRegisterProductKeySuccess = window.OnRegisterProductKeySuccess;
    window.OnRegisterProductKeySuccess = function() {
        window.oldOnRegisterProductKeySuccess.apply(this, arguments);
        window.setTimeout(() => window.close(), 5000);
    }

    // Tick checkmark and submit key
    document.getElementById('accept_ssa').checked = true;
    window.RegisterProductKey();
})();
