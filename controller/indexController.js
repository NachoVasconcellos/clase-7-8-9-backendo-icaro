const fs = require("fs");
const bcrypt = require("bcrypt");
const { saveUsuarios, readUsuarios } = require("../services/usuariosServices");

const renderIndex = (req, res) => {
  res.render("index");
};

const renderLogin = (req, res) => {
  res.render("login");
};

const renderRegister = (req, res) => {
  res.render("register", { errors: [] });
};

const registrarNuevo = (req, res) => {
  //Destructuring
  const { email, password } = req.body;

  //Generar un salt (valor aleatorio) para fortalecer el hashing
  const saltRounds = 10;

  //Aplicar el hashing de la contraseña utilizando bcrypt
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al hashear la contraseña");
      return;
    }

    //Crear un objeto con el email y la contraseña hasheada
    const nuevoUsuario = {
      email,
      password: hashedPassword, //Guardar la contraseña hasheada en lugar de la original
    };

    const usuarios = readUsuarios();
    usuarios.push(nuevoUsuario);
    saveUsuarios(usuarios);

    res.session.usuario = nuevoUsuario;

    res.redirect("/admin/perfil")
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const usuarios = fs.readFileSync("usuarios.json", "utf-8");
  const usuariosParsed = JSON.parse(usuarios);

  // console.log(usuarios);
  // console.log(usuariosParsed);

  let usuarioFinded; //buscar en el array de usuarios el que coincida con el email, si ninguno coincide, enviar

  if (Array.isArray(usuariosParsed)) {
    usuarioFinded = usuariosParsed.filter((user) => user.email === email);
    //Realiza las operaciones adicionales con el resultado filtrado
  } else {
    //Manejar el caso en que usuarios no sea un arreglo valido
    return res.send("no se encontro ningun usuario");
  }

  //si lo encuentro uso el bcript compare

  if (resultado) {
    bcrypt.compare(password, usuarioFinded.password, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).send("Error al comparar la contraseña");
      }
      // result solo va a ser TRUE o FALSE
      if (result) {
        console.log("contraseña correcta");
        res.send("Logeado conrrectamente");
      } else {
        console.log("contraseña incorrecta");
        res.status(400).send("Contraseña incorrecta");
      }
    });
  }
};

module.exports = {
  renderIndex,
  renderLogin,
  renderRegister,
  registrarNuevo,
  login,
};
