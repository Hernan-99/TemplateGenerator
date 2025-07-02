const User = require("../models/user.model.js"); // Modelo Sequelize
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const path = require("node:path");
// const fsPromise = require("node:fs/promises");
// const userModel = {
//   users: require("../models/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const authLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Todos los campos son requeridos" });

  try {
    const findUser = await User.findOne({ where: { email } });
    if (!findUser)
      return res.status(401).json({ message: "Usuario no encontrado" }); // No encontrado
    console.log("Usuario buscado:", findUser);

    const matchPass = await bcrypt.compare(password, findUser.password);
    if (!matchPass) return res.sendStatus(401); // No autorizado
    console.log("Contraseña coincidente:", matchPass);

    const role = findUser.role;
    const accessToken = jwt.sign(
      {
        UserData: {
          email: findUser.email,
          role: role,
        },
      },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: "15m" }
      // { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { email: findUser.email },
      process.env.REFRESH_SECRET_TOKEN,
      { expiresIn: "1d" }
    );

    // Actualiza el refreshToken en la db
    await User.update({ refreshToken }, { where: { email: findUser.email } });

    // Enviar cookie httpOnly + accessToken
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

module.exports = { authLogin };
