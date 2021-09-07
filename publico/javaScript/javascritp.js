function voltarPagina() {
    swal({
      title: "Atenção!",
      text: "Deseja sair sem salvar?!",
      icon: "warning",
      buttons: true,
    }).then(function(result) {
      if (result) {
        window.location.href="http://localhost:8080/form-pacient";
      } else {
        //window.location.href="http://localhost:8080/form-pacient/cad-paciente";
      }
    });
  }

