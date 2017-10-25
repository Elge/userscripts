// ==UserScript==
// @name         SFdebris binge mode
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Makes a few changes to sfdebris to make binge watching easier: The site is expanded so videos fill most of the screen by default, the playlist collapse when clicking their header and adds "Next part" and "Next video" buttons to the videos for fast access.
// @author       Elge
// @match        http://sfdebris.com/videos/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Unfloat navigation menu
    window.addEventListener('load', function() {
        let nav = $('#nav');
        nav.css('position', 'unset');
        nav.css('top', 'unset');
        nav.css('left', 'unset');
        nav.css('margin', '0 auto');
        $('#header').append(nav);

        // Expand viewport and video player
        $('#wrap').css('width', '90%');
        $('#header').css('background-position', 'center');
        $('#content').css('width', '100%');
        $('#content').css('display', 'table');
        $('#content').css('background-repeat', 'repeat');
        $('#main').css('display', 'table-cell');
        $('#main').css('width', 'initial');
        $('#main').css('float', 'initial');
        $('#sidebar').css('display', 'table-cell');
        $('#sidebar').css('float', 'initial');
        $('.vidtitle').css('background-repeat', 'repeat');
        $('.imgcen iframe').wrap('<div style="width: 100%; padding-bottom: 56.25%; position: relative"><div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; max-height: 100vh" /></div>');
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
            } else if (this.nodeName === 'LI' && header) {
                header.append(this);
            }
        });

        // Mark current video
        $('li > a[href="' + document.location.href + '"]').css('background', '#555');

        // Next part/video button
        let nextVideo = $('li > a[href="' + document.location.href + '"]').parent().next().children();
        let videoheaders = $('div.vidtitle > h1');
        videoheaders.append(function(index) {
            if (index == videoheaders.length - 1) {
                return $('<a href="' + (nextVideo ? nextVideo.attr('href') : '') + '" style="float: right">' + (nextVideo ? 'Next video: ' + nextVideo.text() : '') + '</a>');
            } else {
                return $('<a onclick="window.sfDscrollTo(document.getElementById(\'videoiframe' + (index + 1) + '\'));" style="float: right; cursor: pointer">Next part</a>');
            }
        });
        $('iframe').each(function(index) {
            $(this).attr('id', 'videoiframe' + index);
        });

        // Scroll to first video
        window.sfDscrollTo(document.getElementById('videoiframe0'));
    });

    window.sfDscrollTo = function(element) {
        let rect = element.getBoundingClientRect();
        let pos = (rect.top + rect.height / 2) - window.innerHeight / 2;
        console.log('Top: ' + rect.top + '; Height: ' + rect.height + '; Window: ' + window.innerHeight);
        window.scrollBy(0, pos);
    };
})();
