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
    //closeBtn.addEventListener('click', () => toggleContent(''));
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






    // const plusCard = document.querySelectorAll('.js-card'),
    const plusPannel = document.querySelectorAll('.js-card__pannel--plus'),
        cardElement = document.querySelectorAll('.js-card__element'),
        caption = document.querySelectorAll('.js-caption');

    plusPannel.forEach((plus, i) => {

        plus.addEventListener('click', () => {
            plusPannel.forEach(pannel => {
                pannel.classList.remove('is-active')
            })
            cardElement.forEach(element => {
                element.classList.remove('is-active')
            })
            caption.forEach(caption => {
                caption.classList.remove('is-active')
            })
            if (plus = cardElement[i]) {
                cardElement[i].classList.add('is-active');
                plusPannel[i].classList.add('is-active');
                caption[i].classList.add('is-active');
            }
        })
    })



    // plusCard.forEach((card, i) => {
    //     card.addEventListener('click', () => {
    //         cardElement.forEach(element => {
    //             element.classList.remove('is-active')
    //         })
    //         plusPannel.forEach(pannel => {
    //             pannel.classList.remove('is-active')
    //         })
    //         caption.forEach(caption => {
    //             caption.classList.remove('is-active')
    //         })
    //         if (card = cardElement[i]) {
    //             cardElement[i].classList.add('is-active');
    //             plusPannel[i].classList.add('is-active');
    //             caption[i].classList.add('is-active');
    //         }
    //     })
    // })

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
