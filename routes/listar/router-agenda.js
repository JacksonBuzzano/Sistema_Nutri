//Carregando módulos
const express = require("express");
const router = express.Router();
const db = require("../../models/SQLAgenda/consultAgenda");
const db_paciente = require("../../models/SQLPatients/consultPatients")

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
        let nome_paciente = req.body.nome;
        let nome_medico = req.body.medico;
        const total_agenda = await db.selectTotalAgendaFilter(nome_paciente, nome_medico)
        await db.selectPatientName(nome_paciente, nome_medico)
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

router.get('/selecionar-cliente/:nome?/:id?/:contato?/:endereco?/:nascimento?', function(req, res) {
    const nome_cliente = req.params.nome;
    const nr_sequencia = req.params.id;
    const nm_contato = req.params.contato;
    const nm_endereco = req.params.endereco;
    const dt_nascimento = req.params.nascimento;
    res.render('form-agenda/registrar-agenda', {nome_cliente, nr_sequencia, nm_contato, nm_endereco, dt_nascimento});
});

router.post('/cad-novo/agenda', function(req, res) {
    (async () => {
        const dados = {
            'nm_paciente': req.body.id,
            'nm_contato': req.body.contato,
            'nm_endereco': req.body.endereco,
            'dt_data': req.body.data,
            'nr_hora': req.body.hora,
            'nm_sala': req.body.sala,
            'dt_nascimento': req.body.nascimento,
            'nm_medico': req.body.medico,
            'ie_ativo': req.body.ativo
        }
        await db.registerAgenda(dados);
        res.redirect('/form-agenda')
    })();
});

router.get('/editar/:id', function(req, res) {  
    (async () => {
        let id = req.params.id;
        const [agenda] = await db.selectAgendaID([id]);
        res.render('form-agenda/editar-agenda', {dados:agenda});
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
            'nm_medico': req.body.medico,
            'nm_contato': req.body.contato,
            'nm_endereco': req.body.endereco,
            'dt_nascimento': req.body.nascimento
        };
        await db.editAgenda(id, dados);
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
