const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

// GET
const getProfile = async (req, res) => {
  const email = req.email;
  try {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password", "refreshToken"] },
    });
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// UPDATE
const updateProfile = async (req, res) => {
  const { firstname, lastname, email, phone, image, password } = req.body;
  try {
    const update = {};
    if (firstname) update.firstname = firstname;
    if (lastname) update.lastname = lastname;
    if (email) update.email = email;
    if (phone) update.phone = phone;
    if (image) update.image = image;
    if (password) update.password = await bcrypt.hash(password, 10);
    const [rowsUpdated] = await User.update(update, {
      where: { email },
    });

    if (rowsUpdated === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Perfil actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};

// PARTIAL UPDATE
const partialUptadeProfile = async (req, res) => {
  const email = req.email;
  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) return res.sendStatus(404);
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await user.update(updateData, {
      fields: Object.keys(updateData),
    });

    res.json({
      message: "Perfil actualizado",
      user: {
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        phone: updatedUser.phone,
        image: updatedUser.image,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};

// DELETE
const deleteProfile = async (req, res) => {
  const email = req.email;

  try {
    const rowsDeleted = await User.destroy({ where: { email } });
    if (rowsDeleted === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(204).json({ message: "Cuenta eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar cuenta" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  partialUptadeProfile,
  deleteProfile,
};
