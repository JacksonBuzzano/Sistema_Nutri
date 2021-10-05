//SELECIONAR CAMPO ATIVO CONFORME VEM DO BANCO
const ie_ativo = document.getElementById("ie_valor").value;

if (ie_ativo != null) {
  function campoIeAtivo(valor) {
    valor === "S"
      ? (document.getElementById("inlineRadio1").checked = true)
      : (document.getElementById("inlineRadio2").checked = true);
  }
}
campoIeAtivo(ie_ativo);
