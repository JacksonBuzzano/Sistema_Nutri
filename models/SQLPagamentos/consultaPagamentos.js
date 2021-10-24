//IMPORTAR CONECXÃO
const connect = require('../connection');

async function selectAgendaPag() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT b.nr_sequencia, a.nm_cliente, a.nm_endereco, a.nm_telefone, a.nm_cpf, ' + 
        'a.nm_email, b.nm_sala, a.nm_telefone FROM jb_cliente a, jb_agenda b WHERE a.nr_sequencia = b.nm_paciente AND b.ie_ativo = "S" ORDER BY nm_cliente');
    return rows;
}

async function selectPagamentoID(id) {
    const conn = await connect.connect();
    const sql = 'SELECT b.nr_sequencia, a.nm_cliente, a.nm_cpf, b.dt_nascimento, a.nm_estado, a.nm_cidade, a.nm_endereco,' + 
        'a.nm_telefone, b.nm_sala, b.nm_medico FROM jb_cliente a, jb_agenda b WHERE b.nr_sequencia =? AND a.nr_sequencia = b.nm_paciente';
    const [rows] = await conn.query(sql, [id]);
    return rows;
}

async function realizaPagamento(values) {
    const conn = await connect.connect();
    const sql = 'INSERT INTO jb_pagamentos (nr_cod_agendamento, nm_cliente, nm_cpf, dt_nascimento, nm_estado, nm_cidade,' +
        'nm_endereco, nm_telefone, nm_medico_respon, nm_sala, vl_valor, nm_forma_pagamento) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    const customers = [values.nr_cod_agendamento, values.nm_cliente, values.nm_cpf, values.dt_nascimento, values.nm_estado,
            values.nm_cidade, values.nm_endereco, values.nm_telefone, values.nm_medico_respon, values.nm_sala,
            values.vl_valor, values.nm_forma_pagamento];
    const rows = await conn.query(sql, customers);
    return rows; 
}

async function selectAgendaPagID(values) {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT b.nr_sequencia, a.nm_cliente, a.nm_endereco, a.nm_telefone, a.nm_cpf, ' + 
        'a.nm_email, b.nm_sala, a.nm_telefone FROM jb_cliente a, jb_agenda b WHERE a.nm_cliente LIKE "' + values  + '%"' +
        'AND  a.nr_sequencia = b.nm_paciente  AND b.ie_ativo = "S" ORDER BY a.nm_cliente');
    return rows;
}

async function selectTotalPagFilter(nome) {
    const conn = await connect.connect();
    const sql = 'SELECT COUNT(*) AS Total FROM jb_cliente a, jb_agenda b WHERE a.nm_cliente LIKE "' + nome + '%"' +
                'AND b.nm_paciente = a.nr_sequencia AND b.ie_ativo = "S" ORDER BY a.nm_cliente';
    const [rows] = await conn.query(sql);
    return rows[0].Total;
}

module.exports = {
    selectAgendaPag,
    selectPagamentoID,
    realizaPagamento,
    selectAgendaPagID,
    selectTotalPagFilter
}