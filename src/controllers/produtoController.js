const { produtoModel } = require("../models/produtoModel");

const produtoController = {
  /**
   * Retorna os produtos cadastrados
   * Rota GET /produtos
   * @async
   * @function selecionaTodos
   * @param {Request} req Objeto da requisição HTTP
   * @param {Response} res Objeto da resposta HTTP
   * @returns {Promise<Array<Object>>} Objeto contendo o resultado da consulta
   */
  selecionaTodos: async (req, res) => {
    try {
      const id_produto = Number(req.query.id_produto);
      // se tiver ID puxa selectwithID, se não mantem a lógica
      if (id_produto) {
        const resultado = await produtoModel.selectwithID(id_produto);
        //validação
        if (resultado.length === 0) {
          return res
            .status(200)
            .json({ message: "A consulta não retornou resultados" });
        }

        res.status(200).json({ data: resultado });
      } else {
        const resultado = await produtoModel.selectAll();
        if (resultado.length === 0) {
          return res
            .status(200)
            .json({ message: "A consulta não retornou resultados" });
        }
        res.status(200).json({ data: resultado });
      }
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
  },

  incluiRegistro: async (req, res) => {
    try {
      const { descricao, valor } = req.body;
      // Validação
      if (!descricao || !valor || !isNaN(descricao) || isNaN(valor)) {
        return res
          .status(400)
          .json({ message: "Verifique os dados enviados e tente novamente" });
      }
      const resultado = await produtoModel.insert(descricao, valor);
      if (resultado.insertId === 0) {
        throw new Error("Ocorreu um erro ao incluir o produto");
      }
      res
        .status(201)
        .json({ message: "Registro incluído com sucesso", data: resultado });
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
  },

  alteraProduto: async (req, res) => {
    try {
      const idProduto = Number(req.params.idProduto);
      const { descricao, valor } = req.body;
      // Validação
      if (
        !idProduto ||
        (!descricao && !valor) ||
        (!isNaN(descricao) && isNaN(valor)) ||
        typeof idProduto != "number"
      ) {
        res
          .status(400)
          .json({ message: "Verifique os dados enviados e tente novamente" });
      }
      // caso não ache o ID
      const produtoAtual = await produtoModel.selectById(idProduto);
      if (produtoAtual.length === 0) {
        return res.status(200).json({ message: "Produto Não localizado" });
      }

      const novaDescricao = descricao ?? produtoAtual[0].nome_produto;
      const novoValor = valor ?? produtoAtual[0].valor_produto;

      const resultUpdate = await produtoModel.update(
        idProduto,
        novaDescricao,
        novoValor
      );
      // dados iguais, sem mudanças
      if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 0) {
        return res
          .status(200)
          .json({ message: "Não há alterações a serem realizadas" });
      }
      // Atualização Concluida com sucesso
      if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 1) {
        res.status(200).json({ message: "Registro alterado com sucesso" });
      }
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
  },

  deleteProduto: async (req, res) => {
    try {
      const idProduto = Number(req.params.idProduto);
      // validação
      if (!idProduto || !Number.isInteger(idProduto)) {
        return res.status(400).json({ message: "Insira um ID valido" });
      }
      const produtoSelecionado = await produtoModel.selectById(idProduto);
      if (produtoSelecionado.length === 0) {
        return res.status(200).json({ message: "Produto não localizado" });
      }
      const resultadoDelete = await produtoModel.delete(idProduto);
      if (resultadoDelete.affectedRows === 0) {
        res
          .status(200)
          .json({ message: "Ocorreu um erro ao excluir o produto" });
      }

      res.status(200).json({
        message: "Produto excluído com sucesso",
        data: resultadoDelete,
      });
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
  },
};

module.exports = { produtoController };
