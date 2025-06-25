const fsPromise = require("node:fs/promises");
const path = require("node:path");

const userModel = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const fs = require("fs");
  userModel.users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "models", "users.json"), "utf8")
  );

  const findUser = userModel.users.find(
    (user) => user.refreshToken === refreshToken
  );

  if (!findUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "Node",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204);
  }

  const otherUsers = userModel.users.filter(
    (user) => user.refreshToken !== findUser.refreshToken
  );

  const currentUser = { ...findUser, refreshToken: "" };
  userModel.setUsers([...otherUsers, currentUser]);
  await fsPromise.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(userModel.users)
  );
  // agregar en produccion --> {secure:true, maxAge: 24 * 60 * 60 * 1000}
  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};

module.exports = { logout };
