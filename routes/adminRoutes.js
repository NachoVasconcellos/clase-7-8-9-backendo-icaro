const express = require("express");
const { renderPerfil } = require("../controller/adminController");
const router = express.Router();

router.get("/perfil", renderPerfil);

module.exports = router