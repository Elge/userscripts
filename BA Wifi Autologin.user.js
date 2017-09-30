// ==UserScript==
// @name         BA Wifi Autologin
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Automatically logs you into BA Wifi.
// @author       Elge
// @match        https://vpn.ba-leipzig.de/cgi-bin/hotspotlogin.cgi*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==

(function() {
    'use strict';
    
    let usernamePropertyName = 'bawifi.username';
    let passwordPropertyName = 'bawifi.password';
    
    let username = GM_getValue(usernamePropertyName);
    let password = GM_getValue(passwordPropertyName);
    if (!username) {
        username = window.prompt('Please enter your username');
        GM_setValue(usernamePropertyName, username);
    }
    if (!password) {
        password = window.prompt('Please enter your password');
        GM_setValue(passwordPropertyName, password);
    }

    document.querySelector('input[name="UserName"]').value = username;
    document.querySelector('input[name="Password"]').value = password;
    if (username && password) {
        document.querySelector('input[name="button"][value="Login"]').click();
    }
})();