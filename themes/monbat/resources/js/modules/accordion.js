export const accordionInit = ( ) => {
  const toggleButtonOpen = (accordionToggleAll) => {
    accordionToggleAll.dataset.state = 'true';
    accordionToggleAll.innerHTML = accordionToggleAll.dataset.close;
  }

  const toggleButtonClose = (accordionToggleAll) => {
    accordionToggleAll.dataset.state = 'false';
    accordionToggleAll.innerHTML = accordionToggleAll.dataset.open;
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('accordion__title')) {
        const accordionItem = e.target.parentNode;
        const accordion = e.target.parentNode.parentNode;
        const accordionAllItems = accordion.querySelectorAll('.accordion__item');
        const accordionToggleAll = accordion.querySelector('.accordion-toggle-all');

        accordionItem?.classList.toggle('open');
        
        const accordionOpenItems = accordion.querySelectorAll('.accordion__item.open');

        if (accordionOpenItems.length === accordionAllItems.length) {
            toggleButtonOpen(accordionToggleAll);
        } else if(accordionOpenItems.length == 0) {
            toggleButtonClose(accordionToggleAll);
        }
    } else if (e.target.classList.contains('accordion-toggle-all')) {
        const activeAccordion = e.target.parentNode.querySelectorAll('.accordion__item');
        activeAccordion.forEach(el => ( e.target.dataset.state == 'false' ) ? el.classList.add('open') : el.classList.remove('open') );
        ( e.target.dataset.state == 'false' ) ? toggleButtonOpen(e.target) : toggleButtonClose(e.target);
    } else if (e.target.classList.contains('strategy-accordion__title')) {
        e.target.parentNode.classList.toggle('open');
    }
  });
}
