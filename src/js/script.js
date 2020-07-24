@@include('just-validate.js');
@@include('modal.js');
@@include('burger.js');
@@include('datepicker-full.js');
@@include('swiper-bundle.js');
@@include('flip.js');


window.addEventListener('DOMContentLoaded', function () {

    //burger menu
    if (window.innerWidth < 768) {
        burger.addEventListener('click', () => toggler(burger));
        items.forEach((item, i) => { item.addEventListener('click', () => toggler(item)) });
    };

    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = anchor.getAttribute('href').substr(1)

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }


    //modal
    openBtn.addEventListener('click', () => openAndInject('iframe.html'));
    this.addEventListener('mouseup', e => {
        modal.classList.contains('is-active') && e.target.closest('div') != modalContainer || e.target.closest('button') == closeBtn ? toggleContent('') : false
    });


    //validator

    new window.JustValidate('.form-js', {
        rules: {
            phone: {
                required: true,
                phone: true
            },

            name: {
                required: true,
                minLength: 3,
                maxLength: 20
            },

        }
    });

    //datepicker

    const elem = document.querySelector('input[name="datepicker"]');
    const datepicker = new Datepicker(elem, {
        format: 'dd.mm.yyyy',
    });

    //clock
    var deadline = new Date(Date.parse(new Date()) + 33 * 24 * 60 * 60 * 1000); // for endless timer
    initializeClock('countdown', deadline);

    //QA block with hidden elements
    const plusPannel = document.querySelectorAll('.js-card__pannel--plus'),
        cardElement = document.querySelectorAll('.js-card__element'),
        caption = document.querySelectorAll('.js-caption');

    const remover = (element, mod) => {
        element.classList.remove(mod)
    };

    const adder = (element, mod) => {
        element.classList.add(mod)
    };

    plusPannel.forEach((plus, i) => {

        plus.addEventListener('click', () => {
            plusPannel.forEach(pannel => remover(pannel, 'is-active'));
            cardElement.forEach(card => remover(card, 'is-active'));
            caption.forEach(caption => remover(caption, 'is-active'));

            if (plus = cardElement[i]) {
                adder(cardElement[i], 'is-active')
                adder(plusPannel[i], 'is-active');
                adder(caption[i], 'is-active');
            }
        });
    });


    //swiper

    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 38,
        slidesPerGroup: 1,
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 38,
                slidesPerGroup: 3,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 38,
                slidesPerGroup: 2,
            }

        },
        loop: true,
        grabCursor: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


});
//maps

function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}
