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
                hours = Math.floor((timeRemaining / 60 / 60) / 1000),
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

        function updateClock() {
            let timer = getTimeRemaining();


            if (timer.timeRemaining <= 1) {
                clearInterval(timerClock);
            }

            timerHours.textContent = pensil(timer.hours);
            timerMinutes.textContent = pensil(timer.minutes);
            timerSeconds.textContent = pensil(timer.seconds);

            timerDay.textContent = 'До конца акции осталось ' + timer.day + ' дней';

        }
        updateClock();
        const timerClock = setInterval(updateClock, 1000);

    }
    countTimer('2 march 2021,21:59:00');



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
                    console.log(popTimer);
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
                    tabContent[i].classList.add('d-none');
                    tabContent[i].classList.remove('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            tab.forEach((item, i) => {
                if (item === target) {
                    toggleTabContent(i);
                }
            });
        });
    };

});