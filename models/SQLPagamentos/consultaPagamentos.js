//IMPORTAR CONECXÃO
const connect = require('../connection');

async function selectAgendaPag() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT b.nr_sequencia, a.nm_cliente, a.nm_endereco, a.nm_telefone, a.nm_cpf, ' + 
        'a.nm_email, b.nm_sala, a.nm_telefone FROM jb_cliente a, jb_agenda b WHERE a.nr_sequencia = b.nm_paciente ORDER BY nm_cliente');
    return rows;
}

async function selectPagamentoID(id) {
    const conn = await connect.connect();
    const sql = 'SELECT b.nr_sequencia, a.nm_cliente, a.nm_endereco, a.nm_telefone, a.nm_cpf, ' + 
        'a.nm_email, b.nm_sala, a.nm_telefone FROM jb_cliente a, jb_agenda b WHERE b.nr_sequencia =? AND a.nr_sequencia = b.nm_paciente';
    const [rows] = await conn.query(sql, [id]);    
    return rows;
}

module.exports = {
    selectAgendaPag,
    selectPagamentoID
}