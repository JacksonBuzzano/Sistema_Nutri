//Carregando módulos
const express = require("express");
const router = express.Router();

//Rotas
router.get('/', function (req, res) {
    res.render('form-prontuario/listas-prontuario')
});

router.get('/cad-prontuario', function(req, res) {
    res.render('form-prontuario/cad-prontuario')
});

router.post('/cad-prontuario', function(req, res) {
    (async () =>{
        const dados = {
            'nm_paciente': req.body.pacient, 
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
        }

        await db.registarProntuario(dados);
        res.redirect('/form-prontuario')
    })();

});



module.exports = router;
