import $ from 'jquery'
window.jQuery = $
window.$ = $
import 'slick-carousel'


$(document).ready(function () {
  $('.home-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'progressive',
    infinite: true,
    arrows: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: '<img class="home-slider__arrow home-slider__arrow--next" src="/assets/images/svg/arrow-category.svg">',
    prevArrow: '<img class="home-slider__arrow home-slider__arrow--prev" src="/assets/images/svg/arrow-category.svg">',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  })
})



// import 'glider-js/glider'


// new Glider(document.querySelector('.home-slider .glider'), {
//   slidesToShow: 1,
//   infinite: true,
//   arrows: {
//     next: '.home-slider__arrow.home-slider__arrow--next',
//     prev: '.home-slider__arrow.home-slider__arrow--prev'
//   }
// })

// document.querySelector('.home-slider').addEventListener('glider-slide-visible', function (event) {
//   var imgs_to_anticipate = 3;
//   var glider = Glider(this);
//   for (var i = 0; i <= imgs_to_anticipate; ++i) {
//     var index = Math.min(event.detail.slide + i, glider.slides.length - 1),
//       glider = glider;
//     loadImages.call(glider.slides[index], function () {
//       glider.refresh(true);
//     })
//   }
// });

// function loadImages(callback) {
//   [].forEach.call(this.querySelectorAll('img'), function (img) {
//     var _img = new Image,
//       _src = img.getAttribute('data-src');
//     _img.onload = function () {
//       img.src = _src;
//       img.classList.add('loaded');
//       callback && callback(img);
//     }
//     if (img.src !== _src) _img.src = _src;
//   });
// }