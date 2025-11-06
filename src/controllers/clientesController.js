const { clientesModel } = require("../models/clientesModel");
const { produtoModel } = require("../models/produtoModel");

const clientesController = {
  selecionaTodos: async (req, res) => {
    try {
      const resultado = await clientesModel.selectAll();
      if (resultado.length === 0) {
        return res
          .status(200)
          .json({ message: "A consulta não retornou resultados" });
      }
      res.status(200).json({ data: resultado });
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
  },

  inserirCliente: async (req, res) => {
    try {
      const { nome, cpf } = req.body;
      if (!nome || !cpf) {
        return res
          .status(400)
          .json({ message: "Verifique os dados enviados e tente novamente" });
      }

      const resultado = await clientesModel.insert(nome, cpf);
      // fazer validação pra erro de inserção
      res
        .status(201)
        .json({ message: "Registro incluído com sucesso", data: resultado });
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
  },

  alteraCliente: async (req, res) => {
    try {
      const id_cliente = Number(req.params.id_cliente);
      const { nome, cpf } = req.body;
      // Add validação
      if (!id_cliente || !nome || !cpf || isNaN(id_cliente)) {
        res
          .status(400)
          .json({ message: "Verifique os dados enviados e tente novamente" });
      }

      const clienteAtual = await clientesModel.selectById(id_cliente);
      if (clienteAtual.length === 0) {
        return res.status(200).json({ message: "Cliente Não localizado" });
      }
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
  },
};

module.exports = { clientesController };
