function check_input_value() {
  var inputboxvalue = document.getElementById('joincode')

  if (inputboxvalue.value == "") {
    document.getElementById("entermessage").style.display = "none";
    inputboxvalue.classList.add('lightwhite');
    inputboxvalue.classList.remove('red');
    inputboxvalue.classList.remove('green');
  }

  if (inputboxvalue.value != "") {


    if (inputboxvalue.value.length == 8 && roomList.indexOf(inputboxvalue.value) != -1) {
      document.getElementById("entermessage").style.display = "block";
      document.getElementById("entermessage").classList.remove('light');
      inputboxvalue.classList.add('green');
      inputboxvalue.classList.remove('lightwhite');
      inputboxvalue.classList.remove('red');

    } else {
      document.getElementById("entermessage").style.display = "block";
      inputboxvalue.classList.add('red');
      inputboxvalue.classList.remove('lightwhite');
      inputboxvalue.classList.remove('green');
      document.getElementById("entermessage").classList.add('light');
    }
  }
}

function open_game() {
  var inputboxvalue = document.getElementById('joincode')

  if (keyCode == ENTER && inputboxvalue.value.length == 8 && roomList.indexOf(inputboxvalue.value) != -1) {

    window.location.href = (indow.location.href + '/multiplayer/' + inputboxvalue.value);

  }
}