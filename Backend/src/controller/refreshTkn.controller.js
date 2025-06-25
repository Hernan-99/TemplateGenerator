const fs = require("node:fs");
const path = require("node:path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userModel = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handlerRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  userModel.users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "models", "users.json"), "utf-8")
  );

  const findUser = userModel.users.find(
    (user) => user.refreshToken === refreshToken
  );

  if (!findUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, decoded) => {
    if (err || findUser.email !== decoded.email) return res.sendStatus(403);

    const role = Object.values(findUser.role);
    const accessToken = jwt.sign(
      { UserData: { email: decoded.email, role: role } },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: "15m" }
      // { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handlerRefreshToken };
