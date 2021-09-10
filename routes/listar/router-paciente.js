//Carregando módulos
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const db = require("../../models/db");

//Rotas
router.get('/', function(req, res){ //LISTAR TODOS OS PACIENTES
    (async () => {
         await db.selectPatient()
        .then(clientes => res.render('form-pacient/lista-paciente',  {dados:clientes}));
    })();
});

router.get('/cad-paciente', function(req, res){ //ROTA PARA IR A TELA DE CADASTRO DE NOVO CLIETNE
    res.render('form-pacient/cadastrar-paciente');
});

router.post('/cad/novo', function(req, res){ // ROTA PARA CADASTRAR CLIETNE NOVO
    //const id = Math.random().toString(32).substr(2, 9);
    //calcular o imc  
    (async () =>{
        let altura  = req.body.altura;
        let peso = req.body.peso;
    
        const imc = (peso / (altura * 2)).toFixed(2);
        const dados = {
            'nm_cliente': req.body.nome,
            'dt_nascimento': req.body.data_nascimento,
            'nm_endereco': req.body.endereco,
            'nr_numero': req.body.numero,
            'nm_cidade': req.body.cidade,
            'nm_estado': req.body.estado,
            'nm_email': req.body.email,
            'nm_telefone': req.body.telefone,
            'nm_estado_civil': req.body.estado_civil,
            'nr_peso': peso,
            'nr_idade': req.body.idade,
            'nm_altura': altura,
            'nm_imc': imc
        };
        await db.registerPatient(dados);
        res.redirect('/form-pacient')
    })();
});

router.get('/editar/:id', function(req, res){ //ROTA PARA SELECIOANR UM CLIENTE PELO ID
    let id = req.params.id;
    
    (async () => {
        const [clientes] = await db.selectPatientID([id]);
        res.render('form-pacient/editar-paciente',  {dados:clientes});
    })();
});

router.post('/editar-paciente', function(req, res){ //ROTA PARA EDITAR O PACIENTE
    (async () => {
        const id = req.body.id;
        //calcular o imc
        let altura  = req.body.altura;
        let peso = req.body.peso;
        const imc = (peso / (altura * 2)).toFixed(2);
        
        const dados = {
            'nr_sequencia': id,
            'nm_cliente': req.body.nome,
            'dt_nascimento': req.body.data_nascimento,
            'nm_endereco': req.body.endereco,
            'nr_numero': req.body.numero,
            'nm_cidade': req.body.cidade,
            'nm_estado': req.body.estado,
            'nm_email': req.body.email,
            'nm_telefone': req.body.telefone,
            'nm_estado_civil': req.body.estado_civil,
            'nr_peso': peso,
            'nr_idade': req.body.idade,
            'nm_altura': altura,
            'nm_imc': imc
        };
            db.editPatient(id, dados);
            res.redirect('/form-pacient');
    })();
});

router.get('/excluir/:id', function(req, res){
    (async () => {
        const id = req.params.id;
        await db.deletePatient(id);
        res.redirect('/form-pacient');
    })();
})

module.exports = router;
