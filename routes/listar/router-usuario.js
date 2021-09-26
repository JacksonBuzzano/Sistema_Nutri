//Carregando módulos
const express = require("express");
const router = express.Router();
const db = require("../../models/SQLUsuario/consultaUauario");

//Rotas
router.get('/', function (req, res) {
  (async () => {
    const total_usuario = await db.selectTotalUser();
    await db.selectUsers()
      .then((usuarios) => res.render('form-usuario/lista-usuario', { dados: usuarios, total_usuario }));
  })();
});

router.get('/cad-usuario', function(req, res) {
    res.render('form-usuario/cadastrar-usuario');
});

router.post('/cadastrar/novo', function(req, res) {
    (async () =>{
        const dados = {
            'nm_nome': req.body.usuario,
            'nr_senha': req.body.senha,
            'nm_nome_usuario': req.body.nome,
            'dt_nascimento': req.body.data_nascimento,
            'nr_idade': req.body.idade,
            'nr_cpf': req.body.cpf,
            'nm_cidade': req.body.cidade,
            'nm_rua': req.body.endereco,
            'nr_numero': req.body.numero,
            'nm_bairro': req.body.bairro,
            'nm_telefone': req.body.telefone,
            'nm_setor': req.body.setor,
            'nm_email': req.body.email,
            'nm_funcao': req.body.funcao,
            'ie_ativo': req.body.ativo
        };
        await db.registerUsuario(dados);
        res.redirect('/form-usuario')
    })();
});

module.exports = router;
