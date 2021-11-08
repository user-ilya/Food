'use strict'
window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items'); 

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active')
        })
    }
    function showTabContent (idx = 0) {
        tabsContent[idx].classList.add('show', 'fade')
        tabsContent[idx].classList.remove('hide')
        tabs[idx].classList.add('tabheader__item_active')
    }    
    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, idx) => {
                if (target === item) {
                    hideTabContent()
                    showTabContent(idx)
                }
            })
        }
    })
    // Timer
    const deadline = '2022-09-27';

    function getTimeRemaining (lasttime) {
        const t = Date.parse(lasttime) - Date.parse(new Date()),
            days = Math.floor(t/(1000 * 60 * 60 * 24)),
            hours = Math.floor((t/(1000 * 60 * 60) % 24)),
            minutes = Math.floor((t/(1000 * 60) % 60)),
            seconds = Math.floor((t/1000) % 60)  
        return  {
            t,
            days,
            hours,
            minutes,
            seconds
        } 
    }
    function setTimer (selector, lasttime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              isTimer = setInterval(updateTimer, 1000)

            updateTimer()

        function updateTimer () {
            const total = getTimeRemaining(lasttime)
            

            days.innerHTML = zeroTimer(total.days);
            hours.innerHTML = zeroTimer(total.hours);
            minutes.innerHTML = zeroTimer(total.minutes);
            seconds.innerHTML = zeroTimer(total.seconds);

            if ( total.t <= 0) {
                clearInterval(isTimer)
                zeroTimer()
            }
        }
    }
    function zeroTimer (num) {
        if (num < 10) {
            return `0${num}`
        } 
        return num
    }
    setTimer('.timer', deadline)

    // Modal 
    const btnModalOpen = document.querySelectorAll('[data-modal]'),
          btnModalClose = document.querySelector('[data-close]'),
          windowModal = document.querySelector('.modal');
          

    function closeModal () {
        windowModal.classList.remove('modal_active')
        document.body.style.overflow = 'auto'
    }
    function openModal () {
        windowModal.classList.add('modal_active')
        document.body.style.overflow = 'hidden'
        // clearInterval(openModalTime)
    }

    function showModalTab () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalTab)
        } 
        
    }

    btnModalOpen.forEach((item) => {
        item.addEventListener('click', openModal)
    });
    btnModalClose.addEventListener('click', closeModal)
    windowModal.addEventListener('click', (e) => {
        if (e.target === windowModal) {
            closeModal()
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && windowModal.classList.contains('modal_active')) {
            closeModal()

        }
    })


    window.addEventListener('scroll', showModalTab)
    // const openModalTime = setTimeout(openModal, 10000)
})

// class Menu

class MenuCard {
    constructor(src, title, descr, price, alt, parentSelector, ...classes) {
        this.src = src;
        this.title = title; 
        this.descr = descr;
        this.price = price;
        this.alt = alt;
        this.dollar = 75;
        this.parentItem = document.querySelector(parentSelector);
        this.classes = classes;
        this.changeToRub();
    } 
    changeToRub() {
        this.price = this.dollar * this.price
    }

    render () {
        const card = document.createElement('div');
        if (this.classes = []) {this.classes = ['menu__item']}
        this.classes.forEach((className) => card.classList.add(className))
        card.innerHTML = `
                <img src=${this.src} alt="vegy">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
        `
        this.parentItem.append(card)
    }
}
new MenuCard('img/tabs/vegy.jpg', 
              'Меню "Фитнес"',
              'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
               8,
              'products',
              '.menu__field .container'
).render()
