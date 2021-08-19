var botaoAdicionar = document.querySelector("#buscar-pacientes");
const erro_busca_pac = document.getElementById("alert");
const erroAjax = document.getElementById("alerta");
const filtar_api = document.getElementById("filtrar-api");

botaoAdicionar.addEventListener("click",function(){
    const resultado_api = new XMLHttpRequest();
    resultado_api.open("GET","http://localhost/Curso%20OnLine/Projeto%2001/lista/lista.json", true);

    resultado_api.addEventListener("load",function(){

        if(resultado_api.status == 200){
            var resposta = resultado_api.responseText ;
            
            const pacientes = JSON.parse(resposta);

                for(var  i = 0; i < pacientes.length; i++){
                    if(filtar_api.value.toUpperCase() === pacientes[i].nome.toUpperCase()){
                        adicionaPacienteNaTabela(pacientes[i]);
                        filtar_api.value = "";
                        erro_busca_pac.style.display = "none";
                        break;
                    }else{
                        erro_busca_pac.style.display = "block";
                    }
                };

        }else{
            erroAjax.style.display = "block";
        }
    });
 
    resultado_api.send();
    
});
