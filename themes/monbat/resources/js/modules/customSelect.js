const customSelect = {
  select: null,
  parent: null,
  customSelect: null,
  customSelectWrapper: null,
  selectedOption: null,
  dropdownIcon: null,
  optionsList: null,

  init: function (select) {
    this.select = select;
    this.parent = select.parentNode;
    this.customSelect = document.createElement('div');
    this.customSelectWrapper = document.createElement('div');
    this.selectedOption = document.createElement('span');
    this.dropdownIcon = document.createElement('span');
    this.optionsList = document.createElement('ul');
    this.initElements();
    this.initOptions();
    this.initDropdownIcon();
    this.initSelectedOption();
    this.initCustomSelect();
    this.initEventListeners();
    this.select.style.display = 'none';
    this.setZIndex();
  },

  initElements: function () {
    this.customSelect.classList.add('custom-select');
    this.customSelectWrapper.classList.add('custom-select__wrapper');
    this.selectedOption.classList.add('result');
    this.dropdownIcon.classList.add('custom-select__dropdown-icon');
    this.optionsList.classList.add('custom-select__options');
  },

  initOptions: function () {
    this.select.querySelectorAll('option').forEach(option => {
      const optionItem = document.createElement('li');
      optionItem.classList.add('custom-select__option');
      optionItem.textContent = option.textContent;
      optionItem.setAttribute('data-value', option.value);
      this.optionsList.appendChild(optionItem);
      if (option.selected) {
        optionItem.classList.add('selected');
      }
      optionItem.addEventListener('click', () => {
        this.handleOptionClick(optionItem, option);
      });
    });
  },

  handleOptionClick: function (optionItem, option) {
    this.selectedOption.textContent = option.textContent;
    this.select.value = option.value;
    this.select.dispatchEvent(new Event('change'));
    this.optionsList.querySelectorAll('li').forEach(item => {
      item.classList.remove('selected');
    });
    optionItem.classList.add('selected');
    this.customSelect.classList.remove('open');
  },

  initDropdownIcon: function () {
    this.dropdownIcon.addEventListener('click', () => {
      this.customSelect.classList.toggle('open');
    });
  },

  initSelectedOption: function () {
    this.selectedOption.addEventListener('click', () => {
      this.customSelect.classList.toggle('open');
    });
    this.selectedOption.textContent = this.select.options[this.select.selectedIndex].textContent;
  },

  initCustomSelect: function () {
    this.customSelect.appendChild(this.customSelectWrapper);
    this.customSelectWrapper.appendChild(this.selectedOption);
    this.customSelectWrapper.appendChild(this.dropdownIcon);
    this.customSelectWrapper.appendChild(this.optionsList);
    this.parent.insertBefore(this.customSelect, this.select.nextSibling);
  },

  initEventListeners: function () {
    document.addEventListener('click', event => {
      if (!this.customSelect.contains(event.target)) {
        this.customSelect.classList.remove('open');
      }
    });

    this.select.addEventListener('change', () => {
      this.handleSelectChange();
    });

    this.customSelect.addEventListener('keydown', (event) => {
      this.handleKeyboardNavigation(event);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        let openElements = document.querySelectorAll('.custom-select');
        openElements.forEach(function (element) {
          element.classList.remove('open');
        });
      }
    });
  },

  handleKeyboardNavigation: function (event) {
    if (!this.customSelect.classList.contains('open')) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.customSelect.classList.add('open');
      }
    } else {
      let focusedOption = this.optionsList.querySelector('.focused');
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          if (focusedOption) {
            this.handleOptionClick(focusedOption, this.select.options[this.getOptionIndexByValue(focusedOption.getAttribute('data-value'))]);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (focusedOption) {
            const prevOption = focusedOption.previousElementSibling;
            if (prevOption) {
              focusedOption.classList.remove('focused');
              prevOption.classList.add('focused');
              if (prevOption.offsetTop < this.optionsList.scrollTop) {
                this.optionsList.scrollTop = prevOption.offsetTop;
              }
            }
          } else {
            const lastOption = this.optionsList.lastElementChild;
            lastOption.classList.add('focused');
            this.optionsList.scrollTop = lastOption.offsetTop;
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (focusedOption) {
            const nextOption = focusedOption.nextElementSibling;
            if (nextOption) {
              focusedOption.classList.remove('focused');
              nextOption.classList.add('focused');
              if (nextOption.offsetTop + nextOption.offsetHeight > this.optionsList.scrollTop + this.optionsList.offsetHeight) {
                this.optionsList.scrollTop = nextOption.offsetTop + nextOption.offsetHeight - this.optionsList.offsetHeight;
              }
            }
          } else {
            const firstOption = this.optionsList.firstElementChild;
            firstOption.classList.add('focused');
            this.optionsList.scrollTop = 0;
          }
          break;
      }
    }
  },

  getOptionIndexByValue: function (value) {
    for (let i = 0; i < this.select.options.length; i++) {
      if (this.select.options[i].value === value) {
        return i;
      }
    }
    return -1;
  },

  handleSelectChange: function () {
    this.optionsList.querySelectorAll('li').forEach(item => {
      item.classList.remove('selected');
      if (item.getAttribute('data-value') === this.select.value) {
        item.classList.add('selected');
      }
    });

    this.select.querySelector('[selected="selected"]')?.removeAttribute('selected');
    this.select.querySelector(`option[value="${this.select.value}"]`)?.setAttribute('selected', 'selected');

    this.selectedOption.textContent = this.cutTexContentResult(this.select.options[this.select.selectedIndex].textContent, 35);

    [...this.select.options].forEach(option => {
      if(!option.value) return;
      const elementToHideShow = document.querySelector(`.${option.value}`);
      if(!elementToHideShow) return;
    
      if(option.value === this.select.value) {
        elementToHideShow.style.display = 'block';
      } else {
        elementToHideShow.style.display = 'none';
      }
    });
  },

  cutTexContentResult: function (text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    let result = '';
    let count = 0;
    for (let i = 0; i < text.length && count < maxLength; i++) {
      const char = text[i];
      count++;
      result += char;
    }

    return result + '...';
  },

  setZIndex: function () {
    const selects = [...document.querySelectorAll('.custom-select')];
    const numSelects = selects.length;

    selects.forEach((select, index) => {
      select.style.zIndex = numSelects - index;
      select.setAttribute('tabindex', '0');
    });
  },

  initAll: function (target) {
    target.forEach(select => {
      const customSelectInstance = Object.create(this);
      customSelectInstance.init(select);
    });
  },
};

export default customSelect;


