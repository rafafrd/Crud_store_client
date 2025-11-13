const { pool } = require("../config/db");

const pedidoModel = {
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
        "INSERT INTO pedidos (id_cliente_fk, valor, data_pedido) VALUES (?,?,?);";
      const valuesPedido = [pIdCliente, pValorTotal, pDataPedido];
      const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);
      // insert 1 - itens_pedido
      const sqlItens =
        "INSERT INTO itens_pedido(id_pedido_fk, id_produto_fk, quantidade, valor) VALUES (?,?,?,?);";
      const valuesItem = [
        rowsPedido.insertId,
        pIdProduto,
        pQuantidadeItem,
        pValorItem,
      ];
      const [rowsItem] = await connection.query(sqlItens, valuesItem);
      return { rowsPedido, rowsItem };
      connection.commit();
    } catch (error) {
      connection.rollback();
      throw error;
    }
  },

  // inserir itens posterior a criação do pedido
  insertItem: async (pIdPedido, pIdProduto, pQuantidadeItem, pValorItem) => {
    // insert 1 - pedido
    const sqlItens =
      "INSERT INTO itens_pedido(id_pedido_fk, id_produto_fk, quantidade, valor) VALUES (?,?,?,?);";
    const valuesItem = [pIdPedido, pIdProduto, pQuantidadeItem, pValorItem];
    const [rowsItem] = await pool.query(sqlItens, valuesItem);
    let resultadoPedido;
    if (rowsItem.insertId !== 0) {
      [resultadoPedido] = updatePedido(pIdPedido, pQuantidadeItem, pValorItem);
    }
    return { rowsItem };
  },

  updatePedido: async (pIdPedido, pQuantidadeItem, pValorItem) => {
    // insert 1 - pedido
    const sqlItens =
      "UPDATE pedidos SET valor = valor + (?*?) WHERE id_pedido = ?;";
    const valuesItem = [pQuantidadeItem, pValorItem, pIdPedido];
    const [rows] = await pool.query(sqlItens, valuesItem);
    return { rows };
  },
};

module.exports = { pedidoModel };
