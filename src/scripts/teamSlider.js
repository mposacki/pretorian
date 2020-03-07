import $ from 'jquery'
window.jQuery = $
window.$ = $
import 'slick-carousel'


$(document).ready(function () {
  $('.team-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'progressive',
    infinite: true,
    speed: 1000,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 40000,
  })
})