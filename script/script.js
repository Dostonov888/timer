

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

            return { timeRemaining, day, hours, minutes, seconds };
        }

        function pensil(n) {
            if (n < 10) { return '0' + n; }
            return n;
        }

        function updateClock() {
            let timer = getTimeRemaining();
            timerHours.textContent = pensil(timer.hours);
            timerMinutes.textContent = pensil(timer.minutes);
            timerSeconds.textContent = pensil(timer.seconds);
            timerDay.textContent = 'До конца акции осталось ' + timer.day + ' дней';
            if (timer.timeRemaining <= 0) {
                clearInterval(timerClock);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                timerDay.textContent = 'Акция  завершена';
            }

        }
        updateClock();

        let timerClock = setInterval(updateClock, 1000);
    }
    countTimer('31 december 2021,00:00:00');



    //menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = document.querySelectorAll('ul>li');

        const handlerMenu = () => {
            if (!menu.style.transform || menu.style.transform === `transform()`) {
                menu.classList.toggle('active-menu');
            }
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        for (let i = 0; i < menuItems; i++) {
            menuItems[i].addEventListener('click', handlerMenu);
        }
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (screen.width < 768) {
                    popup.style.display = 'block';
                } else {
                    let count = 0;
                    let popTimer = setInterval(function () {
                        popup.style.display = 'block';
                        count += 5;
                        popupContent.style.left = count + "px";
                        let center = (document.documentElement.clientWidth / 2) - (popupContent.offsetWidth / 2);
                        if (count > center) {
                            clearInterval(popTimer);
                        }
                    }, 5);
                    console.log(popTimer);
                }
            });
        });

        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopUp();

});


