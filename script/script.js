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
        const link = document.querySelector('.command'),
            img = document.querySelectorAll('.command__photo');
        link.addEventListener('mouseover', (event) => {
            let target = event.target;
            img.forEach((item) => {
                let imgSrc = item.src;
                if (target === item) {
                    item.src = item.dataset.img;
                    item.addEventListener('mouseout', () => {
                        item.src = imgSrc;
                    });
                }
            });
        });
    };
    team();

    const calculFunc = () => {
        let cal = document.querySelector('.calc-block'),
            calcItem = document.querySelectorAll('.calc-item');

        cal.addEventListener('input', (event) => {
            let target = event.target;
            if (target.matches('input')) {
                target.value = target.value.replace(/^\D+$/gi, '');
            }
        });

        const checkInputValues = target => {
            target.value = target.value.trim();
            target.value = target.value.replace(/-+/g, '-');
            target.value = target.value.replace(/\s+/g, ' ');
            target.value = target.value.replace(/^-+/g, '');
            target.value = target.value.replace(/-+$/g, '');
        };

        let inPut = document.querySelectorAll("[name = 'user_name']");
        inPut.forEach(item => {
            item.addEventListener('input', event => {

                let target = event.target;
                if (target === item) {

                    target.value = target.value.replace(/[^а-яё ]/gi, '');
                    target.onblur = () => {
                        checkInputValues(target);
                        target.value = target.value.replace(/(\s|^)[а-яё]/gi, (a) => a.toUpperCase());
                    };
                }
            });
        });
        let userEmail = document.querySelectorAll("[name = 'user_email']");
        userEmail.forEach(item => {
            item.addEventListener('input', event => {

                let target = event.target;
                if (target === item) {

                    target.value = target.value.replace(/[^a-z@-_.!~*']/gi, '');
                    target.onblur = () => {

                        checkInputValues(target);
                        if (!target.value.includes('@')) {
                            target.value = '';
                        }
                    };
                }
            });
        });
        let userPhone = document.querySelectorAll("[name = 'user_phone']");
        userPhone.forEach(item => {
            item.addEventListener('input', event => {

                let target = event.target;
                target.value = target.value.replace(/[^\d()-\+]/gi, '');
                target.onblur = () => {
                    checkInputValues(target);
                };

            });
        });
        let form2message = document.getElementById('form2-message');
        form2message.addEventListener('input', () => {
            form2message.value.match(/[а-яё \d\s][._^%$#!~@,-]+/gi);
            form2message.value = form2message.value.replace(/[a-z]/gi, '');

        });



        const calc = (price = 100) => {

            const calcBlock = document.querySelector('.calc-block'),
                calcType = document.querySelector('.calc-type'),
                calcSquare = document.querySelector('.calc-square'),
                calcDay = document.querySelector('.calc-day'),
                calcCount = document.querySelector('.calc-count'),
                totalValue = document.getElementById('total');


            const countSum = () => {
                let total = 0,
                    countValue = 1,
                    dayValue = 1;

                const typeValue = calcType.options[calcType.selectedIndex].value,
                    squareValue = +calcSquare.value;


                if (calcCount.value > 1) {
                    countValue += (calcCount.value - 1) / 10;
                }
                if (calcDay.value && calcDay.value < 5) {
                    dayValue *= 2;
                } else if (calcDay.value && calcDay.value < 10) {
                    dayValue *= 1.5;
                }
                if (typeValue && squareValue) {
                    total = price * typeValue * squareValue * countValue * dayValue;
                }

                totalValue.textContent = total;
            };
            calcBlock.addEventListener('change', (event) => {
                const target = event.target;
                if (target.matches('select') || target.matches('input')) {
                    countSum();
                }
            });
        };
        calc(10);
    };
    calculFunc();



    const sendForm = () => {

        const errorMessage = 'Что то пошло не так...',
            loadMessage = 'загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
        const form = document.querySelectorAll('form');
        const statusMessage = document.createElement('div');
        let popup = document.querySelector('.popup');
        statusMessage.style.cssText = 'font-size: 2rem;';

        form.forEach((item) => {

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(item);

                postData(formData)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error('status network not 200');
                        }
                        statusMessage.textContent = successMessage;

                        let input = item.querySelectorAll('input');
                        input.forEach((item) => {
                            item.value = '';
                        });
                        setTimeout(() => { popup.style.display = 'none'; }, 2000);
                        setTimeout(() => { statusMessage.remove(); }, 5000);
                    })
                    .catch((error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });
            });
        });
        const postData = (formData) => {

            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {

                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve();
                    } else {
                        reject(request.status);
                    }
                });
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(formData));
            });
        };
        sendForm();

    };
});