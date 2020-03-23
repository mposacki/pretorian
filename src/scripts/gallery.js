import Siema from 'siema';
import 'mediaCheck/js/mediaCheck-min';

const gallery = new Siema({
  selector: '.gallery-content',
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

const galleryObject = {
  _init: () => {
    const interval = setInterval(() => gallery.next(), 4500);

    document.querySelector('.gallery__arrow--prev').addEventListener('click', () => {
      clearTimeout(interval);
      gallery.prev();
    });
    document.querySelector('.gallery__arrow--next').addEventListener('click', () => {
      clearTimeout(interval);
      gallery.next();
    });
  },
};



export default galleryObject;