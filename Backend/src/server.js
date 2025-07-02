const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions.config.js");
const PORT = process.env.PORT || 8080;

const verifyJWT = require("./middlewares/jwt.middleware.js");
const credentials = require("./middlewares/credentials.js");

const cookieParser = require("cookie-parser");

// Importacion de Sequelize y modelos
const sequelize = require("./config/db.config.js");
const User = require("./models/user.model.js");
const Template = require("./models/user.model.js");

// Conexion y sincronizacion de tablas
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a la base de datos");
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas");
  } catch (error) {
    console.log("❌ Error al conectar o sincronizar:", error);
  }
})();

// Middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// autenticacion - rutas públicas
// app.use("/", require("./routes/register.js"));
app.use("/register", require("./routes/register.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/refresh", require("./routes/refresh.js"));
app.use("/logout", require("./routes/logout.js"));

// Middleware para proteger rutas privadas
app.use(verifyJWT);
app.use("/templates", require("./routes/api/templates.js"));

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el localhost:${PORT}`);
});
