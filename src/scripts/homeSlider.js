import Siema from 'siema';
import 'mediaCheck/js/mediaCheck-min';

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

const homeSliderObject = {
  _init: () => {
    const interval = setInterval(() => homeSlider.next(), 12000);

    document.querySelector('.home-slider__arrow--prev').addEventListener('click', () => {
      clearTimeout(interval);
      homeSlider.prev();
    });
    document.querySelector('.home-slider__arrow--next').addEventListener('click', () => {
      clearTimeout(interval);
      homeSlider.next();
    });

    mediaCheck({
      media: '(max-width: 768px)',
      entry: function () {
        homeSlider.destroy(true);
      },
      exit: function () {
        homeSlider.init();
      }
    });
  },
};



export default homeSliderObject;