document.addEventListener('DOMContentLoaded', function () {
    // loader
    const loader = document.getElementById('loader')

    if (loader) {
        if (!loader.classList.contains('loader--hidden')) {
            setTimeout(() => {
                loader.classList.add('loader--hidden')
                document.body.classList.remove('scroll-disabled')
            }, 1000)
        }
    }

    // inputmask
    Inputmask().mask(document.querySelectorAll('input'))

    // height 100vh fix for IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // resize
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    // parallax scroll
    const main = document.getElementById('main')
    const content = document.getElementById('parallax-content')
    const footer = document.getElementById('footer')
    const scrollAnimate = document.getElementById('scroll-animate')
    const scrollAnimateMain = document.getElementById('scroll-animate-main')
    const wrapperParallax = document.querySelector('.wrapper-parallax')
    
    function scrollFooter(scrollY, heightFooter) {
        if (scrollY >= heightFooter) {
            footer.style.bottom = '0px'
        }
        else {
            footer.style.bottom = '-' + heightFooter + 'px'
        }
    }

    if (content) {
        let windowHeight = main.classList.contains('main--md') ? ((window.innerHeight / 1.2) - 10) : ((window.innerHeight / 1.1) - 10)
        console.log(windowHeight)
        let footerHeight = footer.getBoundingClientRect().height
        let heightDocument = windowHeight + (content.getBoundingClientRect().height) + (footer.getBoundingClientRect().height) - 20;

        // Definindo o tamanho do elemento pra animar
        scrollAnimate.style.height = heightDocument + 'px'
        scrollAnimateMain.style.height = heightDocument + 'px'

        // Definindo o tamanho dos elementos main e conteúdo
        if (main) {
            main.style.height = windowHeight + 'px'
            wrapperParallax.style.marginTop = windowHeight - 20 + 'px'
        } else {
            wrapperParallax.style.marginTop = '0px'
        }
            
        scrollFooter(window.scrollY, footerHeight);

        window.addEventListener('scroll', funcName)

        function funcName() {
            var scroll = window.scrollY;
    
            scrollAnimateMain.style.top = '-' + scroll + 'px'
            main ? main.style.backgroundPositionY = 50 - (scroll * 100 / heightDocument) + '%' : 0
    
            scrollFooter(scroll, footerHeight);
        }
    }

    // slides up/down/toggle
    let slideUpQna = (target, duration = 400) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.previousElementSibling.style.pointerEvents = 'none';
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.previousElementSibling.style.pointerEvents = 'auto';
        }, duration);
        target.parentNode.classList.remove('is--open');
    }

    let slideDownQna = (target, duration = 400) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.previousElementSibling.style.pointerEvents = 'none';
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.previousElementSibling.style.pointerEvents = 'auto';
        }, duration);
        target.parentNode.classList.add('is--open');
    }

    let slideToggleQna = (target, duration = 400) => {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDownQna(target, duration);
        } else {
            return slideUpQna(target, duration);
        }
    }
    
    // accordeon
    const accordeonTrigger = document.querySelectorAll('.c-accordeon__trigger')

    if (accordeonTrigger) {
        accordeonTrigger.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (!item.parentNode.classList.contains('is--open')) {
                    slideDownQna(item.nextElementSibling)
                } else {
                    slideUpQna(item.nextElementSibling)
                }
            })
        })
    }

    // textarea
    document.querySelectorAll('textarea').forEach(el => {
        el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
        console.log(el.style.height)
        el.classList.add('auto');
        el.addEventListener('input', e => {
            el.style.height = 'auto';
            el.style.height = (el.scrollHeight) + 'px';
        });
    });
    
    // slim select
    const allSelect = document.querySelectorAll('.select')

    if (allSelect) {
        allSelect.forEach(item => {
            new SlimSelect({
                select: item
            });
        })
    }

    // logotype
    const logotype = document.querySelector('.header__logotype')

    if (logotype && window.innerWidth >= 1024) {
        logotype.addEventListener('mouseenter', () => {
            if (logotype.classList.contains('white')) {
                logotype.classList.remove('white')
                logotype.classList.add('black')
            } else if (logotype.classList.contains('black')) {
                logotype.classList.remove('black')
                logotype.classList.add('green')
            } else if (logotype.classList.contains('green')) {
                logotype.classList.remove('green')
                logotype.classList.add('orange')
            } else if (logotype.classList.contains('orange')) {
                logotype.classList.remove('orange')
                logotype.classList.add('purple')
            } else if (logotype.classList.contains('purple')) {
                logotype.classList.remove('purple')
                logotype.classList.add('white')
            }
        })
    }
    
    // smooth scroll
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // smooth scroll on all links
    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                if (item.getAttribute('href').length > 1) {
                    smoothScroll(item.getAttribute('href').slice(1))
                }
            })
        })
    }

    // aos animations
    AOS.init({
        duration: 700,
        once: true,
    })

    // header nav hover
    const navLinks = document.querySelectorAll('.nav__link')
    const navActiveLink = document.querySelector('.nav__item--active .nav__link')

    if (navLinks && navActiveLink) {
        navLinks.forEach(item => {
            item.addEventListener('mouseover', () => {
                const parent = item.closest('.nav__item')

                if (!parent.classList.contains('nav__item--active')) {
                    navActiveLink.style.borderBottom = '1px solid transparent'
                }
            })
            item.addEventListener('mouseout', () => {
                const header = item.closest('.header')

                if (header.classList.contains('header--white')) {
                    document.querySelector('.nav__item--active .nav__link').style.borderBottom = '1px solid #FFFFFF'
                } else {
                    document.querySelector('.nav__item--active .nav__link').style.borderBottom = '1px solid #000000'
                }
            })
        })
    }

    // tabs
    const tabsItems = document.querySelectorAll('.tabs__item:not(.tabs__item--link)')

    if (tabsItems) {
        tabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.tabs__item').forEach((child) => child.classList.remove('tabs__item--active'))
                document.querySelectorAll('.tabs__wrapper').forEach((child) => child.classList.remove('tabs__wrapper--active'))
    
                item.classList.add('tabs__item--active')
                document.querySelectorAll('.tabs__wrapper')[i].classList.add('tabs__wrapper--active')
            })
        })
    }

    // mobile menu
    const hamburger = document.getElementById('hamburger-toggle')
    const header = document.querySelector('.header')

    if (hamburger && header) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            if (!header.classList.contains('header--active')) {
                hamburger.classList.add('hamburger--active')
                header.classList.add('header--active')
                document.body.classList.add('scroll-disabled')
            } else {
                hamburger.classList.remove('hamburger--active')
                header.classList.remove('header--active')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }

    // popup
    const popupBtn = document.querySelectorAll('.popup-btn')
    const popup = document.querySelectorAll('.popup')
    const popupClose = document.querySelectorAll('.popup__close')
    const popupOverlay = document.querySelectorAll('.popup__overlay')
    
    if (popup && popupBtn && popupClose && popupOverlay) {
        // btn
        popupBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                const popupID = item.dataset.id

                document.querySelectorAll('.popup.popup--active').forEach((child) => child.classList.remove('popup--active'))
                document.getElementById(popupID).classList.add('popup--active')
                document.body.classList.add('scroll-disabled')
            });
        });

        // close
        popupClose.forEach((item) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.popup.popup--active').forEach((child) => child.classList.remove('popup--active'))
                document.body.classList.remove('scroll-disabled')
            });
        });

        // overlay
        popupOverlay.forEach((item) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.popup.popup--active').forEach((child) => child.classList.remove('popup--active'))
                document.body.classList.remove('scroll-disabled')
            })
        });
    }

    // image popup
    const imageOpen = document.querySelectorAll('.img-open')
    const imagePopup = document.querySelector('.img-popup')
    const imagePopupImg = document.querySelector('.img-popup__image img')
    const imagePopupClose = document.querySelector('.img-popup__close')
    const imagePopupOverlay = document.querySelector('.img-popup__overlay')

    if (imageOpen && imagePopup && imagePopupImg && imagePopupOverlay) {
        imageOpen.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                const imgSrc = item.querySelector('img')

                if (!imagePopup.classList.contains('img-popup--active')) {
                    imagePopupImg.src = imgSrc.src
                    imagePopup.classList.add('img-popup--active')
                    document.body.classList.add('scroll-disabled')
                }
            })
        })

        imagePopupClose.addEventListener('click', (event) => {
            event.preventDefault()

            if (imagePopup.classList.contains('img-popup--active')) {
                imagePopup.classList.remove('img-popup--active')
                document.body.classList.remove('scroll-disabled')
            }
        })

        imagePopupOverlay.addEventListener('click', (event) => {
            event.preventDefault()

            if (imagePopup.classList.contains('img-popup--active')) {
                imagePopup.classList.remove('img-popup--active')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }

    // swiper
    const mainSlider = document.querySelector('.main .swiper')
    const mainSliderButtonPrev = document.querySelector('.main .swiper .swiper-button-prev')
    const mainSliderButtonNext = document.querySelector('.main .swiper .swiper-button-next')

    if (mainSlider) {
        const myMainSlider = new Swiper(mainSlider, {
            slidesPerView: 1,
            speed: 800,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
                formatFractionCurrent: function (number) {
                    return '0' + number;
                },
                formatFractionTotal: function (number) {
                    return '0' + number;
                },
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
            on: {
                init: function () {
                    document.querySelector(".swiper-progress-bar").classList.remove("animate");
                    document.querySelector(".swiper-progress-bar").classList.remove("active");
                    document.querySelectorAll(".swiper-progress-bar")[0].classList.add("animate");
                    document.querySelectorAll(".swiper-progress-bar")[0].classList.add("active");
                },
                slideChangeTransitionStart: function () {
                    document.querySelector(".swiper-progress-bar").classList.remove("animate");
                    document.querySelector(".swiper-progress-bar").classList.remove("active");
                    document.querySelectorAll(".swiper-progress-bar")[0].classList.add("active");
                },
                slideChangeTransitionEnd: function () {
                    document.querySelectorAll(".swiper-progress-bar")[0].classList.add("animate");
                }
            }
        });
    }

    // content
    const contentSlider = document.querySelector('.content-slider .swiper')

    if (contentSlider) {
        const myContentSlider = new Swiper(contentSlider, {
            slidesPerView: 3,
            spaceBetween: 36,
            speed: 800,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto'
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // chronology
    const chronologySlider = document.querySelector('.chronology__slider .swiper')

    if (chronologySlider) {
        const myChronologySlider = new Swiper(chronologySlider, {
            slidesPerView: 1,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
        });
    }

    // drinks
    const drinksSlider = document.querySelector('.drinks-slider__slider .swiper')

    if (drinksSlider) {
        const myDrinksSlider = new Swiper(drinksSlider, {
            slidesPerView: 6,
            spaceBetween: 20,
            speed: 800,
            loop: true,
            navigation: {
                nextEl: drinksSlider.closest('.drinks-slider__slider').querySelector('.drinks-slider__btn'),
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 5,
                },
                1200: {
                    slidesPerView: 6,
                }
            }
        });
    }

    // accent block
    const accentBlock = document.querySelector('.accent-block')

    document.addEventListener('mousemove', (event) => {
        if (accentBlock) {
            const x = (event.clientX / window.screen.availWidth) * 360;
            const x2 = (event.clientX / window.screen.availWidth) * 180;
        
            document.querySelector('.accent-block').style.background = `radial-gradient(${x2}% ${x}% at 100% 100%, #E1934B 16.67%, #5AA85A 100%)`;
        }
    });
});