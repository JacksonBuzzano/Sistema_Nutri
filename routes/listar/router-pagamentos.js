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

router.get('/verifica/:id', function(req, res) {

    const id = req.params.id;
    (async () => {
        const [pagamento] = await db.selectPagamentoID([id]);
        await db.selectAgendaPag()
        .then((teste) => res.render('form-pagamentos/lista-pagamento', {dados:teste, result:pagamento}));
    })();
});

module.exports = router;