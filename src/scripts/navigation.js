import 'mediaCheck/js/mediaCheck-min';

const objects = {
  burger: document.querySelector('.header__navi-burger'),
  navi: document.querySelector('.header__navi'),
  overlayDiv: document.querySelector('.header__navi-overlay'),
  closeIcon: document.querySelector('.header__navi-close')
}

const Navi = {
  _init: () => {
    mediaCheck({
      media: '(max-width: 992px)',
      entry: function () {
        Navi._bindEvent();
      },
      exit: function () {
        Navi._unbindEvent();
      }
    });
  },
  _burderClickHandler: () => {
    objects.navi.classList.add('header__navi--active');
    objects.overlayDiv.style.display = 'block';
    objects.overlayDiv.addEventListener('click', Navi._overlayClickHandler, false);
  },
  _closeIconClickHandler: () => {
    objects.navi.classList.remove('header__navi--active');
    objects.overlayDiv.style.display = 'none';
    objects.overlayDiv.removeEventListener('click', Navi._overlayClickHandler);
  },
  _overlayClickHandler: () => {
    objects.navi.classList.remove('header__navi--active');
    objects.overlayDiv.style.display = 'none';
  },
  _bindEvent: () => {
    objects.burger.addEventListener('click', Navi._burderClickHandler, false);
    objects.closeIcon.addEventListener('click', Navi._closeIconClickHandler, false);
  },
  _unbindEvent: () => {
    objects.burger.removeEventListener('click', Navi._burderClickHandler);
    objects.closeIcon.removeEventListener('click', Navi._closeIconClickHandler);
  },
}

export default Navi;