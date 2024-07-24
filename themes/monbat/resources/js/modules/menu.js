const menuGroup = {
  triggers: document.querySelectorAll(".toggle-icon"),
  triggersBatt: document.querySelectorAll(".is-style-batteries > a"),
  langTrigger: document.querySelector(".lang-block"),
  menuItemsSlider: document.querySelectorAll(".menu-item-has-children > a"),
  accordionTitles: document.querySelectorAll(".bottom-block .column .title"),
  menuBack: document.querySelectorAll("button.back"),
  body: document.querySelector("body"),
  isClosed: true,
  scrollPosMenu: 0,

  burgerTime(target) {
    const isOpenMenu = this.body.classList.contains("is-open-menu");
    const isOpenBatteries = this.body.classList.contains("is-open-batteries");

    if (
      this.isClosed ||
      (isOpenMenu && target !== "primary__menu") ||
      (isOpenBatteries && target !== "batteries__menu")
    ) {

      if (target === "primary__menu") {
        this.body.classList.add("is-open-menu");
        this.body.classList.remove("is-open-batteries");
        if (this.body.classList.contains("is-open")) this.changeDelayMenuTransitions();
      } else if (target === "batteries__menu") {
        this.body.classList.add("is-open-batteries");
        this.body.classList.remove("is-open-menu");
        if (this.body.classList.contains("is-open")) this.changeDelayMenuTransitions();
      }

      this.body.classList.add("is-open");

      if (!isOpenMenu && !isOpenBatteries) {
        this.scrollPosMenu =
          window.scrollY ||
          (document.documentElement.clientHeight
            ? document.documentElement.scrollTop
            : document.body.scrollTop);

        this.body.style.overflow = "hidden";
        this.body.style.width = "100%";
        this.body.style.position = "fixed";
        this.body.style.top = -this.scrollPosMenu + "px";
        this.isClosed = false;
      }
    } else {
      this.clearDelayMenuTransitions();
      this.body.classList.remove("is-open-menu");
      this.body.classList.remove("is-open-batteries");
      this.body.classList.remove("is-open");
      this.closeAllMenus();
      if (this.scrollPosMenu !== 0) {
        window.scrollTo(0, this.scrollPosMenu);
      }
      this.scrollPosMenu = 0;
      this.isClosed = true;
    }
  },

  removeStyles() {
    this.body.style.overflow = "";
    this.body.style.width = "";
    this.body.style.position = "";
    this.body.style.top = "";
  },

  clearDelayMenuTransitions() {
    document.querySelector('.primary__menu-wrapper').style.transitionDelay = "";
    document.querySelector('.batteries__menu-wrapper').style.transitionDelay = "";
  },

  changeDelayMenuTransitions() {
    document.querySelector('.batteries__menu-wrapper').style.transitionDelay = "200ms";
    document.querySelector('.primary__menu-wrapper').style.transitionDelay = "200ms";
  },

  closeAllMenus() {
    this.isClosed = true;
    this.body.classList.remove("is-open");
    this.body.classList.remove("is-open-menu");
    this.body.classList.remove("is-open-batteries");
    this.removeStyles();
    if (this.scrollPosMenu !== 0) {
      window.scrollTo(0, this.scrollPosMenu);
    }
    this.scrollPosMenu = 0;
  },

  handleTriggerClick(event) {
    const target = event.target.getAttribute("data-target");
    this.burgerTime(target);
  },

  langDropdown(event) {
    if (event.target.parentElement?.classList.contains('lang-block')) {
      this.langTrigger.classList.toggle('open');
    } else {
      this.langTrigger.classList.remove('open');
    }
  },

  handleMenuItemClick(event) {
    let width = window.innerWidth || document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width >= 993) return;
    event.preventDefault();
    const target = event.target;
    this.body.classList.add('is-open-submenu');
    target.parentElement.classList.add('open-menu-item');
    console.log(width);
  },

  handleAccordionItemClick(event) {
    event.target.classList.toggle('active');
    let accordionBody = event.target.nextElementSibling;
    if (accordionBody.style.maxHeight) {
      accordionBody.style.maxHeight = null;
    } else {
      accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
    }
  },

  handleMenuBackClick() {
    document.querySelectorAll('.open-menu-item').forEach(i => {
      i.classList.remove('open-menu-item')
    })
    this.body.classList.remove('is-open-submenu');
  },

  handleKeyEsc(event) {
    const code = event.keyCode || event.which;
    if (code === 27) {
      this.clearDelayMenuTransitions();
      this.closeAllMenus();
    }
  },

  init() {
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleMenuBackClick = this.handleMenuBackClick.bind(this);
    this.handleAccordionItemClick = this.handleAccordionItemClick.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleKeyEsc = this.handleKeyEsc.bind(this);
    this.langDropdown = this.langDropdown.bind(this);

    this.triggersBatt.forEach((trigger) => {
      trigger.classList.add('toggle-icon');
      trigger.setAttribute('data-target', 'batteries__menu');
    });

    this.triggers.forEach((trigger) => {
      trigger.addEventListener("click", this.handleTriggerClick);
    });

    this.accordionTitles.forEach((trigger) => {
      trigger.addEventListener("click", this.handleAccordionItemClick);
    });

    this.menuItemsSlider.forEach((trigger) => {
      trigger.addEventListener("click", this.handleMenuItemClick);
    });

    this.menuBack.forEach((trigger) => {
      trigger.addEventListener("click", this.handleMenuBackClick);
    });

    document.addEventListener('click', this.langDropdown);
    document.addEventListener("keydown", this.handleKeyEsc);
  },
};

export default menuGroup;
