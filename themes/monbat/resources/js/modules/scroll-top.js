const ScrollToTop = {
  scrollTriggerHeight: 900,
  scrollDuration: 1000,
  scrollButton: null,
  fixedButtonHeight: 0,
  handleScroll: function () {
    if (!this.scrollButton) {
      return;
    }

    if (window.scrollY > ScrollToTop.scrollTriggerHeight) {
      this.scrollButton.classList.add('visible');
    } else {
      this.scrollButton.classList.remove('visible');
    }

    const footer = document.querySelector('.footer-wrapper');
    if (footer) {
      const footerPosition = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerPosition.top <= windowHeight && footerPosition.bottom >= windowHeight - ScrollToTop.fixedButtonHeight) {
        this.scrollButton.classList.remove('fixed');
      } else {
        this.scrollButton.classList.add('fixed');
      }
    }
  },

  scrollToTop: function (duration) {
    const start = window.scrollY;
    const startTime = performance.now();

    function animation(time) {
      const timeElapsed = time - startTime;
      const scrollY = ScrollToTop.easeInOutCubic(timeElapsed, start, -start, duration);
      window.scrollTo(0, scrollY);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  },

  scrollButtonPosition: function () {
    let footerNavigationHeight = document.querySelector('.footer-navigation')?.offsetHeight;
    let footerHeight = document.querySelector('.footer')?.offsetHeight;

    if (typeof footerNavigationHeight === 'undefined') footerNavigationHeight = 0;
    if (typeof footerHeight === 'undefined') footerHeight = 0;

    this.fixedButtonHeight = footerHeight + footerNavigationHeight + 3;
  },

  easeInOutCubic: function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  },

  init: function () {
    this.scrollButton = document.querySelector('.scroll-top');
    this.scrollToTop = this.scrollToTop.bind(this, this.scrollDuration);
    this.scrollButtonPosition = this.scrollButtonPosition.bind(this);
    this.scrollButtonPosition();
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.scrollButton.addEventListener('click', this.scrollToTop);
    window.addEventListener('resize', this.scrollButtonPosition);
  },
};

export default ScrollToTop;
