const allowedOrigins = require("./origins.config.js");
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No autorizado"));
    }
  },

  credentials: true, // <- esto es CLAVE
  optionsSuccessStatus: 200, // para que no falle en navegadores viejos
};

module.exports = corsOptions;
