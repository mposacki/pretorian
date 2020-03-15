import Siema from 'siema';

const homeSlider = new Siema({
  selector: '.home-slider',
  duration: 1000,
  easing: 'ease-in-out',
  perPage: 1,
  startIndex: 0,
  draggable: true,
  multipleDrag: true,
  threshold: 20,
  loop: true,
  rtl: false,
  onInit: () => {},
  onChange: () => {},
});

setInterval(() => homeSlider.next(), 12000);

document.querySelector('.home-slider__arrow--prev').addEventListener('click', () => homeSlider.prev());
document.querySelector('.home-slider__arrow--next').addEventListener('click', () => homeSlider.next());

export default homeSlider;