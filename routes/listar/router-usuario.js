//Carregando módulos
const express = require("express");
const router = express.Router();
const db = require("../../models/SQLUsuario/consultaUsuario");

//Rotas
router.get('/', function (req, res) {
  (async () => {
    const total_usuario = await db.selectTotalUser();
    await db.selectUsers()
      .then((usuarios) => res.render('form-usuario/lista-usuario', { dados: usuarios, total_usuario }))
      .catch(erro => res.render('form-usuario/lista-usuario', {erro}));
  })();
});

router.get('/cad-usuario', function(req, res) {
    (async () => {
        const [setor_user] = await db.selectUserSetor();
        await db.selectFuncaoUser()
        .then((funcao_user) =>  res.render('form-usuario/cadastrar-usuario', {dados:funcao_user, valor:setor_user}));
    })();
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

router.get('/editar/:id', function(req, res) {
    let id = req.params.id;
    (async () => {
        const [usuario] = await db.selectUsersID([id]);
        res.render('form-usuario/editar-usuario', {dados:usuario});
    })();
});

router.post('/editar-usuario', function(req, res) {
    (async () => {   
        const id = req.body.id;     
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
            db.editUsers(id, dados);
            res.redirect('/form-usuario');
    })();
});

router.post('/pesquisa-usuario', function(req, res) {
    (async () => {
        let nome_usuario = req.body.nome;
        let cpf_usuario= req.body.cpf;
        let setor_usuario = req.body.setor;
        let funcao_usuario = req.body.funcao;
        let ativo_usuario = req.body.ativo;

        const total_usuario = await db.selectTotalUserFilter(
            nome_usuario, 
            cpf_usuario, 
            setor_usuario, 
            funcao_usuario, 
            ativo_usuario)
        await db.pesquisarUsuario(
            nome_usuario, 
            cpf_usuario, 
            setor_usuario, 
            funcao_usuario, 
            ativo_usuario)
        .then(resul_usuario => res.render('form-usuario/filtro-usuario', {dados:resul_usuario, total_usuario}))
        .catch(erro => res.render('form-usuario/filtro-usuario', {erro}));
    })();
});

module.exports = router;
