export const headerHeight = () => {
    const r = document.querySelector(':root');
    const headerHeight = document.querySelector("header.header")?.offsetHeight;
    r.style.setProperty('--sk-header-height', `${headerHeight}px`);
}

export const accordionHeaderHeight = () => {
    const r = document.querySelector(':root');
    const accordionHeaderHeight = document.querySelector(".strategy-accordion__header")?.offsetHeight;
    r.style.setProperty('--sk-accordion-header-height', `${accordionHeaderHeight}px`);
}
