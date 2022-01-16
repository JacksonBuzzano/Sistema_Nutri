//Carregando módulos
const express = require("express");
const router = express.Router();
const db = require("../../models/SQLProntuario/consultaProntuario");
const db_consultaAgenda = require("../../models/SQLAgenda/consultAgenda");

//Rotas
router.get('/', function (req, res) {
    (async () => {
        const total_prontuario = await db.selectTotalProntuario()
        const medico = await db_consultaAgenda.selectMedico()
        await db.listarProntuario()
        .then(prontuario => res.render('form-prontuario/listas-prontuario',  {dados:prontuario, total_prontuario, medicos:medico}))
        .catch(erro =>  res.render('form-prontuario/listas-prontuario', {erro}));
    })();

 });

router.get('/prontuario', function(req, res) {
    (async () => {
        await db_consultaAgenda.selectMedico()
        .then(medicos => res.render('form-prontuario/cad-prontuario', {dados:medicos}))
        .catch(erro =>  res.render('form-prontuario/cad-prontuario', {erro}));
    })();
});

router.post('/editar-prontuario', function(req, res) {
    (async () =>{
        const id = req.body.id;
        const dados = {
            'nm_paciente': req.body.paciente, 
            'nm_cpf': req.body.cpf,
            'nm_telefone': req.body.telefone, 
            'nm_endereco': req.body.endereco, 
            'dt_data_nascimento': req.body.nascimento,
            'nm_plano_saude': req.body.plano, 
            'nm_medico': req.body.medico, 
            'dt_consulta': req.body.consulta, 
            'nm_historico_gest': req.body.historico, 
            'nm_historico_cirur': req.body.cirurgias, 
            'nm_medicamentos': req.body.medicamentos, 
            'nm_alergia': req.body.alergias, 
            'nm_sintomas': req.body.sintomas, 
            'nm_prescricao': req.body.prescricao, 
            'nm_habitos': req.body.habitos, 
            'nm_outras_inform': req.body.informacao
        };
        db.editProntuario(id, dados);
        res.redirect('/form-prontuario')
    })();
});

router.get('/editar/:id', function(req, res) {  
    (async () => {
        let id = req.params.id;
        const [prontuario] = await db.selectProntuarioID([id])
        res.render('form-prontuario/editar-prontuario', {dados:prontuario})
    })();
});

router.post('/filtro-prontuario', function(req, res) {
    (async () => {
        const nome = req.body.nome;
        const cpf = req.body.cpf;
        const medico = req.body.medico;
        const total = await db.selectTotalFiltro(nome, cpf, medico);
        const medicos= await db_consultaAgenda.selectMedico()
        await db.filtroPacienteProntuario(nome, cpf, medico)
        .then(result_paciente => res.render('form-prontuario/lista-filtro', {dados:result_paciente, total, medicos:medicos}));
    })(); 
})

module.exports = router;
