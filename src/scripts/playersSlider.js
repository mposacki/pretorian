import Siema from 'siema';

const playersSlider = new Siema({
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
  onInit: () => {},
  onChange: () => {},
});

document.querySelector('.players-slider__arrow--prev').addEventListener('click', () => {
  const valueOfScroll = getValueOfElementToScroll(window.innerWidth);
  playersSlider.prev(valueOfScroll);
});
document.querySelector('.players-slider__arrow--next').addEventListener('click', () => {
  const valueOfScroll = getValueOfElementToScroll(window.innerWidth);
  playersSlider.next(valueOfScroll);
});

const changeSlide = (side) => {
  const valueOfScroll = getValueOfElementToScroll(window.innerWidth);
  playersSlider.side(valueOfScroll);
};

const getValueOfElementToScroll = (value) => {
  if (value > 0 && value < 576) return 1;
  if (value >= 576 && value < 992) return 2;
  if (value > 992 && value < 1200) return 3;
  if (value > 1200) return 4;
};

export default playersSlider;