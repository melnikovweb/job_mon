const progressBarObj = {
  header: document.querySelector('header'),
  progressBar: {
    width: '0',
    height: '7px',
    backgroundColor: '#D8232A',
  },

  progressBarContainer: {
    width: '100%',
    height: '7px',
    backgroundColor: 'transparent',
    position: 'fixed',
    zIndex: '8',
  },

  createProgressBar: function () {
    const progressBar = document.createElement('div');
    Object.assign(progressBar.style, this.progressBar);

    const progressBarContainer = document.createElement('div');
    progressBarContainer.id = 'progress-bar';
    Object.assign(progressBarContainer.style, this.progressBarContainer);
    progressBarContainer.appendChild(progressBar);

    const progressBarTop = this.header.offsetHeight;

    progressBarContainer.style.top = `${progressBarTop}px`;
    document.body.insertBefore(progressBarContainer, this.header);

    this.progressBar = progressBar;
  },
  updateProgressBar() {
    const maxScrollHeight = document.body.scrollHeight - window.innerHeight;
    const progressBar = this.progressBar;
    const progress = (window.scrollY / maxScrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  },
  setScrollEvent: function () {
    this.updateProgressBar = this.updateProgressBar.bind(this)

    window.addEventListener('scroll', this.updateProgressBar);
    window.addEventListener('resize', this.updateProgressBar);
  },

  init: function () {
    this.createProgressBar();
    this.setScrollEvent();
  },
};

export default progressBarObj;
