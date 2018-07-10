'use strict';

/* EXAMPLE validation script only for demonstating the CSS!!! */
+function ($) {
  $(function () {

    // note: this is not a complete test for valid email
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
      return pattern.test(emailAddress);
    }

    // note: this is not an accurate test for a strong password
    function isValidPassword(password) {
      // var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/); // too strict!
      var pattern = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/);
      return pattern.test(password);
    }

    // simple function to remove/reset validation classes
    function resetValidation($formGroup) {
      $formGroup.find('.help-block').show();
      $formGroup.find('[data-validation-error]').hide();
      return $formGroup.removeClass('has-success').removeClass('has-error').removeClass('has-warning').removeClass('has-feedback');
    }

    // make a form group go red (invalid) or green (valid)
    function setValidation($formGroup, valid) {
      if (!valid) {
        if ($formGroup.find('[data-validation-error]').length > 0) {
          $formGroup.find('.help-block').hide();
          $formGroup.find('[data-validation-error]').show();
        }
      }

      $formGroup.addClass('has-feedback');
      $formGroup.toggleClass('has-error', !valid);
      $formGroup.toggleClass('has-success', valid);
    }

    // validation logic for every form example
    $('[data-validation-example]').each(function () {
      var $form = $(this);
      var $button = $form.find('button[type="submit"]');

      resetValidation($form.find('.form-group')); // hide any validation messages

      // valdiation on form submit
      $button.click(function (e) {
        e.preventDefault();

        // just touch all fields on submit (to run validation on them)
        $form.find(':input').trigger('validate');

        // show error/success alerts
        $form.find('.alert').addClass('hidden');
        if ($form.find('.has-error').length == 0 && $form.find('.has-success').length > 0) {
          $form.find('.alert-success').removeClass('hidden');
          $form.data('isValid', true).trigger('formValid');
        } else {
          $form.find('.alert-danger').removeClass('hidden');
          $form.data('isValid', false).trigger('formInvalid');
        }
      });

      // reset validation on focus for all but radios and checkboxes
      $form.find(':input:not(:button):not(:checkbox):not(:radio)').on('focus', function () {
        resetValidation($(this).parents('.form-group').last());
      });

      // general fields validate trigger
      $form.find(':input:not(:button):not(:checkbox):not(:radio)').on('validate', function () {
        var $formGroup = resetValidation($(this).parents('.form-group').last());
        var valid = true;

        $formGroup.find(':input:not(:button)').each(function () {
          var $input = $(this);

          // validate pattern
          if ($input.attr('pattern')) {
            var pattern = new RegExp($input.attr('pattern'));
            valid = valid && pattern.test($input.val());
          }

          // validate email
          if ($input.attr('type') == 'email') {
            valid = valid && isValidEmailAddress($input.val());
          }

          // validate password
          if ($input.closest('.has-password-toggle').length > 0) {
            valid = valid && isValidPassword($input.val());
          }

          // validate required
          if ($input.attr('required') && !$input.val()) {
            valid = false;
          }
        });

        setValidation($formGroup, valid);
      });

      $form.find(':input:not(:button):not(:checkbox):not(:radio)').on('blur', function () {
        $(this).trigger('validate');
      });

      // checkboxes validate trigger
      $form.find(':checkbox').on('validate', function () {
        var $formGroup = resetValidation($(this).parents('.form-group').last());
        var valid = $formGroup.find(':input[required]:not(:checked)').length < 1;
        setValidation($formGroup, valid);
      });

      $form.find(':checkbox').on('change', function () {
        var $formGroup = $(this).parents('.form-group').last();
        var valid = $formGroup.find(':checkbox[required]:not(:checked)').length < 1;
        if (valid || $formGroup.hasClass('has-feedback')) {
          $(this).trigger('validate');
        }
      });

      // radio buttons validate trigger
      $form.find(':radio').on('validate', function () {
        var $formGroup = resetValidation($(this).parents('.form-group').last());
        var valid = $formGroup.find(':checked').length > 0;
        setValidation($formGroup, valid);
      });

      $form.find(':radio').on('change', function () {
        $(this).trigger('validate');
      });

    });

    // when one of these [data-validation-example] forms is reset, do all the following things
    $(document).on('reset', '[data-validation-example]', function () {
      $(this)
      .find('.alert')
      .addClass('hidden')
      .end()
      .find(':input')
      .not(':button, :submit, :reset')
      .val('')
      .removeAttr('checked')
      .removeAttr('selected')
      .trigger('change');

      resetValidation($(this).find('.form-group'));
    });

  });
}(jQuery);
