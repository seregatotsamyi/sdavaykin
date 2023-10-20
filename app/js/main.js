window.onload = function () {
  "use strict";
  //mask-tel
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;

    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");

      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });
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

  $('.js-select').styler();

});