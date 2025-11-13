const express = require("express");
const router = express.Router();
const { produtoRoutes } = require("./produtoRoutes");
const { clientesRoutes } = require("./clientesRoutes");
const { pedidoRoutes } = require("./pedidoRoutes");

router.use("/", produtoRoutes);
router.use("/", clientesRoutes);
router.use("/", pedidoRoutes);

module.exports = { router };
