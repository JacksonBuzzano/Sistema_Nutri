var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click",function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost/Curso%20OnLine/Projeto%2001/Api.txt", true);

    xhr.addEventListener("load", function(){
        var erroAjax = document.querySelector("#erro-ajax");
        if(xhr.status == 200){
            erroAjax.classList.add("invisivel");
            var resposta = xhr.responseText ;
            
            var pacientes = JSON.parse(resposta);

            pacientes.forEach(function(paciente) {
               adicionaPacienteNaTabela(paciente);
            });

        }else{
            console.log(xhr.status);
            console.log(xhr.responseText);     

            erroAjax.classList.remove("invisivel")
        }
    });
 
    xhr.send();
    
});
