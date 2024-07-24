let scrollPosition = 0;

export const disableScroll = () => {
    scrollPosition = window.scrollY;
    document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add('disable-scroll');
};

export const visibleScroll = () => {
    document.body.classList.remove('disable-scroll');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('top');
    window.scrollTo(0, scrollPosition);
};