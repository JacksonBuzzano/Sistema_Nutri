//Verifica o peso e a alteura dos que já estão na lista no html, calculando o IMC
const pacientes = document.querySelectorAll(".paciente");

for(var i = 0 ; i < pacientes.length; i++){
    
    var paciente = pacientes[i];
    let peso = paciente.querySelector(".info-peso").textContent;
    let altura = paciente.querySelector(".info-altura").textContent;
       
    var pesoEhValido = validaPeso(peso);
    var AlturaEhValido = validaAltura(altura);
    
    if (!pesoEhValido){
        pesoEhValido = false;
        paciente.querySelector(".info-imc").textContent  = "Peso Inválido";
        paciente.classList.add("paciente-invalido");
    }
    
    if (!AlturaEhValido){
        AlturaEhValido = false;
        paciente.querySelector(".info-imc").textContent  = "Altura Inválida";
        paciente.classList.add("paciente-invalido");
    }
    
    if (AlturaEhValido && pesoEhValido)
    {
        paciente.querySelector(".info-imc").textContent = calcularImc(peso,altura);
    }
}

function validaPeso(peso){
    if (peso >= 0 && peso < 1000){
        return true;
    }else{
        return false;
    }
}

function validaAltura(altura){
    if (altura >=0 && altura <= 3){
        return true;
    }else{
        return false;
    }
    
}

function calcularImc(peso,altura){
    var imc = 0;
    imc = peso / (altura * altura);

    return imc.toFixed(2);
}
