//Carregando módulos
const express = require("express");
const router = express.Router();
const db = require("../../models/SQLAgenda/consultAgenda");
const db_paciente = require("../../models/SQLPatients/consultPatients");

//Rotas
router.get('/', function(req, res) {
    (async () => {
        const total_agenda = await db.agendaTotal()
        await db.selectAgenda()
        .then(agenda => res.render('form-agenda/lista-agenda', {dados:agenda, total_agenda}))
        .catch(erro =>  res.render('form-agenda/lista-agenda', {erro}));
    })();
});

router.post('/', function(req, res) {
    (async () => {
        const nome_paciente = req.body.nome;
        const nome_medico = req.body.medico;
        const ie_ativo = req.body.ativo;
        const total_agenda = await db.selectTotalAgendaFilter(nome_paciente, nome_medico, ie_ativo)
        await db.selectPatientName(nome_paciente, nome_medico, ie_ativo)
        .then(resul_agenda => res.render('form-agenda/lista-agenda', {dados:resul_agenda, total_agenda}))
        .catch(erro => res.render('form-agenda/lista-agenda', {erro}));
    })();
});

router.get('/cad-agenda', function(req, res) {
    res.render('form-agenda/registrar-agenda')
});

router.post('/filtro-pessoa', function(req, res) {
    (async () => {
        let nome_paciente = req.body.nome;
        const total_agenda = await db_paciente.selectTotalPatientsFilter(nome_paciente)
        await db.pesquisaClient(nome_paciente)
        .then(resul_agenda => res.render('form-agenda/filtro-agenda', {dados:resul_agenda, total_agenda}))
        .catch(erro => res.render('form-agenda/filtro-agenda', {erro}));
    })();
});

router.get('/selecionar-cliente/:nome?/:id?/:contato?/:endereco?/:nascimento?/:cpf?', function(req, res) {
    (async () => {
        const nome_cliente = req.params.nome;
        const nr_sequencia = req.params.id;
        const nm_contato = req.params.contato;
        const nm_endereco = req.params.endereco;
        const dt_nascimento = req.params.nascimento;
        const nm_cpf = req.params.cpf;
        await db.selectMedico()
        .then(medico => res.render('form-agenda/registrar-agenda', {nome_cliente, nr_sequencia, nm_contato, 
            nm_endereco, dt_nascimento, nm_cpf, medicos:medico}))
        .catch(erro => res.render('form-agenda/registrar-agenda', erro));
    })();

});

router.post('/cad-novo/agenda', function(req, res) {
    (async () => {
        const dados = {
            'nm_paciente': req.body.id,
            'nm_contato': req.body.contato,
            'nm_cpf': req.body.cpf,
            'nm_endereco': req.body.endereco,
            'dt_data': req.body.data,
            'nr_hora': req.body.hora,
            'nm_sala': req.body.sala,
            'dt_nascimento': req.body.nascimento,
            'nm_medico': "Dr.(a) " + req.body.medico,
            'ie_ativo': req.body.ativo
        }
        const dadosProntuario = {
            'nm_paciente': req.body.paciente
        }
           
        await db.registerAgenda(dados);
        await db.inserirProntuário(dados, dadosProntuario)
        res.redirect('/form-agenda')
    })();
});

router.get('/editar/:id', function(req, res) {  
    (async () => {
        let id = req.params.id;
        const [agenda] = await db.selectAgendaID([id])
        await db.selectMedico() 
        .then(medico => res.render('form-agenda/editar-agenda', {dados:agenda, medicos:medico}))
        .catch(erro => res.render('form-agenda/editar-agenda', erro));
    })();
});

router.post('/editar-agenda', function(req, res) {
    (async () =>{
        const id = req.body.id;
        const dados = {
            'nm_paciente': req.body.paciente,
            'dt_data': req.body.data,
            'nr_hora': req.body.hora,
            'nm_sala': req.body.sala,
            'nm_medico':"Dr.(a) " + req.body.medico,
            'nm_contato': req.body.contato,
            'nm_endereco': req.body.endereco,
            'dt_nascimento': req.body.nascimento
        };

        const dadosProntuario = {
            'nm_paciente': req.body.cliente,
        }

        await db.editAgenda(id, dados);
        db.editProntuario(id, dados, dadosProntuario)
        res.redirect('/form-agenda')
    })();
});

router.get('/excluir/:id', function(req, res) {
    (async () => {
        const id = req.params.id;
        await db.deleteAgenda(id);
        res.redirect('/form-agenda');
    })();
})

module.exports = router;
