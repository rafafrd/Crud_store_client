const express = require("express");
const clientesRoutes = express.Router();
const { clientesController } = require("../controllers/clientesController");

// rotas
clientesRoutes.get("/clientes", clientesController.selecionaTodos);
clientesRoutes.post("/clientes", clientesController.inserirCliente);
module.exports = { clientesRoutes };
