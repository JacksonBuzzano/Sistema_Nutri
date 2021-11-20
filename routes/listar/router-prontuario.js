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



module.exports = router;
