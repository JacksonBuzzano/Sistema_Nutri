//formatação do campo telefone
function mask(o, f) {
  setTimeout(function () {
    let v = mphone(o.value);
    if (v != o.value) {
      o.value = v;
    }
  }, 1);
}

function mphone(v) {
  let r = v.replace(/\D/g, "");
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

//formatação do campo e-mail
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

//formatação do campo CPF
function formataCPF(cpf) {
  const elementoAlvo = cpf;
  const cpfAtual = cpf.value;

  let cpfAtualizado;
  cpfAtualizado = cpfAtual.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    function (regex, argumento1, argumento2, argumento3, argumento4) {
      return (
        argumento1 + "." + argumento2 + "." + argumento3 + "-" + argumento4
      );
    }
  );
  elementoAlvo.value = cpfAtualizado;
}
