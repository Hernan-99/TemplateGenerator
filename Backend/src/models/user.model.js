const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false, // obligatorio
      unique: true, // además único (recomendado para email)
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.JSON,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true, // no obligatorio, puede ser null
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
