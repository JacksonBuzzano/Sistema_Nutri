var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click",function(){
    const resultado_api = new XMLHttpRequest();
    resultado_api.open("GET","http://localhost/Curso%20OnLine/Projeto%2001/Api.txt", true);

    resultado_api.addEventListener("load",function(){
        const erroAjax = document.querySelector("#erro-ajax");
        const filtar_api = document.getElementById('filtrar-api');
        
        if(resultado_api.status == 200){
            erroAjax.classList.add("invisivel");
            var resposta = resultado_api.responseText ;
            
            const pacientes = JSON.parse(resposta);

                for(var  i = 0; i < pacientes.length; i++){
                    if(filtar_api.value === pacientes[i].nome){
                        adicionaPacienteNaTabela(pacientes[i]);
                        filtar_api.value = "";
                        erroAjax.style.display = "none";
                        break;
                    }else{
                        erroAjax.style.display = "block";
                    }
                };

        }else{
            console.log(resultado_api.status);
            console.log(resultado_api.responseText);     

            erroAjax.classList.remove("invisivel")
        }
    });
 
    resultado_api.send();
    
});
