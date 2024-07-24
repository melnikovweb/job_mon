import { disableScroll, visibleScroll } from './disable-scroll';

const popupOpen = (popupWrapp) => {
    popupWrapp.classList.add('open');
    disableScroll();
}

const popupClose = (popupWrapp) => {
    visibleScroll();
    popupWrapp.classList.remove('open');
    popupWrapp.innerHTML = '';
}

const popupToggle = (popupWrapp) => !popupWrapp.classList.contains('open') ? popupOpen(popupWrapp) : popupClose(popupWrapp);

const popupInsertContent = (e, popupWrapp) => {
    const popupContent = e.target.parentNode.querySelector('.sk-popup__content');
    if(popupContent && popupWrapp.classList.contains('open')) popupWrapp.innerHTML = popupContent.innerHTML;
}

export const popupInit = (popupWrapp) => {
    document.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-popup-trigger')) {
            popupToggle(popupWrapp);
            popupInsertContent(e, popupWrapp);
        }
    });

    document.addEventListener('keydown', (e) => {
        if ((e.keyCode || e.which) === 27 && popupWrapp.classList.contains('open')) popupClose(popupWrapp);
    });
}