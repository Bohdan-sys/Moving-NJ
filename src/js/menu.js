const toggle = (menu) => {
    menu.body.classList.toggle('is-active')
}
const remove = (menu) => {
    menu.body.classList.remove('is-active')
}
const makeMenu = () => {
    return [...document.getElementsByClassName('js-menu')].map(wrapper => {
        return {
            wrapper: wrapper,
            activator: wrapper.getElementsByClassName('js-menu__activator')[0],
            body: wrapper.getElementsByClassName('js-menu__body')[0],
        }
    })
}

const assignListeners = (wrapper) => {

    if (window.innerWidth < 768) {
        wrapper.activator.addEventListener('click', () => {
            toggle(wrapper)

        })
        wrapper.body.addEventListener('click', () => {
            console.log('here')
            remove(wrapper)
        })

        window.addEventListener('mouseup', (e) => {
            if (e.target !== wrapper) {
                remove(wrapper)
            }
        });
    } else {
        wrapper.wrapper.addEventListener('mouseenter', () => toggle(wrapper))
        wrapper.wrapper.addEventListener('mouseleave', () => remove(wrapper))

        wrapper.wrapper.addEventListener('click', () => remove(wrapper))
    }
}
// function call

// window.addEventListener('DOMContentLoaded', function () {
//     const menus = makeMenu()
//     menus.forEach(menu => assignListeners(menu))
// })