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

});