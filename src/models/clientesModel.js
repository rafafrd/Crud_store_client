const { pool } = require("../config/db");

const clientesModel = {
  // Busca de todos os clientes;
  selectAll: async () => {
    const sql = "SELECT * FROM clientes;";
    const [rows] = await pool.query(sql);
    return rows;
  },
  // Busca por ID
  selectById: async (pId) => {
    const sql = "SELECT * FROM clientes WHERE id_cliente=?;";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  // Criação de clientes;
  insert: async (pNomeCliente, pCpf) => {
    const sql = "INSERT INTO clientes(nome_cliente, cpf_cliente) VALUES(?,?);";
    const values = [pNomeCliente, pCpf];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  // Alteração dos dados do cliente;
  update: async (pId_cliente, pNomeCliente, pCpf) => {
    const sql =
      "UPDATE clientes SET nome_cliente=?, cpf_cliente=? WHERE id_cliente=?";
    const values = [pNomeCliente, pCpf, pId_cliente];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  delete: async (pId_cliente) => {
    const sql = "DELETE FROM produtos WHERE id_cliente=?";
    const values = [pId_cliente];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
};

module.exports = { clientesModel };
