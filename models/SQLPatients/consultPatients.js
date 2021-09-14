//IMPORTAR CONECXÃO
const connect = require('../connection');

async function registerPatient(values) {
    const conn = await connect.connect();
    const sql = 'INSERT INTO jb_cliente (nm_cliente, dt_nascimento, nm_endereco, nr_numero, nm_cidade, nm_estado,' + 
        'nm_email, nm_telefone, nm_estado_civil, nr_peso, nr_idade, nm_altura, nm_imc) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const customers = [values.nm_cliente, values.dt_nascimento, values.nm_endereco, values.nr_numero, values.nm_cidade, 
        values.nm_estado, values.nm_email, values.nm_telefone, values.nm_estado_civil, values.nr_peso, values.nr_idade,
        values.nm_altura, values.nm_imc];
    const rows = await conn.query(sql, customers);
    return rows;
}

async function selectPatient() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT * FROM jb_cliente');
    return rows;
};

async function selectPatientName(values) {
    const conn = await connect.connect();
    const sql = 'SELECT * FROM jb_cliente WHERE nm_cliente LIKE "' + values + '%"';
    const [rows] = await conn.query(sql);
    return rows;
}

async function selectTotalPatientsFilter(values) {
    const conn = await connect.connect();
    const sql = 'SELECT COUNT(*) AS Total FROM jb_cliente WHERE nm_cliente LIKE "' + values + '%"';
    const [rows] = await conn.query(sql);
    return rows[0].Total;
}

async function selectPatientID(id) {
    const conn = await connect.connect();
    const sql =  'SELECT * FROM jb_cliente where nr_sequencia = ?';
    const [rows] = await conn.query(sql, [id]);
    return rows;
};

async function editPatient(id, values) {
    const conn = await connect.connect();
    const sql = 'UPDATE jb_cliente SET  nm_cliente=?, dt_nascimento=?, nm_endereco=?, nr_numero=?, nm_cidade=?,' + 
        'nm_estado=?, nm_email=?, nm_telefone=?, nm_estado_civil=?, nr_peso=?, nr_idade=?, nm_altura=?, nm_imc=? WHERE nr_sequencia=?';
    const customers = [values.nm_cliente, values.dt_nascimento, values.nm_endereco, values.nr_numero, values.nm_cidade, 
        values.nm_estado, values.nm_email, values.nm_telefone, values.nm_estado_civil, values.nr_peso, values.nr_idade,
        values.nm_altura, values.nm_imc, id]
    const rows = await conn.query(sql, customers);
    return rows;
};

async function deletePatient(id) {
    const conn = await connect.connect();
    const sql = 'DELETE FROM jb_cliente WHERE nr_sequencia=?';
    const rows = await conn.query(sql, [id]);
    return rows;
}

async function selectTotalPatients() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT COUNT(*) AS Total FROM jb_cliente');
    return rows[0].Total;
}

module.exports = {
    registerPatient,
    selectPatient,
    selectPatientName,
    selectPatientID,
    editPatient,
    deletePatient, 
    selectTotalPatients,
    selectTotalPatientsFilter
}
