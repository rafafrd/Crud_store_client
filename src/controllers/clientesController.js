const { clientesModel } = require("../models/clientesModel");

const clientesController = {
  /**
   * Busca e retorna todos os clientes cadastrados.
   * Rota GET /clientes
   * @async
   * @function selecionaTodos
   * @param {Request} req Objeto da requisição HTTP
   * @param {Response} res Objeto da resposta HTTP
   * @returns {Promise<Response>} Retorna um JSON com a lista de clientes ou uma mensagem.
   */
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
  /**
   * Insere um novo cliente no banco de dados.
   * Rota POST /clientes
   * @async
   * @function inserirCliente
   * @param {Request} req Objeto da requisição (body deve conter 'nome' e 'cpf').
   * @param {Response} res Objeto da resposta HTTP
   * @returns {Promise<Response>} Retorna um JSON com a mensagem de sucesso e os dados inseridos.
   */ inserirCliente: async (req, res) => {
    try {
      const { nome, cpf } = req.body;
      if (!nome || !cpf) {
        return res
          .status(400)
          .json({ message: "Verifique os dados enviados e tente novamente" });
      } // desafio

      const clienteExistente = await clientesModel.selectByCpf(cpf);
      if (clienteExistente.length > 0) {
        // Retorna o status 409 (Conflict)
        return res
          .status(409)
          .json({ message: "Conflito: CPF já cadastrado." });
      }
      const resultado = await clientesModel.insert(nome, cpf);
      res
        .status(201)
        .json({ message: "Registro incluído com sucesso", data: resultado });
    } catch (error) {
      // Se o erro for de 'UNIQUE constraint', mais amigavel
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
  },
  /**
   * Altera os dados de um cliente existente (parcial ou total).
   * Rota PUT /clientes/:id_cliente
   * @async
   * @function alteraCliente
   * @param {Request} req Objeto da requisição (params: 'id_cliente', body: 'nome' e/ou 'cpf').
   * @param {Response} res Objeto da resposta HTTP
   * @returns {Promise<Response>} Retorna um JSON com a mensagem de status da alteração.
   */ alteraCliente: async (req, res) => {
    try {
      const id_cliente = Number(req.params.id_cliente);
      // validação ID
      if (isNaN(id_cliente) || id_cliente <= 0) {
        return res
          .status(400)
          .json({ message: "ID do cliente inválido ou não fornecido." });
      }
      const { nome, cpf } = req.body;
      // validação dados
      if (!nome && !cpf) {
        return res.status(400).json({
          message: "Nenhum dado (nome ou cpf) foi fornecido para atualização.",
        });
      }
      const clienteAtual = await clientesModel.selectById(id_cliente);
      if (clienteAtual.length === 0) {
        return res.status(404).json({ message: "Cliente Não localizado" });
      }
      const novoNome = nome ?? clienteAtual[0].nome_cliente;
      const novoCpf = cpf ?? clienteAtual[0].cpf_cliente;

      const resultUpdate = await clientesModel.update(
        id_cliente,
        novoNome,
        novoCpf
      );

      if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 0) {
        return res.status(200).json({
          message:
            "Os dados enviados são idênticos aos do banco. Nenhuma alteração realizada.",
        });
      }
      if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 1) {
        res.status(200).json({ message: "Registro alterado com sucesso" });
      } else {
        res
          .status(500)
          .json({ message: "Erro inesperado ao tentar atualizar o cliente." });
      }
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
  },
  /**
   * Exclui um cliente do banco de dados pelo ID.
   * Rota DELETE /clientes/:id_cliente
   * @async
   * @function deleteCliente
   * @param {Request} req Objeto da requisição (params: 'id_cliente').
   * @param {Response} res Objeto da resposta HTTP
   * @returns {Promise<Response>} Retorna um JSON com a mensagem de sucesso ou erro.
   */ deleteCliente: async (req, res) => {
    try {
      const id_cliente = Number(req.params.id_cliente);
      // validação ID
      if (isNaN(id_cliente) || id_cliente <= 0) {
        return res
          .status(400)
          .json({ message: "ID do cliente inválido ou não fornecido." });
      }
      const clienteSelecionado = await clientesModel.selectById(id_cliente);
      if (clienteSelecionado.length === 0) {
        return res.status(404).json({ message: "Cliente Não localizado" });
      }
      const resultDelete = await clientesModel.delete(id_cliente);
      if (resultDelete.affectedRows === 1) {
        return res
          .status(200)
          .json({ message: "Cliente excluído com sucesso" });
      } else {
        res
          .status(500)
          .json({ message: "Ocorreu um erro ao excluir o o cliente." });
      }
    } catch (error) {
      console.error(`Erro ao executar: ${error}`);
      res.status(500).json({ message: "Ocorreu um erro no servidor" });
    }
  },
};
module.exports = { clientesController };
