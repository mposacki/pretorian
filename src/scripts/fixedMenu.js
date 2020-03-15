import debounce from 'lodash.debounce';

const header = document.querySelector('.header'),
      navLinks = document.querySelectorAll('.nav__link');

const fixedMenu = {
  _init() {
    window.onscroll = debounce(() => {
      this.checkScrollPosition();
      this.setActiveNavLink();
    }, 50);
  },

  checkScrollPosition() {
     if (window.pageYOffset >= header.offsetHeight) {
       header.classList.add("header--fixed")
     } else {
       header.classList.remove("header--fixed");
     }
  },

  setActiveNavLink() {
    let fromTop = window.scrollY;

    navLinks.forEach(link => {
      let section = document.querySelector(link.hash);

      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add("nav__link--active");
      } else {
        link.classList.remove("nav__link--active");
      }
    });
  }
}

export default fixedMenu;