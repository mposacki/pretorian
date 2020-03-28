const config = {
  btn: document.querySelector('.about-us__load-more'),
  content: document.querySelector('.about-us__more'),
}
const loadMore = {
  _init() {
    config.btn.addEventListener('click', () => {
      config.btn.classList.toggle('active');
      config.content.classList.toggle('active');
    });
  }
}

export default loadMore;