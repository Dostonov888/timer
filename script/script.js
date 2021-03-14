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

    //slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');

        const addDot = () => {
            const portfolioDots = document.querySelector('.portfolio-dots');
            for (let i = 0; i < slide.length; i++) {
                let li = document.createElement('li');
                li.className = 'dot';

                // for (let i = 0; i < li.length; i++) {
                //     li[i].className = li[i].className.addClass('.dot-active', '');
                // }
                if (i === 0) {
                    li.classList.add('dot-active');
                }
                portfolioDots.append(li);
            }
        };
        addDot();


        const btn = document.querySelectorAll('.portfolio-btn'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };


        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };
        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });
        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });
        startSlide(1500);

    };
    slider();

    const team = () => {
        const link = document.querySelectorAll(".description"),
            img = document.querySelectorAll(".command__photo");
        img[0].addEventListener('mouseover', (event) => {
            event.target.src = event.target.dataset.img;
            link[0].textContent = 'Артем Исламов';
        });
        img[0].addEventListener('mouseout', (event) => {
            event.target.src = event.target.src = 'images/command/command-1.jpg';
            link[0].textContent = 'Quentin Tarantino';
        });
        img[1].addEventListener('mouseover', (event) => {
            event.target.src = event.target.dataset.img;
            link[1].textContent = 'Дарья Петрова';
        });
        img[1].addEventListener('mouseout', (event) => {
            event.target.src = event.target.src = 'images/command/command-2.jpg';
            link[1].textContent = 'Parker Posey';
        });
        img[2].addEventListener('mouseover', (event) => {
            event.target.src = event.target.dataset.img;
            link[2].textContent = 'Сергей Кислов';
        });
        img[2].addEventListener('mouseout', (event) => {
            event.target.src = event.target.src = 'images/command/command-3.jpg';
            link[2].textContent = 'Gonzalo Higuaín';
        });
        img[3].addEventListener('mouseover', (event) => {
            event.target.src = event.target.dataset.img;
            link[3].textContent = 'Владимир Янковский';
        });
        img[3].addEventListener('mouseout', (event) => {
            event.target.src = event.target.src = 'images/command/command-4.jpg';
            link[3].textContent = 'Liam Payne';
        });
        img[4].addEventListener('mouseover', (event) => {
            event.target.src = event.target.dataset.img;
            link[4].textContent = 'Екатерина Чазова';
        });
        img[4].addEventListener('mouseout', (event) => {
            event.target.src = event.target.src = 'images/command/command-5.jpg';
            link[4].textContent = 'Bristol Palin';
        });
        img[5].addEventListener('mouseover', (event) => {
            event.target.src = event.target.dataset.img;
            link[5].textContent = 'Максим Лескин';
        });
        img[5].addEventListener('mouseout', (event) => {
            event.target.src = event.target.src = 'images/command/command-6.jpg';
            link[5].textContent = 'Dominic Monaghan';
        });
    };
    team();

    const calc = () => {
        let calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day');

        calcSquare.addEventListener('input', () => {

            if (calcSquare.value.match(/[^0-9]/g)) {
                calcSquare.value = calcSquare.value.replace(/[^0-9]/g, '');
            }
        });
        calcCount.addEventListener('input', () => {

            if (calcCount.value.match(/[^0-9]/g)) {
                calcCount.value = calcCount.value.replace(/[^0-9]/g, '');
            }
        });
        calcDay.addEventListener('input', () => {

            if (calcDay.value.match(/[^0-9]/g)) {
                calcDay.value = calcDay.value.replace(/[^0-9]/g, '');
            }
        });

    };
    calc();

    const formCont = () => {
        let form2Name = document.getElementById('form2-name'),
            form2email = document.getElementById('form2-email'),
            form2phone = document.getElementById('form2-phone'),
            form2message = document.getElementById('form2-message');

        form2Name.addEventListener('input', () => {
            form2Name.value.match(/[а-яa-z ]/gi);
            form2Name.value = form2Name.value.replace(/[^а-яa-z ]/gi, '');
            form2Name.onblur = () => {
                form2Name.value = form2Name.value.replace(/(\s|^)([a-z])/gi, (a) => a.toUpperCase());

            };
        });



        form2message.addEventListener('input', () => {
            form2message.value.match(/[а-яa-z -\s]/gi);
            form2message.value = form2message.value.replace(/[^а-яА-Я -\s]/gi, '');

        });
        form2email.addEventListener('input', () => {
            form2email.value.match(/\w+@\w+\.\w{2,3}/gi);
            form2email.value = form2email.value.replace(/[а-я]/gi, '');
            form2email.onblur = () => {
                if (!form2email.value.includes('@')) {
                    alert('Введите правильный email.');
                    form2email.value = '';
                }
            };

        });
        form2phone.addEventListener('input', () => {
            form2phone.value.match(/\+?[78]([-()]*\d){10}/g);
            form2phone.value = form2phone.value.replace(/([^-()\+])(\D)/g, '');

        });
    };
    formCont();


});