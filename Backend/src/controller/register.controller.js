const fsPromise = require("node:fs/promises");
const path = require("node:path");
const bcrypt = require("bcrypt");

const userModel = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const createUser = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  if (!email || !firstname || !lastname || !password) {
    return res.status(400).json({ message: "Todos los campos son requerido" });
  }

  const userExists = userModel.users.find((user) => user.email === email);
  if (userExists) return res.sendStatus(409);

  try {
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      firstname,
      lastname,
      role: { "UserRol": 2001 },
      password: hashPass,
    };
    userModel.setUsers([...userModel.users, newUser]);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(userModel.users)
    );
    console.log(userModel.users);
    res
      .status(201)
      .json({ success: `Usuario: ${email}. Creado correctamente` });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error al crear el usuario. Error: ${err.message}` });
  }
};

module.exports = { createUser };
