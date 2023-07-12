const { body, validationResult } = require("express-validator");

const validateRegister = [
  body("email")
    .notEmpty()
    .withMessage("Debes completar el campo email")
    .bail() //para validar el primero
    .isEmail()
    .withMessage("Debes ingresar email valido"),
    body("password")
    .notEmpty()
    .withMessage("la contraseña debe ser ingresada"),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(req.body);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.render("register", {
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = validateRegister;
