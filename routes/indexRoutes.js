const express = require("express");
const {
  renderIndex,
  renderLogin,
  renderRegister,
  registrarNuevo,
  login,
} = require("../controller/indexController");
const validateRegister = require("../middleware/validateRegister");
const router = express.Router();

router.get("/", renderIndex);
router.get("/login", renderLogin);
router.get("/register", renderRegister);

router.post("/login", login);
router.post("/register", validateRegister, registrarNuevo);

module.exports = router;
