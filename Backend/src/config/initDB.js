// Importacion de Sequelize y modelos
const sequelize = require("./db.config.js");

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a la base de datos");
    await sequelize.sync({ alter: true });
    console.log("✅ Base de datos sincronizada");
  } catch (err) {
    console.error("❌ Error al conectar la base de datos:", err);
    throw err;
  }
};

module.exports = initDB;
