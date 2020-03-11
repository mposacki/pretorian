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
  _bindEvent() {
    this.objects.burger.addEventListener('click', () => {
      this.objects.navi.classList.add('header__navi--active');
      this.objects.overlayDiv.style.display = 'block';
      this.objects.overlayDiv.addEventListener('click', () => {
        this.objects.navi.classList.remove('header__navi--active');
        this.objects.overlayDiv.style.display = 'none';
      })
    });
    this.objects.closeIcon.addEventListener('click', () => {
      this.objects.navi.classList.remove('header__navi--active');
      this.objects.overlayDiv.style.display = 'none';
      this.objects.overlayDiv.removeEventListener('click');
    });
  },
  _unbindEvent() {
    this.objects.burger.removeEventListener('click');
    this.objects.closeIcon.removeEventListener('click');
  },
}

export default Navi;