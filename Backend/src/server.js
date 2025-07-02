const express = require("express");
const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions.config.js");
// const PORT = process.env.PORT || 8080;

const verifyJWT = require("./middlewares/jwt.middleware.js");
const credentials = require("./middlewares/credentials.js");

const cookieParser = require("cookie-parser");
const initDB = require("./config/initDB.js");

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
app.use("/register", require("./routes/register.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/refresh", require("./routes/refresh.js"));
app.use("/logout", require("./routes/logout.js"));

// Middleware para proteger rutas privadas
app.use(verifyJWT);
app.use("/templates", require("./routes/api/templates.js"));

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
  }
})();

module.exports = serverless(app);
