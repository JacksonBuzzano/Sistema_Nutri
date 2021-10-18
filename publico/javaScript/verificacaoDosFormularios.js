//pegar a url
const url_login = window.location.pathname;
const url_pagamento = window.location.pathname;

if (url_login === "/login-page") {
  const menu = document.getElementById("menu");
  menu.style.display = "none";
}

if (url_pagamento === "/form-pagamentos") {
  document.getElementById("section-div-pag").style.display = "none";
} else {
  document.getElementById("p-pag").style.display = "none";
  document.getElementById("texto-pag").style.display = "none";
}

//função para preencher os select das funções e setores
function valorOptionFuncao() {
  const url = window.location.pathname;
  if (url === "/form-usuario/cad-usuario") {
    var select = document.getElementById("funcao");
    var option = document.getElementById("option-funcao");
    var valor = select.options[select.selectedIndex];
    option.value = valor.value;
  } else {
    return false;
  }
}

function valorOptionMedico() {
  const url = window.location.pathname;
  if ( url != null) {
    var select = document.getElementById("medico");
    var option = document.getElementById("option-medico");
    var valor = select.options[select.selectedIndex];
    option.value = valor.value;
  } else {
    return false;
  }
}

function valorOptionSetor() {
  const url = window.location.pathname;
  if (url === "/form-usuario/cad-usuario") {
    var select = document.getElementById("setor");
    var option = document.getElementById("option-setor");
    var valor = select.options[select.selectedIndex].value;
    option.value = valor;
  } else {
    return false;
  }
}

//função pra aparecer a opção de carregando
function carregarSpinners() {
  const text_center = document.getElementById("text-center");
  text_center.style.display = "block";
}

//ATIVAR BOTÃO
function ativarBotão(valor) {
  const senha = document.getElementById("senha").value;

  if (senha.length < 5) {
    valor.style.border = "1px solid red";
  } else {
    valor.style.border = "";
  }
}

function confirmaSenha(valor) {
  const senha = document.getElementById("senha").value;
  const confirma = document.getElementById("confirma").value;

  if (senha != confirma) {
    valor.style.border = "1px solid red";
  } else {
    document.querySelector(".ativar-btn").disabled = false;
    valor.style.border = "";
  }
}

document.querySelector("[name=senha_sim]").onclick = function () {
  document.querySelector(".ativar-btn").disabled = true;
  document.getElementById("senha").disabled = false;
  document.getElementById("confirma").disabled = false;
  document.getElementById("trocar_senha_nao").checked = false;
};

document.querySelector("[name=senha_nao]").onclick = function () {
  document.querySelector(".ativar-btn").disabled = false;
  document.getElementById("senha").disabled = true;
  document.getElementById("confirma").disabled = true;
  document.getElementById("trocar_senha_sim").checked = false;
};

//função alert caso der erro nas pesquisas
function erroAlert() {
  const teste_alert = document.getElementById("valor-teste").value;
  const div_alert = document.getElementById("erro-alert");
  if (teste_alert === undefined || teste_alert === "") {
    div_alert.style.display = "block";
  } else {
    div_alert.style.display = "none";
  }
}

//chamada das funções
valorOptionSetor();
valorOptionFuncao();
valorOptionMedico();
erroAlert();
