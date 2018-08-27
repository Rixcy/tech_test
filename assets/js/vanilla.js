$(function(){
  var form = document.getElementById("contact-info");
  var step1 = document.getElementById("step1");
  var step2 = document.getElementById("step2");
  var tab1 = document.getElementById("tab-step-1");
  var tab2 = document.getElementById("tab-step-2");
  var tab3 = document.getElementById("tab-step-3");
  var prev = document.getElementById("prev");

  form.onsubmit = function(e){
    if (this.getAttribute('data-form-completed')){
      this.style.display = "none";
      var inputs = form.querySelectorAll('input');
      var fdl = document.getElementsByClassName('form-data-list')[0];

      inputs.forEach(function(element){
        var title = document.createTextNode(element.getAttribute('name'));
        var content = document.createTextNode(': ' + element.value);

        var para = document.createElement('p');
        var span = document.createElement('span');

        span.className = "name";
        span.appendChild(title);
        para.appendChild(span);
        para.appendChild(content);
        fdl.appendChild(para);
      })
    }
    e.preventDefault();
  }

  step1.onclick = function(){
    if (!validateForm('step-1')) return false;
    this.closest('.tab').style.display = "none";
    this.closest('.tab').removeAttribute('data-current-tab');
    tab2.style.display = "block";
    tab2.setAttribute('data-current-tab', true);
    tab2.children[0].querySelector('input').focus();
  }

  step2.onclick = function(){
    if (!validateForm('step-2')) return false;
    this.closest('.tab').style.display = "none";
    this.closest('.tab').removeAttribute('data-current-tab');
    form.setAttribute('data-form-completed', true);
    tab3.style.display = "block";
    tab3.setAttribute('data-current-tab', true);
  }

  prev.onclick = function(){
    // clear up any validation errors on tab switches
    clearInvalidClasses(tab2);
    this.closest('.tab').style.display = "none";
    this.closest('.tab').removeAttribute('data-current-tab');
    tab1.style.display = "block";
    tab1.setAttribute('data-current-tab', true);
    tab1.children[0].querySelector('input').focus();
  }

  function validateForm(step){
    var valid = true;
    var currentTab = document.querySelector('.tab[data-current-tab="true"]');

    currentTab.querySelectorAll('input').forEach(function(element){
      if (element.value == "" || step == 'step-1' && !isEmail(element.value)){
        element.classList.add('invalid');
        valid = false;
      } else {
        element.classList.remove('invalid'); 
      }
    });

    if (valid) {
      clearInvalidClasses(currentTab);
      currentTab.setAttribute('data-step-completed', true);
    }
    return valid;
  }

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function clearInvalidClasses(tab){
    tab.querySelectorAll('input').forEach(function(element){
      element.classList.remove('invalid');
    });
  }
});