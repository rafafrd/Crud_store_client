const { pool } = require("../config/db");

const produtoModel = {
  /**
   * Retorna todos os produtos cadastrados na tabela produtos
   * - SELECT * FROM produtos;
   * @function selectAll
   * @async
   * @returns {Promise<Array<object>>} Retorna um array contendo um objetos,
   * cada objeto representa um produto
   * @example
   * const produtos = await produtoModel.selectAll();
   * console.log(produtos);
   *
   * //Saída esperada
   * [
   *  {coluna1:"valorColuna1", colunaN:"valorColunaN, ..."}
   * ]
   */
  selectAll: async () => {
    const sql = "SELECT * FROM produtos;";
    const [rows] = await pool.query(sql);
    return rows;
  },
  selectwithID: async (pId) => {
    const sql = "SELECT * FROM produtos WHERE id_produto=?;";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  selectById: async (pId) => {
    const sql = "SELECT * FROM produtos WHERE id_produto=?;";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  /**
   * Insere um produto na base da dados
   * @async
   * @param {String} pNomeProd - Descrição do nome do produto que deve ser inserido no banco de dados. EX: 'Teclado'
   * @param {Number} PvalorProd - Valor do produto que deve ser inserido no banco de dados. EX: 126.25
   * @returns {Promise<Object}Retorna um objeto contendo propriedades sobre a execução da query
   * @example
   * const result = await produtoModel.insert(param1, param2,....)
   * //Saida
   * "result": {
   *      "fildeCount": 0,
   *      "affectedRows": 1,
   *      "inserId": 1,
   *      "info": "",
   *      "serverStatus": 2,
   *      "warningStatus": 0,
   *      "changedRows": 0
   * }
   */

  insert: async (pNomeProd, PvalorProd) => {
    const sql =
      "INSERT INTO produtos(nome_produto, valor_produto) VALUES(?,?);";
    const values = [pNomeProd, PvalorProd];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  /**
   * @async
   * @param {Number} pId
   * @param {string} pDescricao
   * @param {Number} pValor
   * @returns
   */
  update: async (pId, pDescricao, pValor) => {
    const sql =
      "UPDATE produtos SET nome_produto=?, valor_produto=? WHERE id_produto=?";
    const values = [pDescricao, pValor, pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  delete: async (pId) => {
    const sql = "DELETE FROM produtos WHERE id_produto=?";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
};

module.exports = { produtoModel };
