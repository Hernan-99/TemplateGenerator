const User = require("../models/user.model.js"); // Modelo e

// const userModel = {
//   users: require("../models/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // No hay cookie, no hay sesión
  const refreshToken = cookies.jwt;

  try {
    const findUser = await User.findOne({ where: { refreshToken } });

    if (!findUser) {
      // Usuario no encontrado, limpiamos igual la cookie
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "Node",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.sendStatus(204);
    }
    // Borramos el refreshToken del usuario en la base de datos
    await User.update(
      { refreshToken: "" },
      { where: { email: findUser.email } }
    );
    // agregar en produccion --> {secure:true, maxAge: 24 * 60 * 60 * 1000}
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Logout exitoso
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error 500" });
  }
};

module.exports = { logout };
