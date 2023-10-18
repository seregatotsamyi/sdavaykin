window.onload = function () {
  "use strict";

};


$(function () {
  let width = $(window).width();
  let body = $('.body');

  let menu = $('.header__nav-wrap')

  $(document).on('click', '.js-toggle-menu', function () {
    menu.toggleClass('_active')
    body.toggleClass('_fixed')
  })

  if (width < 577) {
    $('.js-advantages-slider').slick({
      autoplay: true,
      appendArrows: '.slider__arrows',
      prevArrow: '<div class="slider-arrow slider-arrow_prev">      <img class="slider-arrow__img" src="images/icon/slider-right.svg" alt="slider-right.svg" width="30"        height="30">    </div>',
      nextArrow: ' <div class="slider-arrow slider-arrow_next">      <img class="slider-arrow__img" src="images/icon/slider-right.svg" alt="slider-right.svg" width="30"        height="30">    </div>',
    })
  }

});