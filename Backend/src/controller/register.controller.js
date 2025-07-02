const User = require("../models/user.model.js"); // Modelo Sequelize
const bcrypt = require("bcrypt");
// const fsPromise = require("node:fs/promises");
// const path = require("node:path");
// const userModel = {
//   users: require("../models/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const createUser = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;
  if (!email || !firstname || !lastname || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  // Buscar si usuario ya existe
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists)
      return res.status(409).json({ message: "El usuario ya existe" });

    // Hash contraseña
    const hashPass = await bcrypt.hash(password, 10);
    await User.create({
      email,
      firstname,
      lastname,
      password: hashPass,
      role: { UserRol: 2001 },
    });

    res.status(201).json({ success: `Usuario ${email} creado correctamente` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

module.exports = { createUser };
