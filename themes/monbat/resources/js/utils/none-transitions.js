const bodyClassList = document.body.classList;
let timer = 0;
window.addEventListener('resize', () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  } else {
    bodyClassList.add('none-transitions');
  }

  timer = setTimeout(() => {
    bodyClassList.remove('none-transitions');
    timer = null;
  }, 100);
});
