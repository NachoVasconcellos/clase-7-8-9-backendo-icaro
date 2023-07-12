const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "ejs"); //motor de plantilla ejs
app.use(express.static("public")); //carpeta publica para archivos estaticos (ccs, js, img, etc)
app.use(express.urlencoded({ extended: true })); //para leer los datos de un formulario
app.use(express.json()); //para poder leer los datos de un formulario
// Configurar cookie-parser
app.use(cookieParser());

app.use(
    session({
      secret: "mi_secreto", // Cambia esto por una cadena secreta única para tu aplicación
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Configura a true si estás utilizando HTTPS
        httpOnly: true,
        maxAge: 3600000, // Tiempo de expiración de la cookie en milisegundos (aquí se establece a 1 hora)
      },
    })
  );

//rutas principales, a las que se puede acceder sin estar logueado, ej pagina de inicio, pagina de registro, pagina de login
app.use("/", require("./routes/indexRoutes.js"))

//rutas protegidas, solo pueden acceder los que inician sesion, ej pagina de perfil
app.use("/admin", require("./routes/adminRoutes"))

//rutas de api para usuarios, para la logica CRUD en productos. (GET, POST, PUT, DELETE)
app.use("/api/usuarios", require("./routes/usuariosRoutes"))

//Iniciar el Servidor
app.listen(3000, () => {
    console.log("Servidor ejecutando en el puerto 3000")
});