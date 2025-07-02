const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Template = sequelize.define(
  "Template",
  {
    id: {
      type: DataTypes.UUID, // Tipo UUID
      defaultValue: DataTypes.UUIDV4, // Valor por defecto: se genera un UUIDv4 automático
      primaryKey: true, // llave primaria
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users", // Nombre de la tabla user
        key: "email", // Se relaciona con el campo email de la tabla
      },
    },
  },
  {
    tableName: "templates",
    timestamps: true,
  }
);

module.exports = Template;
