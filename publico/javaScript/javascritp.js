//função pra aparecer a opção de carregando
function carregarSpinners() {
  const text_center = document.getElementById("text-center");
  text_center.style.display = "block";
}
//FORMATAÇÃO DO TELEFONE
function mask(o, f) {
  setTimeout(function () {
    var v = mphone(o.value);
    if (v != o.value) {
      o.value = v;
    }
  }, 1);
}

function mphone(v) {
  var r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    r = r.replace(/^(\d*)/, "($1");
  }
  return r;
}
//FORMATAÇÃO DO EMAIL
function verifica() {
  if (document.forms[0].email.value.length == 0) {
    alert("Por favor, informe o seu EMAIL.");
    document.frmEnvia.email.focus();
    return false;
  } else {
    return true;
  }
}

function checarEmail() {
  if (
    document.forms[0].email.value == "" ||
    document.forms[0].email.value.indexOf("@") == -1 ||
    document.forms[0].email.value.indexOf(".") == -1
  ) {
    alert("Por favor, informe um E-MAIL válido!");
    return false;
  }
}

/*CASO FOR PAGINA DE LOGIN NÃO MOSTRAR O MENU*/
const url = window.location.pathname;

if (url === "/login-page") {
  const menu = document.getElementById("menu");
  menu.style.display = "none";
}

/*CALCULAR IDADE SOZINHO*/
document.getElementById("data").addEventListener("change", function () {
  var data = new Date(this.value);
  if (isDate_(this.value) && data.getFullYear() > 1900)
    document.getElementById("idade").value = calculaIdade(this.value);
});

function calculaIdade(dobString) {
  var dob = new Date(dobString);
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var birthdayThisYear = new Date(currentYear, dob.getMonth(), dob.getDate());
  var age = currentYear - dob.getFullYear();
  if (birthdayThisYear > currentDate) {
    age--;
  }
  console.log(age);
  return age;
}

function calcular(data) {
  var data = document.form.nascimento.value;
  alert(data);
  var partes = data.split("/");
  var junta = partes[2] + "-" + partes[1] + "-" + partes[0];
  document.form.idade.value = calculaIdade(junta);
}

var isDate_ = function (input) {
  var status = false;
  if (!input || input.length <= 0) {
    status = false;
  } else {
    var result = new Date(input);
    if (result == "Invalid Date") {
      status = false;
    } else {
      status = true;
    }
  }
  console.log(status);
  return status;
};
