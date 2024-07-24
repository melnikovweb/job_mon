export const metalExchangeControls = () => {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('metal-exchange__controller') && !e.target.classList.contains('active')) {
            const metalExchange = e.target.parentNode.parentNode;
            if(!metalExchange) return;
            metalExchange.querySelector('.metal-exchange__slides').dataset.slideActive = e.target.dataset.anchor;
            metalExchange.querySelector('.metal-exchange__controller--center').dataset.slideActive = e.target.dataset.anchor;
            metalExchange.querySelector('.metal-exchange__controller.active').classList.remove('active');
            e.target.classList.add('active');
        }
    });
}
