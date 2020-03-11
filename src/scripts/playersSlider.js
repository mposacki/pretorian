import $ from 'jquery'
window.jQuery = $
window.$ = $
import 'slick-carousel'


$(document).ready(function () {
  $('.players-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    lazyLoad: 'progressive',
    infinite: true,
    dots: true,
    arrows: false,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 40000,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })
})