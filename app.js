//Carregando módulos
const express = require("express");
const bodyParser = require('body-parser');
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();

//const db = require("./conection/db");
const form_pacientes = require("./routes/listar/router-paciente");
const form_agenda = require("./routes/listar/router-agenda");
const login_page = require("./routes/login/router-login");
const form_usuario = require("./routes/listar/router-usuario");
const form_pagamentos = require("./routes/listar/router-pagamentos");


//Template
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body-parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Arquivos estáticos
app.use(express.static(path.join(__dirname, "/publico")));


//Rotas
app.use('/login-page', login_page)
app.use('/form-pacient', form_pacientes);
app.use('/form-agenda', form_agenda);
app.use('/form-usuario', form_usuario);
app.use('/form-pagamentos', form_pagamentos);

//Servidor
app.listen(8080)
