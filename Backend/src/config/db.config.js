require("dotenv").config(); // Carga  variables de entorno del archivo `.env` (`DB_NAME`, `DB_USER`, etc.). Es para no tener datos sensibles en el código fuente.
const pg = require("pg");
const { Sequelize } = require("sequelize"); // Importacion del constructor Sequelize desde el ORM Sequelize. Es para instanciar una conexión a la base de datos.

// Inicializa Sequelize con los datos de conexión:
const conecction = new Sequelize(
  process.env.DB_NAME, // Nombre de tu base de datos en Neon
  process.env.DB_USER, // Usuario de la DB
  process.env.DB_PASS, // Contraseña del usuario
  {
    host: process.env.DB_HOST, // Dirección del host
    port: process.env.DB_PORT || 5432, // Puerto de PostgreSQL (por default 5432)
    dialect: "postgres", // El tipo de base de datos que usamos(postgres)
    dialectModule: pg,

    // Esto le indica a Sequelize que:
    dialectOptions: {
      // 1. Se tiene que usar SSL porque Neon sólo acepta conexiones seguras
      // 2. rejectUnauthorized: false permite que se conecte aunque el certificado no esté verificado contra una autoridad de confianza (útil en desarrollo y obligatorio con Neon)
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      // Desactiva los logs de SQL por consola. Si ponemos true, muestra cada query que ejecuta Sequelize.
      // Útil para depuración.
      logging: false,
    },
  }
);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS ? "OK" : "MISSING");
console.log("DB_HOST:", process.env.DB_HOST);

// Exportamos la instancia de sequelize para poder usarla en otros archivos (como en server.js o en los models).
module.exports = conecction;
