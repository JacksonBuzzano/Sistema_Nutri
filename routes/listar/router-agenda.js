//Carregando módulos
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//Rotas
/*
router.get('/', function(req, res){ //LISTAR TODAS AS AGENDA
    fetch('http://localhost:3000/agenda', {method: 'GET'})
    .then(resposta => resposta.json())
    .then(resposta => res.render('form-agenda/lista-agenda',  {dados:resposta}))
});

router.get('/cad-agenda', function(req, res){ //ROTA PARA IR A TELA DE CADASTRO DE UMA NOVA AGENDA
    res.render('form-agenda/registrar-agenda');
});

router.post('/cad-novo/agenda', function(req, res){ // ROTA PARA CADASTRAR NOVA AGENDA
    let erro = [];
    let paciente = req.body.paciente;
    let data  = req.body.data;
    let hora = req.body.hora;
    let medico = req.body.medico;
    let sala = req.body.sala;
    const id = Math.random().toString(32).substr(2, 9);

    if(!paciente || !data || !medico){
       erro.push({texto: "OS campos paciente, data, e medico, são obrigatórios!"});
    }
    if(erro.length > 0){
        res.render('form-agenda/registrar-agenda', {erros: erro});
    }else{
        let dados = {
            'id': id,
            'paciente':paciente,
            'data':data,
            'hora':hora,
            'medico':medico,
            'sala':sala,
        };
        fetch('http://localhost:3000/agenda', {
            method:'POST',
            body:JSON.stringify(dados),
            headers:{'Content-Type' : 'application/json'}
        }).then(res.redirect('/form-agenda'));
    }
});

router.get('/editar/:id', function(req, res){ //ROTA PARA SELECIOANR UM CLIENTE PELO ID
    let id = req.params.id;

    fetch('http://localhost:3000/agenda/'+id, {method:'GET'})
    .then(resposta => resposta.json())
    .then(resposta => res.render('form-agenda/editar-agenda', {dados:resposta}))
});

router.post('/editar-agenda', function(req, res){ //ROTA PARA EDITAR O PACIENTE
    let id = req.body.id;
    let paciente = req.body.paciente;
    let data  = req.body.data;
    let hora = req.body.hora;
    let medico = req.body.medico;
    let sala = req.body.sala;

    let dados = {
        'paciente':paciente,
        'data':data,
        'hora':hora,
        'medico':medico,
        'sala':sala,
    };

    fetch('http://localhost:3000/agenda/' + id, {
        method:'PUT',
        body:JSON.stringify(dados),
        headers:{'Content-Type' : 'application/json'}
    }).then(res.redirect('/form-agenda'));
});

*/






module.exports = router;