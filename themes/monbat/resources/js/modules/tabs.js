export const tabsInit = ( ) => {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tabs-block__button') && !e.target.classList.contains('active')) {
            e.target.closest('.tabs-block')?.querySelector('.tabs-block__button.active')?.classList.remove('active');
            e.target.classList.add('active');

            e.target.closest('.tabs-block').querySelector('.tabs-block__item.active')?.classList.remove('active');
            e.target.closest('.tabs-block').querySelector(`[data-panel="${ e.target.dataset.tab }"]`)?.classList.add('active');
        }
    } )
}
