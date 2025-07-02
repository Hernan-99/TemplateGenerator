const sequelize = require("../config/db.config.js");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a PostgreSQL");
  } catch (err) {
    console.error("❌ Error al conectar:", err.message);
  }
})();
