// ==UserScript==
// @name         StpApp add exams
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Writes exams for CS16-2 into StpApp!
// @author       You
// @match        http://stpapp.ba-leipzig.de/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    if (document.querySelector('input[type="text"][name="seminargruppe"]').value !== 'CS16-2') {
        return;
    }

    let exams = [
        {
            subject: 'Datenschutz und Kryptographie',
            short: 'Datenschutz',
            room: 'unbekannt',
            date: new Date('2018-09-19'),
            times: ['480.570', '600.690', '720.810'],
            dateLabel: '19.09.2018 / 09:00 - 12:00'
        },
        {
            subject: 'BWL 2: Rechnungsw. und Investition',
            short: 'BWL',
            room: 'unbekannt',
            date: new Date('2018-09-21'),
            times: ['480.570', '600.690', '720.810'],
            dateLabel: '21.09.2018 / 09:00 - 12:00'
        },
        {
            subject: 'Softwaretechnik u. Projektmanag.',
            short: 'Software',
            room: 'unbekannt',
            date: new Date('2018-09-25'),
            times: ['480.570', '600.690', '720.810'],
            dateLabel: '25.09.2018 / 09:00 - 12:00'
        },
        {
            subject: 'Computernetzw. u Drahtl. Kommun.',
            short: 'Netzwerke',
            room: 'unbekannt',
            date: new Date('2018-09-27'),
            times: ['480.570', '600.690', '720.810'],
            dateLabel: '27.09.2018 / 09:00 - 12:00'
        },
    ];

    for (let i = 0; i < exams.length; i++) {
        let exam = exams[i];
        for (let j = 0; j < exam.times.length; j++) {
            let unixTime = Math.floor(exam.date.getTime() / 1000);
            let div = document.querySelector('td[datum="' + unixTime + '"][zeit="' + exam.times[j] + '"]');
            div.setAttribute('title', exam.subject + '\n' + 'Raum (' + exam.room + ')');
            div.setAttribute('art', 'vorlesung');
            div.setAttribute('raum', exam.room);
            div.setAttribute('pruefung', 1);
            div.setAttribute('style', 'background-color: #F00;');
            div.setAttribute('vorlesung_id', 1);
            div.textContent = exam.short;
            div.addEventListener('click', function(e) {
                e.stopPropagation();
                var bubble = $('#bubble');
                var _this = $(e.target);
                bubble.html(_this.attr('bubble-data'));
                bubble.css( {top: e.pageY - (bubble.height() + 30), left: e.pageX - (bubble.width() / 2)});
                bubble.show();
            }, true);
            div.setAttribute('bubble-data', `
<div>
    <div class="bubble-head">
        ${exam.dateLabel}
    </div>
    <div>
        <div class="context_menu_vorlesung_farbe" style="background-color: #5ebaff;"> </div>
        ${exam.short} [Raum: ${exam.room}]
    </div>
    <div class="bubble-text">
        <div>${exam.subject}</div>
        <div>
            Prüfung
        </div>
    </div>
</div>
`);
        }
    }
})();