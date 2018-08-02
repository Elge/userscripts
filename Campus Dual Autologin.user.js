// ==UserScript==
// @name         Campus Dual Autologin
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Automatically logs into Campus Dual.
// @author       Elge
// @match        https://selfservice.campus-dual.de*
// @match        https://erp.campus-dual.de/sap/*uri=https*selfservice.campus-dual.de*index*login
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    let url = document.location.href;
    let regex = /^https:\/\/selfservice\.campus-dual\.de/;
    if (regex.test(url)) {
        handleCampusDual();
    } else {
        window.setTimeout(handleSAP, 250);
    }
})();

function handleCampusDual() {
    let url = document.querySelector('#accordion a:nth-child(1)').getAttribute('href');
    document.location.href += url;
}

function handleSAP() {
    let usernamePropertyName = 'campusdual.username';
    let passwordPropertyName = 'campusdual.password';

    let errorBox = document.querySelector('.urMsgBarErrBtm');
    if (errorBox) {
        let errorCode = document.querySelector('.urMsgBarErrBtm').title.match(/(\d+)/)[0];
        if (errorCode == '00200') { // Too many failed logins
            return;
        }
        if (errorCode == '010') { // Bad login/password
            window.alert('Bad username/password, please re-enter your credentials');
            GM_deleteValue(usernamePropertyName);
            GM_deleteValue(passwordPropertyName);
        }
    }
    
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

    document.querySelector('#sap-user').value = username;
    document.querySelector('#sap-password').value = password;
    if (username && password) {
        document.querySelector('#LOGON_BUTTON').click();
    }
}
