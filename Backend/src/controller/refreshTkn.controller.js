const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const fs = require("node:fs");
// const path = require("node:path");
// const userModel = {
//   users: require("../models/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const handlerRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  try {
    const findUser = await User.findOne({ where: { refreshToken } });
    if (!findUser) return res.sendStatus(403); // Token no coincide con ningún usuario

    jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_TOKEN,
      (err, decoded) => {
        if (err || findUser.email !== decoded.email) return res.sendStatus(403);

        const role = Object.values(findUser.role);
        const accessToken = jwt.sign(
          { UserData: { email: decoded.email, role: role } },
          process.env.ACCESS_SECRET_TOKEN,
          { expiresIn: "15m" }
          // { expiresIn: "30s" }
        );
        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.error("❌ Error al procesar el refresh token:", err);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

module.exports = { handlerRefreshToken };
