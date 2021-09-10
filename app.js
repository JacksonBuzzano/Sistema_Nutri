//Carregando módulos
const express = require("express");
const bodyParser = require('body-parser');
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();

//const db = require("./conection/db");
const form_pacientes = require("./routes/listar/router-paciente");
const form_agenda = require("./routes/listar/router-agenda")


//Template
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body-parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Arquivos estáticos
app.use(express.static(path.join(__dirname, "/publico")));


//Rotas
app.use('/form-pacient', form_pacientes);
app.use('/form-agenda', form_agenda);


/*index.js
(async () => {
    console.log('Começou!');
 
    console.log('SELECT * FROM jb_cliente');
    const clientes = await db.selectCustomers();
    console.log(clientes);
})();*/




//Servidor
app.listen(8080)