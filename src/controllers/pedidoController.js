const { pedidoModel } = require("../models/pedidoModel");

const pedidoController = {
  /**
   * Seleciona todos os pedidos cadastrados.
   *
   * @async
   * @function selecionaPedidos
   * @returns {Promise<Array>} Lista de pedidos.
   *
   * @example
   * // GET /pedidos
   * app.get("/pedidos", pedidoController.selecionaPedidos);
   */
  selecionaPedidos: async () => {},
  /**
   * Retorna os detalhes de um item de pedido, baseado no ID fornecido na query.
   *
   * @async
   * @function verItem
   * @param {object} req Objeto Request do Express.
   * @param {object} res Objeto Response do Express.
   *
   * @example
   * // GET /pedido/item?id_item=10
   * app.get("/pedido/item", pedidoController.verItem);
   */
  verItem: async (req, res) => {
    try {
      const id_item = Number(req.query.id_item);
    } catch (error) {}
  },

  /**
   * Cria um novo pedido, incluindo seus itens, validando os dados enviados.
   *
   * @async
   * @function criarPedido
   * @param {object} req Objeto Request contendo os dados do pedido.
   * @param {object} res Objeto Response usado para retornar o resultado.
   * @returns {Promise<object>} JSON com a confirmação da criação.
   *
   * @example
   * // POST /pedido
   * // body:
   * // {
   * //   "id_cliente": 1,
   * //   "valor_pedido": 150.90,
   * //   "data_pedido": "2025-01-10",
   * //   "id_produto": 10,
   * //   "quantidade": 2,
   * //   "valor_item": 75.45
   * // }
   * app.post("/pedido", pedidoController.criarPedido);
   */
  criarPedido: async (req, res) => {
    try {
      const {
        id_cliente,
        valor_pedido,
        data_pedido,
        id_produto,
        quantidade,
        valor_item,
      } = req.body;

      if (
        !id_cliente ||
        !valor_pedido ||
        !data_pedido ||
        !id_produto ||
        !quantidade ||
        !valor_item
      ) {
        return res.status(400).json({
          message: "Verifique os dados enviados e tente novamente",
        });
      }
      const resultado = await pedidoModel.insertPedido(
        id_cliente,
        valor_pedido,
        data_pedido,
        id_produto,
        quantidade,
        valor_item
      );
      res.status(201).json({
        message: "Registro incluído com sucesso",
        data: resultado,
      });
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },
  /**
   * Cria um item vinculado a um pedido existente.
   *
   * @async
   * @function criarItem
   * @param {object} req Objeto Request contendo os dados do item.
   * @param {object} res Objeto Response usado para retornar o resultado.
   * @returns {Promise<object>} JSON com a confirmação da criação do item.
   *
   * @example
   * // POST /pedido/item
   * // body:
   * // {
   * //   "id_pedido": 5,
   * //   "id_produto": 12,
   * //   "quantidade": 3,
   * //   "valor_item": 50
   * // }
   * app.post("/pedido/item", pedidoController.criarItem);
   */
  criarItem: async (req, res) => {
    try {
      const { id_pedido, id_produto, quantidade, valor_item } = req.body;

      if (!id_pedido || !id_produto || !quantidade || !valor_item) {
        return res.status(400).json({
          message: "Verifique os dados enviados e tente novamente",
        });
      }
      const resultado = await pedidoModel.insertItem(
        id_pedido,
        id_produto,
        quantidade,
        valor_item
      );
      res.status(201).json({
        message: "Registro incluído com sucesso",
        data: resultado,
      });
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },
  /**
   * Altera a quantidade de um item existente no pedido.
   *
   * @async
   * @function alteraItem
   * @param {object} req Objeto Request contendo o ID do item e a nova quantidade.
   * @param {object} res Objeto Response usado para retornar o resultado.
   * @returns {Promise<object>}
   *
   * @example
   * // PUT /pedido/item/20
   * // body:
   * // { "quantidade": 5 }
   * app.put("/pedido/item/:idItem", pedidoController.alteraItem);
   */
  alteraItem: async (req, res) => {
    try {
      const idItem = Number(req.params.idItem);
      const { quantidade } = req.body;

      if (!idItem || !quantidade || quantidade <= 0) {
        return res
          .status(400)
          .json({ message: "Verifique os dados enviados e tente novamente" });
      }

      const itemAtual = await pedidoModel.selectItemById(idItem);
      if (itemAtual.length === 0) {
        return res.status(200).json({ message: "Item não localizado" });
      }
      const resultUpdate = await pedidoModel.updateQtdItem(idItem, quantidade);

      if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 0) {
        return res
          .status(200)
          .json({ message: "Não há alterações a serem realizadas" });
      }

      if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 1) {
        res.status(200).json({ message: "Registro alterado com sucesso" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },
  /**
   * Exclui um item vinculado a um pedido.
   *
   * @async
   * @function excluirItem
   * @param {object} req Objeto Request contendo os IDs do pedido e do item.
   * @param {object} res Objeto Response usado para retornar o resultado.
   * @returns {Promise<object>}
   *
   * @example
   * // DELETE /pedido/5/item/10
   * app.delete("/pedido/:idPedido/item/:idItem", pedidoController.excluirItem);
   */
  excluirItem: async (req, res) => {
    try {
      const idPedido = Number(req.params.idPedidos);
      const idItem = Number(req.params.idItem);

      if (
        !idPedido ||
        !Number.isInteger(idPedido) ||
        !idItem ||
        !Number.isInteger(idItem)
      ) {
        return res.status(400).json({ message: "Forneça um ID válido" });
      }

      const itemSelecionado = await pedidoModel.selectItemById(idItem);
      if (itemSelecionado.length === 0) {
        return res
          .status(200)
          .json({ message: "Item não localizado na base de dados" });
      }

      const resultadoDelete = await pedidoModel.deleteItem(idPedido, idItem);
      console.log(resultadoDelete.affectedRows);

      if (resultadoDelete.affectedRows === 0) {
        return res
          .status(200)
          .json({ message: "Ocorreu um erro ao excluir o item" });
      }
      res
        .status(200)
        .json({ message: "Item excluido com sucesso", data: resultadoDelete });
    } catch (error) {}
  },
};

module.exports = { pedidoController };
