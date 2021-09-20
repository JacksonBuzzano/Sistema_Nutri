//IMPORTAR CONECXÃO
const connect = require('../connection');

async function verificaSenha() {
    const conn = await connect.connect();
    const sql = 'SELECT * FROM jb_usuarios';
    const [rows] = await conn.query(sql);
    return rows;  
}

module.exports = {
    verificaSenha
}