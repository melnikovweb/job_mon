const dropdown = {
  target: document.querySelector('.related__pages'),
  handleClick(event) {
    if (event.target.parentElement?.classList.contains('related__pages')) {
      this.target.classList.toggle('open');
    } else {
      this.target.classList.remove('open');
    }
  },

  handleKeyEsc(event) {
    const code = event.keyCode || event.which;
    if (code === 27) {
      this.target.classList.remove('open');
    }
  },

  init() {
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyEsc = this.handleKeyEsc.bind(this);

    document.addEventListener('click', this.handleClick);
    document.addEventListener("keydown", this.handleKeyEsc);
  },
}

export default dropdown
