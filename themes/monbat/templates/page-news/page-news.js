const newsArchiveTabs = {
  mainTabItems: [...document.querySelectorAll('.news-list .tabs .tab-btn')],
  yearTabItems: [...document.querySelectorAll('.news-list .tabs-list > li')],

  handleClickMainTabs({target}) {
    [...target.closest('.news-list').querySelectorAll('.active')].forEach(i => {
      i.classList.remove('active');
    })
    target.classList.add('active');
    let itemRows = [...target.closest('.news-list').querySelectorAll('.news-item-row')];
    let itemMonthRows = [...target.closest('.news-list').querySelectorAll('.news-month-row')];

    itemRows.forEach(i => {
      if (i.getAttribute('data-category') === target.getAttribute('data-tab')) {
        i.style.display = 'flex';
      } else if (target.getAttribute('data-tab') === 'all') {
        i.style.display = 'flex';
      } else {
        i.style.display = 'none';
      }
    });

    itemMonthRows.forEach(i => {
      if (i.nextElementSibling.style.display === 'none') {
        i.style.display = 'none';
      } else {
        i.style.display = 'flex';
      }
    });
  },

  handleClickYearTabs({target}) {
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
    this.handleClickMainTabs = this.handleClickMainTabs.bind(this);
    this.handleClickYearTabs = this.handleClickYearTabs.bind(this);

    this.mainTabItems.forEach(tabItem => tabItem.addEventListener('click', this.handleClickMainTabs));
    this.yearTabItems.forEach(tabItemsYear => tabItemsYear.addEventListener('click', this.handleClickYearTabs));
  },
}

window.addEventListener('load', () => {
  newsArchiveTabs.init();
});

