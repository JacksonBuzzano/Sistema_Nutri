//função pra aparecer a opção de carregando
function carregarSpinners(){
  const text_center = document.getElementById('text-center');
  text_center.style.display = 'block';
}
//FORMATAÇÃO DO TELEFONE
function mask(o, f) {
  setTimeout(function() {
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
    alert('Por favor, informe o seu EMAIL.');
  document.frmEnvia.email.focus();
    return false;
  }else{
    return true;
  }
  
}
   
function checarEmail(){
if( document.forms[0].email.value=="" 
   || document.forms[0].email.value.indexOf('@')==-1 
     || document.forms[0].email.value.indexOf('.')==-1 )
  {
     alert( "Por favor, informe um E-MAIL válido!" );
     return false;
     
  }
}

/*CASO FOR PAGINA DE LOGIN NÃO MOSTRAR O MENU*/
const url = window.location.pathname;

if(url === "/login-page"){
  const menu = document.getElementById('menu');
  menu.style.display = "none";
}

