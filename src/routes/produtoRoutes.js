const express = require("express");
const produtoRoutes = express.Router();
const { produtoController } = require("../controllers/produtoController");

// Rotas
produtoRoutes.post("/produtos", produtoController.incluiRegistro); // C
produtoRoutes.get("/produtos", produtoController.selecionaTodos); //R
produtoRoutes.put("/produtos/:idProduto", produtoController.alteraProduto); // U
produtoRoutes.delete("/produtos/:idProduto", produtoController.deleteProduto); // D

module.exports = { produtoRoutes };
