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
        let timerClock;
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

        timerClock = setInterval(updateClock, 1000);
    }
    countTimer('31 december 2021,00:00:00');



    //menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            if (!menu.style.transform || menu.style.transform === `transform()`) {
                menu.classList.toggle('active-menu');
            }
        };
        menu.addEventListener('click', () => {
            if (event.target.tagName === 'menu') {
                return;
            }
            handlerMenu(event);
        });
        btnMenu.addEventListener('click', handlerMenu);

    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),

            popupContent = document.querySelector('.popup-content');
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (screen.width < 768) {
                    popUp.style.display = 'block';
                } else {
                    let count = 0;
                    let popTimer = setInterval(function () {
                        popUp.style.display = 'block';
                        count += 5;
                        popupContent.style.left = count + "px";
                        let center = (document.documentElement.clientWidth / 2) - (popupContent.offsetWidth / 2);
                        if (count > center) {
                            clearInterval(popTimer);
                        }
                    }, 5);
                }
            });
        });



        popUp.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popUp.style.display = 'none';
                }

            }

        });
    };
    togglePopUp();
    //tab
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {

                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

});