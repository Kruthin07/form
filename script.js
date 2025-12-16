$(function () {
  const $form = $('#regForm');
  const $result = $('#resultArea');

  function clearErrors() {
    $form.find('.form-group').removeClass('error');
    $form.find('.fieldset-group').removeClass('error');
    $form.find('.error-text').text('');
  }

  function showFieldError($group, message) {
    $group.addClass('error');
    $group.find('.error-text').text(message);
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    const first = $('#firstName').val().trim();
    const last = $('#lastName').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const dob = $('#dob').val();
    const age = $('#age').val().trim();
    const country = $('#country').val();
    const address = $('#address').val().trim();
    const bio = $('#bio').val().trim();

    if (!first) {
      showFieldError($('#firstName').closest('.form-group'), 'First name is required.');
      valid = false;
    }
    if (!last) {
      showFieldError($('#lastName').closest('.form-group'), 'Last name is required.');
      valid = false;
    }

    if (!email) {
      showFieldError($('#email').closest('.form-group'), 'Email is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError($('#email').closest('.form-group'), 'Enter a valid email.');
      valid = false;
    }

    if (!/^\d{10}$/.test(phone)) {
      showFieldError($('#phone').closest('.form-group'), 'Phone must be 10 digits.');
      valid = false;
    }

    if (!dob) {
      showFieldError($('#dob').closest('.form-group'), 'Date of birth is required.');
      valid = false;
    }

    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum <= 0) {
      showFieldError($('#age').closest('.form-group'), 'Enter a valid age.');
      valid = false;
    }

    if (!country) {
      showFieldError($('#country').closest('.form-group'), 'Select a country.');
      valid = false;
    }

    if ($('input[name="gender"]:checked').length === 0) {
      showFieldError($('#genderGroup'), 'Select a gender.');
      valid = false;
    }

    if ($('input[name="skills[]"]:checked').length === 0) {
      showFieldError($('#skillsGroup'), 'Select at least one skill.');
      valid = false;
    }

    if (!address) {
      showFieldError($('#address').closest('.form-group'), 'Address is required.');
      valid = false;
    }

    if (!bio) {
      showFieldError($('#bio').closest('.form-group'), 'Short bio is required.');
      valid = false;
    }

    return valid;
  }

  $('#resetBtn').on('click', () => {
    $form[0].reset();
    clearErrors();
    $result.addClass('hidden').empty();
    $('html, body').animate({ scrollTop: 0 }, 350);
  });

  $form.on('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
      const $firstError = $('.form-group.error, .fieldset-group.error').first();
      if ($firstError.length) {
        $('html, body').animate({ scrollTop: $firstError.offset().top - 90 }, 350);
      }
      return;
    }

    $.ajax({
      url: 'process.php',
      type: 'POST',
      data: $form.serialize(),
      success: function (response) {
        $result.removeClass('hidden').html(response);
        $('html, body').animate({ scrollTop: $result.offset().top - 90 }, 450);
      },
      error: function () {
        $result
          .removeClass('hidden')
          .html('<p style="color:#dc2626;">Server error. Try again.</p>');
      }
    });
  });
});
