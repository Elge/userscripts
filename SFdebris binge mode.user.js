// ==UserScript==
// @name         SFdebris binge mode
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Makes a few changes to sfdebris to make binge watching easier: The site is expanded so videos fill most of the screen by default, the playlist collapse when clicking their header and adds "Next part" and "Next video" buttons to the videos for fast access.
// @author       Elge
// @match        http://sfdebris.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Unfloat navigation menu
    let nav = $('#nav');
    nav.css('position', 'initial');
    nav.css('top', 'initial');
    nav.css('left', 'initial');
    nav.css('margin', 'initial');
    $('#header').append(nav);

    // Expand viewport and video player
    $('#wrap').css('width', '90%');
    $('#content').css('display', 'table');
    $('#content').css('background-repeat', 'repeat');
    $('#main').css('display', 'table-cell');
    $('#main').css('width', 'initial');
    $('#main').css('float', 'initial');
    $('#sidebar').css('display', 'table-cell');
    $('#sidebar').css('float', 'initial');
    $('.vidtitle').css('background-repeat', 'repeat');
    $('.imgcen iframe').wrap('<div style="width: 100%; padding-bottom: 56.25%; position: relative"><div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0" /></div>');
    $('.imgcen iframe').css('width', '100%');
    $('.imgcen iframe').css('height', '100%');

    // Collapse/expand playlist
    let header;
    $('.ep').children().each(function(index) {
        if (this.nodeName === 'H6') {
            header = $('<div id="sfdcoll' + index + '"/>');

            $(this).wrap('<div />');
            $(this).parent().append(header);

            this.onclick = function() { $('#sfdcoll' + index).toggle(); };
            this.style.cursor = 'pointer';
        } else if (this.nodeName === 'LI') {
           header.append(this);
        }
    });

    // Mark current video
    $('li > a[href="' + document.location.href + '"]').css('background', '#555');

    // Next part/video button
    let url = $('li > a[href="' + document.location.href + '"]').parent().next().children().attr('href');
    let videoheaders = $('div.vidtitle > h1');
    videoheaders.append(function(index) {
        if (index == videoheaders.length - 1) {
            if (url) {
                return $('<a id="videoheader' + index + '" href="' + url + '" style="float: right">Next video</a>');
            }
        } else {
            return $('<a id="videoheader' + index + '" onclick="document.getElementById(\'videoheader' + (index + 1) + '\').scrollIntoView();" style="float: right; cursor: pointer">Next part</a>');
        }
    });

    // Scroll to first video
    document.getElementById('videoheader0').scrollIntoView();
})();
