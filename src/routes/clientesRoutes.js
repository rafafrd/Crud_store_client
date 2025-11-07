const express = require("express");
const clientesRoutes = express.Router();
const { clientesController } = require("../controllers/clientesController");

// rotas
clientesRoutes.get("/clientes", clientesController.selecionaTodos);
clientesRoutes.post("/clientes", clientesController.inserirCliente);
clientesRoutes.put("/clientes/:id_cliente", clientesController.alteraCliente);
clientesRoutes.delete(
  "/clientes/:id_cliente",
  clientesController.deleteCliente
);
module.exports = { clientesRoutes };
