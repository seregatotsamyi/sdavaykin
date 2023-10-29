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
  //pop-up start
  const popupLinks = document.querySelectorAll('.popup--link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock--padding');
  const lockPaddingItem = document.querySelectorAll('.lock--padding--item');
  const lockPaddingValue = window.innerWidth - document.querySelector('.body').offsetWidth + 'px';

  let unlock = true;

  const timeOut = 500;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const curentPopup = document.getElementById(popupName);

        popupOpen(curentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll('.popup--close');
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock) {
    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock === undefined) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.body').offsetWidth + 'px';
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('_fixed');
    unlock = false;
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    setTimeout(function () {
      unlock = true;
    }, timeOut);
  };

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      if (lockPaddingItem.length > 0) {
        for (let index = 0; index < lockPaddingItem.length; index++) {
          const el = lockPaddingItem[index];
          let currentValue = parseInt(getComputedStyle(el).right);
          let finalValue = currentValue - parseInt(lockPaddingValue) + 'px';
          el.style.right = finalValue;
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('_fixed');
    }, timeOut);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeOut);
  }
  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelectorAll('.popup.open');
      popupClose(popupActive);
    }
  });
  //pop-up end
};


$(function () {
  let width = $(window).width();
  let body = $('.body');

  let menu = $('.header__nav-wrap')

  $(document).on('click', '.js-toggle-menu', function () {
    menu.toggleClass('_active')
    body.toggleClass('_fixed')
  })


  //reviews
  $('.js-slider-reviews').slick({
    slidesToShow: 3,

    infinite: false,
    appendArrows: '.reviews__arrows',
    prevArrow: '<div class="slider-arrow slider-arrow_prev">      <img class="slider-arrow__img" src="images/icon/slider-right.svg" alt="slider-right.svg" width="30"        height="30">    </div>',
    nextArrow: ' <div class="slider-arrow slider-arrow_next">      <img class="slider-arrow__img" src="images/icon/slider-right.svg" alt="slider-right.svg" width="30"        height="30">    </div>',
    responsive: [{
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,

        }
      },
    ]
  })

  function countLines(el, lh) {
    let divHeight = $(el).height()
    console.log(divHeight / lh)
    return divHeight / lh;
  }

  if (width > 576) {
    $('.reviews__text').each(function (index) {
      let lines = countLines($(this).find('p'), 23)

      if (lines > 18) {
        $(this).addClass('_hide')
        $(this).find('.reviews__btn').addClass('_show')
      }
    })
  } else {
    $('.reviews__text').each(function (index) {
      let lines = countLines($(this).find('p'), 19)

      if (lines > 14) {
        $(this).addClass('_hide')
        $(this).find('.reviews__btn').addClass('_show')
      }
    })
  }
  $(document).on('click', '.reviews__btn', function () {
    $(this).toggleClass('_active')
    $(this).siblings("p").toggleClass('_show')
    $(this).parent().toggleClass('_show')
  })
  //reviews

  //question
  $(document).on('click', '.questions__item', function () {
    $(this).toggleClass('_active')
    $(this).find('.questions__bottom').slideToggle()
  })

  //question

  //js-certification-slider
  if (width < 1025) {
    $('.js-certification-slider').slick({
      autoplay: true,
      slidesToShow: 3,
      appendArrows: '.certification__arrow',
      prevArrow: '<div class="slider-arrow slider-arrow_prev">      <img class="slider-arrow__img" src="images/icon/slider-right.svg" alt="slider-right.svg" width="30"        height="30">    </div>',
      nextArrow: ' <div class="slider-arrow slider-arrow_next">      <img class="slider-arrow__img" src="images/icon/slider-right.svg" alt="slider-right.svg" width="30"        height="30">    </div>',
      responsive: [{
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 577,
          settings: {
            slidesToShow: 1,

          }
        },
      ]
    })
  }
  //js-certification-slider
  if (width < 577) {
    $('.js-advantages-slider').slick({
      autoplay: true,
      appendArrows: '.slider__arrows',
      prevArrow: '<div class="slider-arrow slider-arrow_prev">      <img class="slider-arrow__img" src="images/icon/slider-right.svg" alt="slider-right.svg" width="30"        height="30">    </div>',
      nextArrow: ' <div class="slider-arrow slider-arrow_next">      <img class="slider-arrow__img" src="images/icon/slider-right.svg" alt="slider-right.svg" width="30"        height="30">    </div>',
    })
  }

  $('.js-select').styler();

  //js-form
  let validation = (nameInput, phoneInput, connectionInput) => {
    let result = 1

    if (phoneInput.val().length !== 18) {
      phoneInput.addClass("_error")
      result = 0
    } else {
      phoneInput.removeClass("_error")
    }

    if (connectionInput.val() !== "") {
      connectionInput.next().removeClass("_error")
    } else {
      result = 0
      connectionInput.next().addClass("_error")
    }
    const reg = /[а-яА-ЯЁё/ ]+/gm

    if (reg.test(nameInput.val())) {
      nameInput.removeClass("_error")
    } else {
      result = 0
      nameInput.addClass("_error")
    }


    return result
  }

  $('.js-form').on('submit', function (event) {

    event.preventDefault();
    let formData = $(this).serialize();

    let send = () => {
      $.ajax({
        url: 'mail.php',
        method: 'POST',
        data: formData,
        dataType: 'json',
        encoding: true,
        success: response => {
          if (response == 1) {
            $('.js-form').each(function () {
              $(this)[0].reset();
              popupClose(document.querySelector('.popup.open'));
              const thankPopUp = document.getElementById("popupThank")
              popupOpen(thankPopUp);
              console.log(thankPopUp)
            });
          } else {
            alert('Произошла ошибка');
          }
        },
        error: function (jqXHR, exception) {
          if (jqXHR.status === 0) {
            alert('Not connect. Verify Network.');
          } else if (jqXHR.status == 404) {
            alert('Requested page not found (404).');
          } else if (jqXHR.status == 500) {
            alert('Internal Server Error (500).');
          } else if (exception === 'parsererror') {
            alert('Requested JSON parse failed.');
          } else if (exception === 'timeout') {
            alert('Time out error.');
          } else if (exception === 'abort') {
            alert('Ajax request aborted.');
          } else {
            alert('Uncaught Error. ' + jqXHR.responseText);
          }
        }
      });
    }

    let nameInput = $(this).find('input[name="name"]')
    let phoneInput = $(this).find('input[name="phone"]')
    let connectionInput = $(this).find('select[name="connection"]')

    if (validation(nameInput, phoneInput, connectionInput)) {
      send()
    }

  })

});