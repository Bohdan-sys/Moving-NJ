let openBtn = document.querySelector('.js-button--modal'),
    closeBtn = document.querySelector('.js-button--close'),
    modal = document.querySelector('.js-modal'),
    modalContainer = document.querySelector('.js-modal__container');
// body = document.querySelector('body');

const getData = (url, method) => {
    return fetch(
        url, {
        method,
        method
    }
    ).then(res => res.text())
};

const toggleClass =
    (element, classname) =>
        element.classList.toggle(classname);

const setModalContent =
    string =>
        document
            .querySelector('.js-modal')
            .querySelector('.js-modal__container')
            .querySelector('.js-modal__container--wrapper')
            .innerHTML = string;


const toggleContent = (content) => {
    setModalContent(content)
    toggleClass(modal, 'is-active');
    // toggleClass(body, 'is-active');
};

const openAndInject = (url, method = 'GET') => {
    getData(url, method).then(response => {
        toggleContent(response)
    })
};

window.addEventListener('DOMContentLoaded', function () {
    openBtn.addEventListener('click', () => openAndInject('iframe.html'));
    this.addEventListener('mouseup', e => {
        modal.classList.contains('is-active') && e.target.closest('div') != modalContainer || e.target.closest('button') == closeBtn ? toggleContent('') : false
    });

})

//use in DOM

// openBtn.addEventListener('click', () => openAndInject('iframe.html'));
// closeBtn.addEventListener('click', () => toggleContent(''));
// this.addEventListener('mouseup', e => { e.target == modal ? toggleContent('') : false });