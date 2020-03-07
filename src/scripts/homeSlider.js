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
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
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