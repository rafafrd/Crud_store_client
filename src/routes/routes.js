const express = require("express");
const router = express.Router();
const { produtoRoutes } = require("./produtoRoutes");
const { clientesRoutes } = require("./clientesRoutes");

router.use("/", produtoRoutes);
router.use("/", clientesRoutes);

module.exports = { router };
