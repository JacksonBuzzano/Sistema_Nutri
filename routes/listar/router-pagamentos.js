//Carregando módulos
const express = require("express");
const router = express.Router();
const db = require("../../models/SQLPagamentos/consultaPagamentos");
const db_agenda = require("../../models/SQLAgenda/consultAgenda");

//Rotas
 router.get('/', function(req, res) {
    (async () =>{
        const total_pagamento = await db_agenda.agendaTotal();
        await db.selectAgendaPag()
        .then(pagamento => res.render('form-pagamentos/lista-pagamento',  {dados:pagamento, total_pagamento}))
        .catch(erro =>  res.render('form-pagamentos/lista-pagamento', {erro}));
    })();
});

router.post('/', function(req, res) {
    (async () => {
        const id = req.body.id;
        const total_pagamento = await db_agenda.agendaTotal();
        const [pagamento] = await db.selectPagamentoID([id]);
        await db.selectAgendaPag()
        .then((teste) => res.render('form-pagamentos/lista-pagamento', {dados:teste, result:pagamento, total_pagamento}));
    })();
});

router.post('/registrar-pagamento', function(req, res) {
    (async ()=> {
        const ie_ativo = "N";
        const id = req.body.id;
        const dados = {
            'nr_cod_agendamento': req.body.id,
            'nm_cliente': req.body.nome,
            'nm_cpf': req.body.cpf,
            'dt_nascimento': req.body.data_nascimento,
            'nm_estado': req.body.estado,
            'nm_cidade': req.body.cidade,
            'nm_endereco': req.body.endereco,
            'nm_telefone': req.body.telefone,
            'nm_medico_respon': req.body.medico,
            'nm_sala': req.body.sala,
            'vl_valor': req.body.valor,
            'nm_forma_pagamento': req.body.pagamento
        }
        await db.realizaPagamento(dados);
        await db_agenda.editAgendaPag(id, ie_ativo)
        res.redirect('/form-pagamentos');
    })();
});

router.post('/pesquisa-cliente', function(req, res) {  
    (async () => {
        const paciente = req.body.nome;
        const total_pagamento = await db.selectTotalPagFilter(paciente);
        await db.selectAgendaPagID(paciente)
        .then(result => res.render('form-pagamentos/lista-pagamento', {dados:result, total_pagamento}))
        .catch(erro => res.render('form-pagamentos/lista-pagamento'));
    })();
})

module.exports = router;