//Carregando módulos
const express = require("express");
const bodyParser = require('body-parser');
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const fs = require('fs');

const lista_pacientes = require("./routes/listar/admin");


//Template
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body-parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Arquivos estáticos
app.use(express.static(path.join(__dirname, "/publico")));


//Rotas
app.use('/form-pacient', lista_pacientes);




//Servidor
app.listen(8080)