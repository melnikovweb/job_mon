const documentsAGM = {
  promise: null,
  timeoutId: null,
  tabItemsYear: [...document.querySelectorAll('.documents-agm-section .year-tabs-list > li')],

  async filterSendAjaxRequest() {
    const form = document.querySelector('.form-filters-agm');
    const formData = new FormData(form);
    const filterResult = document.querySelector('.result-panel');

    const loader = document.querySelector('.dot-loader');
    loader.style.filter = "blur(5px)";

    if (this.promise !== null) {
      if (typeof this.promise.abort === 'function') {
        this.promise.abort();
      }
      this.promise = null;
    }


    formData.append('action', 'filter_posts_agm');
    formData.append('type', document.querySelector('.type-btn.active-btn').getAttribute('data-type'));

    const options = {
      method: 'POST',
      body: formData,
    };

    try {
      const response = await fetch(themeVars.ajaxUrl, options);
      if (!response.ok) throw new Error('Network response was not ok.');
      const html = await response.text();
      filterResult.innerHTML = html;

      this.handleClickYear = documentsAGM.handleClickYear.bind(this);
      [...document.querySelectorAll('.documents-agm-section .year-tabs-list > li')].forEach(tabItemsYear => tabItemsYear.addEventListener('click', this.handleClickYear));

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      loader.style.filter = "";
    }
  },

  addEventListeners() {
    const buttons = [...document.querySelectorAll('.type-btn')];

    buttons.forEach(b => {
      b.addEventListener('click', ({target}) => {
        buttons.forEach(b => b.classList.remove('active-btn'));
        target.classList.add('active-btn');
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.filterSendAjaxRequest().then(r => r);
        }, 300);
      })
    })
  },

  handleClickYear({target}) {
    let panel = target.closest('.panel').querySelector(`[data-panel-year="${target.getAttribute('data-tab-year')}"]`);
    [...target.closest('.panel').querySelectorAll('.active-year')].forEach(i => {
      i.classList.remove('active-year');
    })
    target.classList.add('active-year');
    panel.classList.add('active-year');
  },

  init: function () {
    this.addEventListeners();
    this.handleClickYear = this.handleClickYear.bind(this);
    this.tabItemsYear.forEach(tabItemsYear => tabItemsYear.addEventListener('click', this.handleClickYear));
  },
}


window.addEventListener('load', () => {
  documentsAGM.init();
});
