    //IMPORTAR CONECXÃO
const connect = require('../connection');

async function registarProntuario(values) {
    const conn = await connect.connect();
    const sql = 'INSERT INTO jb_prontuario (nm_paciente, nm_cpf, nm_telefone, nm_endereco, dt_data_nascimento,' +
    'nm_plano_saude, nm_medico, dt_consulta, nm_historico_gest, nm_historico_cirur, nm_medicamentos, nm_alergia,' + 
    'nm_sintomas, nm_prescricao, nm_habitos, nm_outras_inform) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const customers = [values.nm_paciente, values.nm_cpf, values.nm_telefone, values.nm_endereco, values.dt_data_nascimento, values.nm_plano_saude, 
        values.nm_medico, values.dt_consulta, values.nm_historico_gest, values.nm_historico_cirur, values.nm_medicamentos, values.nm_alergia,
        values.nm_sintomas, values.nm_prescricao, values.nm_habitos, values.nm_outras_inform];
    const rows = await conn.query(sql, customers);
    return rows;
}

async function editProntuario(id, values) {
    const conn = await connect.connect();
    const sql = 'UPDATE jb_prontuario SET nm_paciente=?, nm_cpf=?, nm_telefone=?, nm_endereco=?, dt_data_nascimento=?,'+
                'nm_plano_saude=?, nm_medico=?, dt_consulta=?, nm_historico_gest=?, nm_historico_cirur=?, nm_medicamentos=?, nm_alergia=?,'+ 
                'nm_sintomas=?, nm_prescricao=?, nm_habitos=?, nm_outras_inform=? WHERE nr_prontuario=?';
    const customers = [values.nm_paciente, values.nm_cpf, values.nm_telefone, values.nm_endereco, values.dt_data_nascimento,
        values.nm_plano_saude, values.nm_medico, values.dt_consulta, values.nm_historico_gest, values.nm_historico_cirur,
        values.nm_medicamentos, values.nm_alergia, values.nm_sintomas, values.nm_prescricao, values.nm_habitos, values.nm_outras_inform, id];
    const rows = await conn.query(sql, customers);
    return rows;
}

async function listarProntuario() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT * FROM jb_prontuario ORDER BY nm_paciente');
    return rows;
}

async function selectTotalProntuario() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT COUNT(*) AS Total FROM jb_prontuario');
    return rows[0].Total;
}

async function selectProntuarioID(values) {
    const conn = await connect.connect();
    const sql = 'SELECT * FROM jb_prontuario a WHERE nr_prontuario = ?';
    const [rows] = await conn.query(sql, [values]);
    return rows;
};

module.exports = {
    registarProntuario,
    listarProntuario,
    selectTotalProntuario,
    selectProntuarioID,
    editProntuario
}