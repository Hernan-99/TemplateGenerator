const path = require("node:path");
const fsPromise = require("node:fs/promises");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userModel = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const authLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Todos los campos son requeridos" });

  const fs = require("fs");
  userModel.users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "models", "users.json"), "utf8")
  );

  const findUser = userModel.users.find((user) => user.email === email);
  if (!findUser) return res.sendStatus(401);
  console.log("Usuario buscado:", findUser);

  const matchPass = await bcrypt.compare(password, findUser.password);
  console.log("Contraseña coincidente:", matchPass);

  console.log("ACCESS_SECRET_TOKEN:", process.env.ACCESS_SECRET_TOKEN);

  if (matchPass) {
    const role = Object.values(findUser.role);

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

    const otherUsers = userModel.users.filter(
      (user) => user.email !== findUser.email
    );

    const currentUser = { ...findUser, refreshToken };

    userModel.setUsers([...otherUsers, currentUser]);

    await fsPromise.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(userModel.users)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authLogin };
