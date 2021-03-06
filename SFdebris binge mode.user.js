// ==UserScript==
// @name         SFdebris binge mode
// @namespace    http://tampermonkey.net/
// @version      1.7.2
// @description  Makes a few changes to sfdebris to make binge watching easier: The site is expanded so videos fill most of the screen by default, the playlist collapse when clicking their header and adds "Next part" and "Next video" buttons to the videos for fast access.
// @author       Elge
// @match        *://sfdebris.com/videos/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @run-at       document-ready
// ==/UserScript==

(function() {
    'use strict';

    window.sfDscrollTo = function(element) {
        let rect = element.getBoundingClientRect();
        let pos = (rect.top + rect.height / 2) - window.innerHeight / 2;
        console.log('Top: ' + rect.top + '; Height: ' + rect.height + '; Window: ' + window.innerHeight);
        window.scrollBy(0, pos);
    };

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

    // Disable dailymotion up-next autoplay
    if ($('.imgcen iframe').attr('src').indexOf('dailymotion.com') !== -1) {
        $('.imgcen iframe').each(function () {
            $(this).attr('src', $(this).attr('src') + '?queue-enable=false');
        });
    }

    // Mark current video
    $('li > a[href="' + document.location.href + '"]').css('background', '#555');

    // Next part/video button
    let nextVideo = $('li > a[href="' + document.location.href + '"]').parent().next().children();
    let videoheaders = $('div.vidtitle > h1');
    videoheaders.append(function(index) {
        if (index == videoheaders.length - 1) {
            if (nextVideo.length != 0) {
                return $('<a href="' + nextVideo.attr('href') + '" style="float: right">' + 'Next video: ' + nextVideo.text() + '</a>');
            }
        } else {
            return $('<a onclick="window.sfDscrollTo(document.getElementById(\'videoiframe' + (index + 1) + '\'));" style="float: right; cursor: pointer">Next part</a>');
        }
    });
    $('iframe').each(function(index) {
        $(this).attr('id', 'videoiframe' + index);
    });

    $('#main > div > p:nth-child(1)').css({'font-weight':'normal','font-size':'large','color':'white','letter-spacing':'1px;'});

    // Scroll to first video
    window.sfDscrollTo(document.getElementById('videoiframe0'));
})();
