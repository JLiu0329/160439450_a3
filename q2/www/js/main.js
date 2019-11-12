function myFunction() {
 document.getElementById("demo").innerHTML = "Paragraph changed.";
}
function validateEmail() {
  var email = document.getElementById("email").value;

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var test = re.test(String(email).toLowerCase());

  if (!test) {
    alert('Please enter a valid email address.')

    return false;
  }

  return true;
}

function validateUsername() {
  var username = document.getElementById("username").value;

  if (username == '') {
    alert("Please enter a valid Username");
    document.getElementById("username").focus();

    return false;
  }

  return true;
}




function validatePassword() {
  var password = document.getElementById("password").value;

  if (password == '') {
    alert("Please enter a valid Password");

    return false;
  }

  return true;
}

function validateForm() {
  if (!validateEmail()) {
    return false;
  }

  if (!validateUsername()) {
    return false;
  }

  if (!validatePassword()) {
    return false;
  }

  return true;
}

function showPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function checkEmpty() {
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;


  return email == '' || username == '' || password == '';
}
