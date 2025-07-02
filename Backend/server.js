const express = require("express");
const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions.config.js");
// const PORT = process.env.PORT || 8080;

const verifyJWT = require("./src/middlewares/jwt.middleware.js");
const credentials = require("./src/middlewares/credentials.js");

const cookieParser = require("cookie-parser");
const initDB = require("./src/config/initDB.js");

// Middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// autenticacion - rutas públicas
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.statusCode = 200;
  res.end("<h1>Bienvenido</h1>");
  console.log("hola");
});
// app.use("/", require("./routes/register.js"));
app.use("/register", require("./src/routes/register.js"));
app.use("/auth", require("./src/routes/auth.js"));
app.use("/refresh", require("./src/routes/refresh.js"));
app.use("/logout", require("./src/routes/logout.js"));

// Middleware para proteger rutas privadas
app.use(verifyJWT);
app.use("/templates", require("./src/routes/api/templates.js"));

// conexion a la db y levantar servidor | IIFE
(async () => {
  try {
    await initDB();
    console.log("✅ Base de datos inicializada");
    // app.listen(PORT, () => {
    //   console.log(`Servidor corriendo en el localhost:${PORT}`);
    // });
  } catch (err) {
    console.error("❌ Falló la inicialización de la app:", err);
    process.exit(1); // Termina el proceso si la DB no se puede inicializar
  }
})();

module.exports = serverless(app);
