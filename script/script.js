window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    //timer
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            timerDay = document.querySelector('.timer-action');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60 % 24),
                day = Math.floor(timeRemaining / 60 / 60 / 24);

            return {
                timeRemaining,
                day,
                hours,
                minutes,
                seconds
            };
        }
        function pensil(n) {
            if (n < 10) { return '0' + n; }
            return n;
        }

        let timer = getTimeRemaining();
        function updateClock() {
            timerHours.textContent = pensil(timer.hours);
            timerMinutes.textContent = pensil(timer.minutes);
            timerSeconds.textContent = pensil(timer.seconds);

            timerDay.textContent = 'До конца акции осталось ' + timer.day + ' дней';
        }
        updateClock();



        const timerClock = setInterval(updateClock => {
            if (timer.timeRemaining <= 1) {
                clearInterval(timerClock);
            }
        }, 1000);

    }
    countTimer('31 december 2021, 00:00:00');
});


