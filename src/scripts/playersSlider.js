import Siema from 'siema';

class SiemaWithDots extends Siema {

  addDots() {
    this.dots = document.createElement('div');
    this.dots.classList.add('players-slider-dots');

    for (let i = 0; i < this.innerElements.length; i++) {
      const dot = document.createElement('button');

      dot.classList.add('players-slider-dots__item');

      dot.addEventListener('click', () => {
        this.goTo(i);
      })

      this.dots.appendChild(dot);
    }

    this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
  }

  updateDots() {
    for (let i = 0; i < this.dots.querySelectorAll('button').length; i++) {
      const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
      this.dots.querySelectorAll('button')[i].classList[addOrRemove]('players-slider-dots__item--active');
    }
  }
}

const playersSlider = new SiemaWithDots({
  selector: '.players-slider',
  duration: 1000,
  easing: 'ease-out',
  perPage: {
    0: 1,
    576: 2,
    992: 3,
    1200: 4
  },
  startIndex: 0,
  draggable: true,
  multipleDrag: true,
  threshold: 20,
  loop: true,
  rtl: false,

  onInit: function () {
    this.addDots();
    this.updateDots();
  },

  onChange: function () {
    this.updateDots()
  },
});

export default playersSlider;