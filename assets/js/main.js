$(function(){
  $('form').submit(function(e){
    if ($(this).attr('data-form-completed') == 'true'){
      $(this).hide();
      var inputs = $(this).find('input');
      inputs.each(function(){
        var title = $(this).attr('name');
        var content = $(this).val();

        $('.form-data-list').append('<li><span class="name">' +
          title + '</span>: ' + content + '</li>');
      });
    }
    e.preventDefault();
  });

  $(document).on('click', '#step1', function(){
    if (!validateForm('step-1')) return false;
    $(this).parents('.tab').hide().removeAttr('data-current-tab');
    $('#tab-step-2').attr('data-current-tab', true).show();
    $('#tab-step-2 div:first-child input').focus();
  });

  $(document).on('click', '#prev', function() {
    $(this).parents('.tab').hide().removeAttr('data-current-tab');
    $('#tab-step-1').show().attr('data-current-tab', true);
    $('#tab-step-1 div:first-child input').focus();
  });

  $(document).on('click', '#step2', function(){
    if (!validateForm('step-2')) return false;
    $(this).parents('.tab').hide().removeAttr('data-current-tab');
    $(this).parents('form').attr('data-form-completed', true);
    $('#tab-step-3').show().attr('data-current-tab', true);
  });

  function validateForm(step){
    var valid = true;
    var currentTab = $('.tab[data-current-tab="true"]');
    currentTab.find('input').each(function(){
      if ($(this).val() == "" || step == "step-1" && !isEmail($(this).val())){
        $(this).addClass('invalid');
        valid = false;
      } else {
        $(this).removeClass('invalid');
      }
    });
    if (valid) {
      currentTab.find('input').each(function(){
        $(this).removeClass('invalid');
      });
      $(this).data('step-completed', true);
    }
    return valid;
  }

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
});
