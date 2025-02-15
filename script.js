document.addEventListener('DOMContentLoaded', () => {
    const horizontScroll1 = document.querySelector('.heating-container-cards');
    const leftBtn1 = document.querySelector('#heating-button-left');
    const rightBtn1 = document.querySelector('#heating-button-right');

    const horizontScroll2 = document.querySelector('.plumbing-container-cards');
    const leftBtn2 = document.querySelector('#plumbing-button-left');
    const rightBtn2 = document.querySelector('#plumbing-button-right');

    const horizontScroll3 = document.querySelector('.bathroom-container-cards');
    const leftBtn3 = document.querySelector('#bathroom-button-left');
    const rightBtn3 = document.querySelector('#bathroom-button-right');

    const horizontScroll4 = document.querySelector('.equipment-container-cards');
    const leftBtn4 = document.querySelector('#equipment-button-left');
    const rightBtn4 = document.querySelector('#equipment-button-right');

    const originalItems1 = [...horizontScroll1.children];
    const originalItems2 = [...horizontScroll2.children];
    const originalItems3 = [...horizontScroll3.children];
    const originalItems4 = [...horizontScroll4.children];

    let gap1 = 0, gap2 = 0, gap3 = 0, gap4 = 0;

    const getScrollStep = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 767) return 225;
        if (screenWidth >= 768 && screenWidth < 1023) return 315;
        if (screenWidth >= 1024 && screenWidth < 1439) return 365;
        if (screenWidth >= 1440 && screenWidth < 1919) return 749;
        return 820; 
    };

    const cloneItems = (horizontScroll, originalItems) => {
        originalItems.forEach((item) => {
            const clone = item.cloneNode(true);
            horizontScroll.appendChild(clone);
        });
    };

    const removeFirstItems = (horizontScroll, originalItems) => {
        for (let i = 0; i < originalItems.length; i++) {
            horizontScroll.removeChild(horizontScroll.firstElementChild);
        }
    };

    const handleScroll = (horizontScroll, originalItems, direction) => {
        const scrollStep = getScrollStep();
        if (direction === 'right') {
            horizontScroll.scrollLeft += scrollStep;

            if (horizontScroll.scrollLeft + horizontScroll.offsetWidth >= horizontScroll.scrollWidth - scrollStep) {
                cloneItems(horizontScroll, originalItems);
            }
        } else if (direction === 'left') {
            horizontScroll.scrollLeft -= scrollStep;

            if (horizontScroll.scrollLeft <= scrollStep) {
                originalItems.forEach((item) => {
                    const clone = item.cloneNode(true);
                    horizontScroll.insertBefore(clone, horizontScroll.firstChild);
                });
                horizontScroll.scrollLeft += scrollStep * originalItems.length; 
            }
        }
    };

    rightBtn1.addEventListener('click', () => gap1 = handleScroll(horizontScroll1, originalItems1, 'right', gap1));
    leftBtn1.addEventListener('click', () => gap1 = handleScroll(horizontScroll1, originalItems1, 'left', gap1));

    rightBtn2.addEventListener('click', () => gap2 = handleScroll(horizontScroll2, originalItems2, 'right', gap2));
    leftBtn2.addEventListener('click', () => gap2 = handleScroll(horizontScroll2, originalItems2, 'left', gap2));

    rightBtn3.addEventListener('click', () => gap3 = handleScroll(horizontScroll3, originalItems3, 'right', gap3));
    leftBtn3.addEventListener('click', () => gap3 = handleScroll(horizontScroll3, originalItems3, 'left', gap3));

    rightBtn4.addEventListener('click', () => gap4 = handleScroll(horizontScroll4, originalItems4, 'right', gap4));
    leftBtn4.addEventListener('click', () => gap4 = handleScroll(horizontScroll4, originalItems4, 'left', gap4));
});

document.addEventListener('DOMContentLoaded', () => {
    const listsPriceButton = document.getElementById('listsPriceButton');
    const listsPricePopup = document.getElementById('listsPricePopup');
    const priceButton = document.getElementById('priceButton'); // Кнопка "CENNIKI"
    const popup = document.getElementById('popup'); // Попап с ценами
    const producersLink = document.getElementById('producers');
    const listsPopup = document.getElementById('listsPopup');
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobilePriceButton = document.getElementById('mobilePriceButton');
    const backToPopup = document.getElementById('backToPopup');
    const backToPopupFromListsPrice = document.getElementById('backToPopupFromListsPrice');
    const backToBurgerMenu = document.querySelector('.menu-price-button-back');

    // ✅ Функция для закрытия всех открытых окон
    function closeAllPopups() {
        popup.style.display = 'none';
        listsPricePopup.style.display = 'none';
        listsPopup.style.display = 'none';
    }

    // ✅ Обработчик клика по бургер-меню
    burgerMenu.addEventListener('click', () => {
        const isAnyPopupOpen =
            popup.style.display === 'block' ||
            listsPricePopup.style.display === 'block' ||
            listsPopup.style.display === 'flex';

        if (isAnyPopupOpen) {
            // Если открыто какое-то окно, просто закрываем его
            closeAllPopups();
        } else {
            // Если ничего не открыто, открываем бургер-меню
            mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
        }
    });

    // ✅ Обработчик клика по кнопке "CENNIKI"
    priceButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const isPopupOpen = popup.style.display === 'block';
        const isOtherPopupOpen =
            listsPricePopup.style.display === 'block' ||
            listsPopup.style.display === 'flex';

        if (isOtherPopupOpen) {
            // Закрываем другие окна перед открытием
            closeAllPopups();
        }

        // Теперь открываем/закрываем CENNIKI (только если оно не было открыто)
        popup.style.display = isPopupOpen ? 'none' : 'block';
    });

    // Toggle price popup from mobile menu
    mobilePriceButton.addEventListener('click', (event) => {
        event.preventDefault();
        closeAllPopups();
        popup.style.display = 'block';
        mobileMenu.style.display = 'none';
    });

    // Toggle "Cenniki do pobrania"
    listsPriceButton?.addEventListener('click', (event) => {
        event.preventDefault();
        closeAllPopups();
        listsPricePopup.style.display = 'block';
    });

    // Toggle "Producers"
    producersLink?.addEventListener('click', (event) => {
        event.preventDefault();
        closeAllPopups();
        listsPopup.style.display = 'flex';
    });

    // Возврат из #listsPopup в #popup
    document.querySelector('.lists-price-button-back')?.addEventListener('click', () => {
        closeAllPopups();
        popup.style.display = 'block';
    });

    backToPopupFromListsPrice?.addEventListener('click', () => {
        closeAllPopups();
        popup.style.display = 'block';
    });

    backToBurgerMenu?.addEventListener('click', () => {
        closeAllPopups();
        mobileMenu.style.display = 'block';
    });

    // Закрытие всех окон при клике вне меню
    document.addEventListener('click', (event) => {
        if (
            !burgerMenu.contains(event.target) &&
            !mobileMenu.contains(event.target) &&
            (!popup || !popup.contains(event.target)) &&
            (!listsPricePopup || !listsPricePopup.contains(event.target)) &&
            (!listsPopup || !listsPopup.contains(event.target))
        ) {
            closeAllPopups();
            mobileMenu.style.display = 'none';
        }
    });

    function showScreen(screenId) {
        // Скрываем все экраны
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Показываем нужный экран
        document.getElementById(screenId).classList.add('active');
    }
});