import 'mediaCheck/js/mediaCheck-min';

const Navi = {
  objects: {
    burger: document.querySelector('.header__navi-burger'),
    navi: document.querySelector('.header__navi'),
    overlayDiv: document.querySelector('.header__navi-overlay'),
    closeIcon: document.querySelector('.header__navi-close')
  },
  _init() {
    mediaCheck({
      media: '(max-width: 768px)',
        entry: function () {
          this._bindEvent();
        }.bind(this),
        exit: function () {
          this._unbindEvent();
        }.bind(this)
    });
  },
  _burderClickHandler() {
    this.objects.navi.classList.add('header__navi--active');
    this.objects.overlayDiv.style.display = 'block';
    this.objects.overlayDiv.addEventListener('click', this._overlayClickHandler, true);
  },
  _overlayClickHandler() {
    this.objects.navi.classList.remove('header__navi--active');
    this.objects.overlayDiv.style.display = 'none';
  },
  _closeIconClickHandler() {
    this.objects.navi.classList.remove('header__navi--active');
    this.objects.overlayDiv.style.display = 'none';
    this.objects.overlayDiv.removeEventListener('click', this._overlayClickHandler, true);
  },
  _bindEvent() {
    this.objects.burger.addEventListener('click', this._burderClickHandler, true);
    this.objects.closeIcon.addEventListener('click', this._closeIconClickHandler, true);
  },
  _unbindEvent() {
    this.objects.burger.removeEventListener('click', this._burderClickHandler, true);
    this.objects.closeIcon.removeEventListener('click', this._closeIconClickHandler, true);
  },
}

export default Navi;