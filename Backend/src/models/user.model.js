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
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      // 5150 (Admin) o 2001 (User)
      type: DataTypes.INTEGER,
      defaultValue: 2001, // Por defecto: User
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
