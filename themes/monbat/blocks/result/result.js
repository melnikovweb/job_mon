const resultHandler = {
  promise: null,
  timeoutId: null,
  tabItems: [...document.querySelectorAll('.result-section .tabs > ul > li')],
  tabItemsYear: [...document.querySelectorAll('.result-section .year-tabs-list > li')],

  async filterSendAjaxRequest() {
    const form = document.querySelector('.form-filters');
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

    formData.append('action', 'filter_posts');
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
      let tabs = [...document.querySelectorAll('.result-section .tabs > ul > li')];
      let panels = [...document.querySelectorAll('.result-section .panel')];
      panels.forEach(i => {
        i.classList.remove('active');
      })
      tabs.forEach(i => {
        if (i?.classList.contains('active')) document.querySelector(`[data-panel="${i.getAttribute('data-tab')}"]`)?.classList.add('active');
      })

      this.handleClickYear = resultHandler.handleClickYear.bind(this);
      [...document.querySelectorAll('.result-section .year-tabs-list > li')].forEach(tabItemsYear => tabItemsYear.addEventListener('click', this.handleClickYear));

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      loader.style.filter = "";
    }
  },

  addEventListeners() {
    const form = document.querySelector('.form-filters');
    const formSelect = form.querySelector('select');
    const formInput = form?.querySelector('.search');
    const clearBtn = document.querySelector(".reset");


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

    formSelect.addEventListener('change', () => {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.filterSendAjaxRequest().then(r => r);
      }, 300);
    });


    if (formInput.tagName.toLowerCase() === 'input' && formInput.type.toLowerCase() === 'text') {
      formInput.addEventListener('input', () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.filterSendAjaxRequest().then(r => r);
        }, 300);
      });
    }

    clearBtn.addEventListener("click", function () {
      if (formInput.value === '' && formSelect.value === "all") return;
      formInput.value = "";
      formSelect.value = "all";
      const event = new Event("input");
      formSelect.dispatchEvent(new Event('change'));
      formInput.dispatchEvent(event);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
    });
  },

  handleClick({target}) {
    const lang = themeVars.lang;
    const attr = lang === 'bg' ? 'godisni-i-mezdinni-finansovi-rezultati' : 'annual-and-interim-results';
    if (target.getAttribute('data-tab') !== attr) {
      document.querySelector('.buttons').style.display = 'none'
    } else {
      document.querySelector('.buttons').style.display = 'flex'
    }
    let panel = target.closest('.result-section').querySelector(`[data-panel="${target.getAttribute('data-tab')}"]`);
    [...target.closest('.result-section').querySelectorAll('.active')].forEach(i => {
      i.classList.remove('active');
    })
    target.classList.add('active');
    panel?.classList.add('active');
  },

  handleClickYear({target}) {
    let panel = target.closest('.panel').querySelector(`[data-panel-year="${target.getAttribute('data-tab-year')}"]`);
    [...target.closest('.panel').querySelectorAll('.active-year')].forEach(i => {
      i.classList.remove('active-year');
    })
    target.classList.add('active-year');
    panel.classList.add('active-year');
  },

  handlerToggleFilter({target}) {
    target.classList.toggle('open');
    target.nextElementSibling.classList.toggle('open');
  },

  init: function () {
    if (this.tabItems.length === 0) return;
    this.addEventListeners();
    this.handleClick = this.handleClick.bind(this);
    this.handleClickYear = this.handleClickYear.bind(this);
    this.handlerToggleFilter = this.handlerToggleFilter.bind(this);
    document.querySelector('.slide-toggle-label')?.addEventListener('click', this.handlerToggleFilter);
    this.tabItems.forEach(tabItem => tabItem.addEventListener('click', this.handleClick));
    this.tabItemsYear.forEach(tabItemsYear => tabItemsYear.addEventListener('click', this.handleClickYear));
  },
}


window.addEventListener('load', () => {
  resultHandler.init();
});
