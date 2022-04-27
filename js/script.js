$(document).ready(function () {

  // СЛАЙДЕР ГАЛЕРЕИ
  $('.carousel__inner').slick({
    dots: false,
    prevArrow: '<button type="button" class="slick-prev"><img src="img/carousel/arrow-left.png" alt="back"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="img/carousel/arrow-right.png" alt="forward"></button>'
  });

  // ТАБЫ КАТАЛОГА
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  // СЛАЙДЕР КАРТОЧКИ ТОВАРА
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // МОДАЛЬНЫЕ ОКНА
  // Показать модальное окно консультации и подложку по нажатию на кнопки с "data-modal=consultation"
  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });
  // Скрыть все открые модальные окна по нажатию на крестик ".modal__close"
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  // Открыть модальное окно заказа по нажатию на кноку "купить" и подстваить в модальное окно заказа название товара из карточки товара, на которую нажали
  $('.catalog-item__btn').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  // ВАЛИДАЦИЯ(ПРОВЕРКА) ФОРМ
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        tel: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: 'Пожалуйста, введите своё имя',
          minlength: jQuery.validator.format('Введите {0} символа!')
        },
        tel: 'Пожалуйства, введите своё номер телефона',
        email: {
          required: 'Пожалуйства, введите свою почту',
          email: 'Неправильно введён адрес почты'
        }
      }
    });
  }
  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');
  // Маска ввода номера телефона
  $('input[type=tel]').mask("+7 (999) 999-99-99");
  // Отправка Формы
  $('form').submit(function (e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    });
    return;
  });

  // Скрытие кнопки перехода на вверх если мы находимся выше 1600px
  $(window).scroll(function() {
    if($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  // Плавная анимация и переход на вверх страницы по клику на кноку на вверх
  $('.pageup').on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });


  //Подлючение WOW.js
  new WOW().init();

});