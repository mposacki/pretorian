import SmoothScroll from 'smooth-scroll/dist/smooth-scroll';

let scroll = new SmoothScroll('[data-scroll]', {
  speed: 500,
  speedAsDuration: true
});

export default scroll;