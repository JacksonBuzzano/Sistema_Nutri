//Carregando módulos
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fs = require('fs');
const { json } = require("body-parser");


//Rotas
router.get('/', function(req, res){ //LISTAR TODOS OS PACIENTES
    fetch('http://localhost:3000/pacientes', {method: 'GET'})
    .then(resposta => resposta.json())
    .then(resposta => res.render('form-pacient/lista-paciente',  {dados:resposta}))
});

router.get('/cad-paciente', function(req, res){ //ROTA PARA IR A TELA DE CADASTRO DE NOVO CLIETNE
    res.render('form-pacient/cadastrar-paciente');
});

router.post('/cad/novo', function(req, res){ // ROTA PARA CADASTRAR CLIETNE NOVO
    let erro = [];
    let nome = req.body.nome;
    let cidade  = req.body.cidade;
    let idade = req.body.idade;
    let endereco = req.body.endereco;
    let estado = req.body.estado;
    let email = req.body.email;
    let altura  = req.body.altura;
    let peso = req.body.peso;
    const id = Math.random().toString(32).substr(2, 9);

    if(!nome || !altura || !peso || !endereco){
       erro.push({texto: "OS campos nome, altura, peso e endereço, são obrigatórios!"});
    }
    if(erro.length > 0){
        res.render('form-pacient/cadastrar-paciente', {erros: erro});
    }else{
        const imc = (peso / (altura * 2)).toFixed(2);
        let dados = {
            'nome':nome,
            'idade':idade,
            'cidade':cidade,
            'endereco':endereco,
            'estado':estado,
            'email':email,
            'altura':altura,
            'peso':peso,
            'imc':imc
        };
        fetch('http://localhost:3000/pacientes', {
            method:'POST',
            body:JSON.stringify(dados),
            headers:{'Content-Type' : 'application/json'}
        }).then(res.redirect('/form-pacient'));
    }
 
});

router.get('/editar/:id', function(req, res){ //ROTA PARA SELECIOANR UM CLIENTE PELO ID
    let id = req.params.id;

    fetch('http://localhost:3000/pacientes/'+id, {method:'GET'})
    .then(resposta => resposta.json())
    .then(resposta => res.render('form-pacient/editar-paciente', {dados:resposta}))
});

router.post('/editar-paciente', function(req, res){ //ROTA PARA EDITAR O PACIENTE
    let id = req.body.id;
    let nome = req.body.nome;
    let cidade  = req.body.cidade;
    let idade = req.body.idade;
    let endereco = req.body.endereco;
    let estado = req.body.estado;
    let email = req.body.email;
    let altura  = req.body.altura;
    let peso = req.body.peso;

    const imc = (peso / (altura * 2)).toFixed(2);
    let dados = {
        'nome':nome,
        'idade':idade,
        'cidade':cidade,
        'endereco':endereco,
        'estado':estado,
        'email':email,
        'altura':altura,
        'peso':peso,
        'imc':imc
    };

    fetch('http://localhost:3000/pacientes/' + id, {
        method:'PUT',
        body:JSON.stringify(dados),
        headers:{'Content-Type' : 'application/json'}
    }).then(res.redirect('/form-pacient'));
   // console.log(id)
});

router.get('/excluir/:id', function(req, res){
    let id = req.params.id;

    fetch('http://localhost:3000/pacientes/' + id, {method:'DELETE',})
    .then(res.redirect('/form-pacient'));
})




module.exports = router;








