require("dotenv").config(); // Carga  variables de entorno del archivo `.env` (`DB_NAME`, `DB_USER`, etc.). Es para no tener datos sensibles en el código fuente.
const { Sequelize } = require("sequelize"); // Importacion del constructor Sequelize desde el ORM Sequelize. Es para instanciar una conexión a la base de datos.
const mysql2 = require("mysql2");
// Inicializa Sequelize con los datos de conexión:
const conecction = new Sequelize(
  process.env.DB_NAME, // Nombre de tu base de datos en Neon
  process.env.DB_USER, // Usuario de la DB
  process.env.DB_PASS, // Contraseña del usuario
  {
    host: process.env.DB_HOST, // Dirección del host
    port: process.env.DB_PORT || 3306, // Puerto de PostgreSQL (por default 5432)
    dialect: "mysql", // El tipo de base de datos que usamos(postgres)
    dialectModule: mysql2, // driver
    // Esto le indica a Sequelize que:
    // Desactiva los logs de SQL por consola. Si ponemos true, muestra cada query que ejecuta Sequelize.
    // Útil para depuración.
    logging: false,

    // pool de conexiones
    pool: {
      max: 5, // Máximo de conexiones simultáneas
      min: 0, // Mínimo de conexiones inactivas
      acquire: 30000, // Tiempo máximo (en ms) para conctarse
      idle: 10000, // Tiempo máximo (en ms) de conexion inactiva
    },
  }
);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS ? "OK" : "MISSING");
console.log("DB_HOST:", process.env.DB_HOST);

// Exportamos la instancia de sequelize para poder usarla en otros archivos (como en server.js o en los models).
module.exports = conecction;
