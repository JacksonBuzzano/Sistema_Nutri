//CONECÇÃO COM O BANCO DE DADOSS
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: 'localhost', // O host do banco. Ex: localhost
        user: 'root', // Um usuário do banco. Ex: user 
        password: '', // A senha do usuário. Ex: user123
        database: 'sistema_clinica'
    });
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = {connect}