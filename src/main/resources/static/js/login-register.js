'use strict';

// reCaptcha validation
window.recaptchaCallback = function (captchaVerification) {
  $(':input[name="captchaDummyField"]').val(captchaVerification).trigger('validate');
};
window.recaptchaExpiredCallback = function () {
  $(':input[name="captchaDummyField"]').val('').trigger('validate');
};

+function ($) {
  $(function () {

    $('[data-goto-panel]').on('click', function () {
      $('[data-panel]').addClass('hidden');
      $('[data-panel="' + $(this).data('goto-panel')  + '"]').removeClass('hidden');
    });

    $('[data-panel="login"] [data-validation-example]')
    .on('formValid', function () {
      $(this).find('button[type="submit"]').button('loading');
      window.setTimeout(function () {
        window.location.reload(true);
      }, 1500);
    });

    $('[data-panel="register"] [data-validation-example]')
    .on('formValid', function () {
      $(this).find('button[type="submit"]').button('loading');
      window.setTimeout(function () {
        basecoat.alert('Sign-up successful', 'Please check your inbox for further inscrutions.')
        .on('accept', function () {
          window.location.reload(true);
        });
      }, 1500);
    });

    $('[data-panel="resetPassword"] [data-validation-example]')
    .on('formValid', function () {
      $(this).find('button[type="submit"]').button('loading');
      window.setTimeout(function () {
        basecoat.alert('Password reset', 'Please check your inbox for further inscrutions.')
        .on('accept', function () {
          window.location.reload(true);
        });
      }, 1500);
    });

    // recaptcha theme detection
    $('.g-recaptcha').attr('data-theme', localStorage.getItem('theme') == 'dark' ? 'dark' : 'light');

  });
}(jQuery);
