const { pool } = require("../config/db");

const pedidoModel = {
  selectItemById: async (pIdItem) => {
    const sql = "SELECT id_item FROM itens_pedido WHERE id_item = ?;";
    const values = [pIdItem];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  insertPedido: async (
    pIdCliente,
    pValorTotal,
    pDataPedido,
    pIdProduto,
    pQuantidadeItem,
    pValorItem
  ) => {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      // insert 1 - pedido
      const sqlPedido =
        "INSERT INTO pedidos (id_cliente_fk, valor_total, data_pedido) VALUES (?,?,?);";
      const valuesPedido = [pIdCliente, pValorTotal, pDataPedido];
      const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);
      // insert 1 - itens_pedido
      const sqlItens =
        "INSERT INTO itens_pedido(id_pedido_fk, id_produto_fk, quantidade, valor_item) VALUES (?,?,?,?);";
      const valuesItem = [
        rowsPedido.insertId,
        pIdProduto,
        pQuantidadeItem,
        pValorItem,
      ];
      const [rowsItem] = await connection.query(sqlItens, valuesItem);
      connection.commit();
      return { rowsPedido, rowsItem };
    } catch (error) {
      connection.rollback();
      throw error;
    }
  },

  // inserir itens posterior a criação do pedido
  insertItem: async (pIdPedido, pIdProduto, pQuantidadeItem, pValorItem) => {
    // insert 1 - pedido
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const sqlItem =
        "INSERT INTO itens_pedido(id_pedido_fk, id_produto_fk, quantidade, valor_item) VALUES (?,?,?,?);";
      const valuesItem = [pIdPedido, pIdProduto, pQuantidadeItem, pValorItem];
      const [rowsItem] = await connection.query(sqlItem, valuesItem);

      const sqlPedido =
        "UPDATE pedidos SET valor_total = valor_total + (?*?) WHERE id_pedido = ?;";
      const valuesPedido = [pQuantidadeItem, pValorItem, pIdPedido];
      const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);

      connection.commit();
      return { rowsItem, rowsPedido };
    } catch (error) {
      connection.rollback();
      throw error;
    }
  },
  // corrigir unidade Item
  updateQtdItem: async (pIdItem, pQuantidade) => {
    // insert 1 - pedido
    const sql = "UPDATE itens_pedido SET quantidade = ? WHERE id_item=?;";
    const values = [pQuantidade, pIdItem];
    const [rows] = await pool.query(sql, values);
    // tabela pedidos é att com a TRIGGER: trg_atualiza_valor_pedido_after_update
    return rows;
  },
  deleteItem: async (pIdPedido, pIdItem) => {
    const sql = "DELETE FROM itens_pedido WHERE id_item=? AND id_pedido_fk=?;";
    const values = [pIdItem, pIdPedido];
    const [rows] = await pool.query(sql, values);
    // Tabela pedido é atualizada com a TRIGGER: trg_atualiza_valor_pedido_after_delete
    return rows;
  },
};

module.exports = { pedidoModel };
