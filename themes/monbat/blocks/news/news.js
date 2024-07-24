const newsTabs = {
  yearTabItems: [...document.querySelectorAll('.news-list .tabs-list > li')],

  handleClickTabs({target}) {
    let panel = target.closest('.tabs-container').querySelector(`[data-panel-year="${target.getAttribute('data-tab-year')}"]`);
    [...target.closest('.tabs-container').querySelectorAll('.content-active')].forEach(i => {
      i.classList.remove('content-active');
    });
    [...target.closest('.tabs-container').querySelectorAll('.tab')].forEach(i => {
      i.classList.remove('tab-active');
    });
    target.classList.add('tab-active');
    panel.classList.add('content-active');
  },

  init: function () {
    this.handleClickTabs = this.handleClickTabs.bind(this);
    this.yearTabItems.forEach(tabItemsYear => tabItemsYear.addEventListener('click', this.handleClickTabs));
  },
}

window.addEventListener('load', () => {
  newsTabs.init();
});

