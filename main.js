const validEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

function validationForm(){
    const input = document.querySelector('.footer__input')
    const btn = document.querySelector('.footer__button')
    const modal = document.querySelector('.modal')
    const modalWindow = document.querySelector('.modal__message')
    const modalTitle = document.querySelector('.modal__text')
    const modalDesc = document.querySelector('.modal__description')

    btn.onclick = (e) => {
        e.preventDefault()

        if(validEmail.test(input.value)){
            btn.removeAttribute('disable', true)
        
            const requestURL = '/index.html';

            const xhr = new XMLHttpRequest();
            xhr.open('GET', requestURL);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    modal.classList.add('modal__open')
                    modalWindow.classList.add('modal__message--active')
                    modalTitle.innerHTML = 'Success!'
                    modalTitle.style.textTransform = 'uppercase'
                    modalDesc.innerHTML = 'You have successfully subscribed to the email newsletter'
                }else if(xhr.status >= 400){
                    modal.classList.add('modal__open')
                    modalTitle.innerHTML = 'Error!'
                    modalTitle.style.textTransform = 'uppercase'
                    modalDesc.innerHTML = 'You have error subscribed to the email newsletter'
                }
            }
            xhr.send();
        }else{
            btn.setAttribute('disable', true)
        }
    }
        
        input.onblur = () => {
            if (!validEmail.test(input.value)) { 
                input.parentElement.classList.add('footer__search--error');
                btn.setAttribute('disable', true)
            }else{
                input.parentElement.classList.remove('footer__search--error');
                btn.setAttribute('disable', false)
            }
        }
}

function closeModalWindow(){
    const modal = document.querySelector('.modal')
    const modalWindow = document.querySelector('.modal__message')
    const modalBtn = document.querySelector('.modal__button')
    const modalCross = document.querySelector('.modal__cross')
    const input = document.querySelector('.footer__input')

    modalBtn.addEventListener('click', () => {
        modal.classList.remove('modal__open')
        modalWindow.classList.remove('modal__open--active')
        input.value = ''
    })

    modalCross.addEventListener('click', () => {
        modal.classList.remove('modal__open')
        modalWindow.classList.remove('modal__message--active')
        input.value = ''
    })
}

function scrollEvents(){
    const addEventWindowBtn = document.querySelector('.event__link')
    const eventArror = document.querySelector('.event__arrow')
    const eventWindow = document.querySelector('.events__container')

    addEventWindowBtn.addEventListener('click', () => {
        eventArror.style.transform = 'rotate(270deg)'
        setTimeout(() => eventArror.style.transform = 'rotate(90deg)', 2000)
    
        eventWindow.style.cssText = `
            height: 100vh;
            display: flex;
            flex-direction: column;
        `

        window.scrollTo({
            top: document.body.clientHeight,
            left: 0,
            behavior: "smooth"
        })
    })
}

function accordionSwitch(){
    document.querySelectorAll('.accordion__image').forEach(item => {
        item.addEventListener('click', () => {

            let child = item.nextElementSibling
            console.log(item)

            if(!child.classList.contains('accordion__description--active')){
                document.querySelectorAll('.accordion__description').forEach(item => item.classList.remove('accordion__description--active'))
                document.querySelectorAll('.accordion__item').forEach(item => item.classList.remove('accordion__item--active'))
                document.querySelectorAll('.accordion__image').forEach(item => item.classList.remove('accordion__image--active'))
                child.classList.add('accordion__description--active')
                item.parentElement.classList.add('accordion__item--active')
            }
            if(!item.classList.contains('accordion__image--active')){
                item.classList.add('accordion__image--active')
            }
        })
    })
}

function timer(){
    setInterval(() => {
        const days = document.querySelector('.days__number')
        const hours = document.querySelector('.hours__number')
        const minutes = document.querySelector('.minutes__number')
        const seconds = document.querySelector('.seconds__number')

        const currDate = new Date().getTime()
        const givenDate = new Date("2023-05-31").getTime()

        let changeDate = givenDate - currDate

        if(changeDate >=0){
            let remaindays = Math.floor(changeDate / (1000 * 60 * 60 * 24));
            let remainhours = Math.floor((changeDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let remainmins = Math.floor((changeDate % (1000 * 60 * 60)) / (1000 * 60));
            let remainsecs = Math.floor((changeDate % (1000 * 60)) / 1000);

            days.innerHTML = ("0"+ remaindays).slice(-2)
            hours.innerHTML = ("0"+ remainhours).slice(-2)
            minutes.innerHTML = ("0"+ remainmins).slice(-2)
            seconds.innerHTML = ("0"+ remainsecs).slice(-2)
        }

    }, 1000)
 
}

function render(){
    validationForm()
    scrollEvents()
    accordionSwitch()
    timer()
    closeModalWindow()
}

render()