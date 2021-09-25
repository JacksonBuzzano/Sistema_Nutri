//Carregando módulos
const express = require("express");
const router = express.Router();
const db = require("../../models/SQLPassword/login");

//Rotas
router.get("/", function (req, res) {
  res.render("login-page/login");
});

router.post("/logar", function (req, res) {
  (async () => {
    const nome = req.body.nome;
    const senha = req.body.senha;

    const dados = await db.verificaSenha();
    if (dados.find((user, index, array) => user.nm_nome === nome && user.nr_senha === senha)) {
        res.redirect("/form-agenda");
    } else {
      res.redirect("/login-page");
    }

  })();
});

module.exports = router;
