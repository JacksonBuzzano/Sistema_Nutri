//IMPORTAR CONECXÃO
const connect = require('../connection');

async function selectTotalUser() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT COUNT(*) AS Total FROM jb_usuarios');
    return rows[0].Total;
}

async function selectUsers() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT * FROM jb_usuarios');
    return rows;
};

async function registerUsuario(values) { 
    const conn = await connect.connect();
    const sql = 'INSERT INTO jb_usuarios (nm_nome, nr_senha, nm_nome_usuario, dt_nascimento, nr_idade,' + 
        'nr_cpf, nm_cidade, nm_rua, nr_numero, nm_bairro, nm_telefone, nm_setor, nm_email, nm_funcao, ie_ativo)'+ 
        'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const customers = [values.nm_nome, values.nr_senha, values.nm_nome_usuario, values.dt_nascimento, values.nr_idade, 
        values.nr_cpf, values.nm_cidade, values.nm_rua, values.nr_numero, values.nm_bairro, values.nm_telefone,
        values.nm_setor, values.nm_email, values.nm_funcao, values.ie_ativo];
    const rows = await conn.query(sql, customers);
    return rows;
};

async function selectUsersID(id) {
    const conn = await connect.connect();
    const sql =  'SELECT * FROM jb_usuarios where nr_codigo = ?';
    const [rows] = await conn.query(sql, [id]);
    return rows;
};

async function editUsers(id, values) {
    const conn = await connect.connect();
    const sql = 'UPDATE jb_usuarios SET  nm_nome=?, nr_senha=?, nm_nome_usuario=?, dt_nascimento=?, nr_idade=?,' + 
        'nr_cpf=?, nm_cidade=?, nm_rua=?, nr_numero=?, nm_bairro=?, nm_telefone=?, nm_setor=?,' +
        'nm_email=?, nm_funcao=?, ie_ativo=? WHERE nr_codigo=?';
    const customers = [values.nm_nome, values.nr_senha, values.nm_nome_usuario, values.dt_nascimento, values.nr_idade, values.nr_cpf, 
        values.nm_cidade, values.nm_rua, values.nr_numero, values.nm_bairro, values.nm_telefone, values.nm_setor,
        values.nm_email, values.nm_funcao, values.ie_ativo, id]
    const rows = await conn.query(sql, customers);
    return rows;
};

async function pesquisarUsuario(nome, cpf, setor, funcao, ativo) {
    const conn = await connect.connect();
    const sql = 'SELECT * FROM jb_usuarios WHERE nm_nome LIKE "' + nome + '%"  AND nr_cpf LIKE "' + cpf + '%"' +
                'AND nm_setor LIKE "' + setor + '%" AND nm_funcao LIKE "' + funcao + '%" AND ie_ativo  LIKE "' + ativo + '%"';
    const [rows] = await conn.query(sql);
    return rows;
}

async function selectTotalUserFilter(nome, cpf, setor, funcao, ativo) {
    const conn = await connect.connect();
    const sql = 'SELECT COUNT(*) AS Total FROM jb_usuarios WHERE nm_nome LIKE "' + nome + '%"  AND nr_cpf LIKE "' + cpf + '%"' +
                'AND nm_setor LIKE "' + setor + '%" AND nm_funcao LIKE "' + funcao + '%" AND ie_ativo LIKE "' + ativo + '%"';
    const [rows] = await conn.query(sql);
    return rows[0].Total;
}

async function selectFuncaoUser() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT nm_funcao FROM jb_funcao');
    return rows;
}
async function selectUserSetor() {
    const conn = await connect.connect();
    const [rows] = await conn.query('SELECT nm_setor FROM jb_setor');
    return [rows];
}

async function deleteUsuario(id) {
    const conn = await connect.connect();
    const sql = 'DELETE FROM jb_usuarios WHERE nr_codigo=?';
    const [rows] = await conn.query(sql, [id]);
    return rows;
}

module.exports = {
    selectTotalUser,
    selectUsers,
    registerUsuario,
    selectUsersID,
    editUsers, 
    pesquisarUsuario,
    selectTotalUserFilter,
    selectUserSetor,
    selectFuncaoUser,
    deleteUsuario
}
