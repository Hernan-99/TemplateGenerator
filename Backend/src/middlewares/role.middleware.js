const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.sendStatus(401);

    const roleArr = [...allowedRoles];
    console.log(
      `Tu rol [${!req.role}] no tiene permisos para realizar esta accion. Solo los roles: [${roleArr}] tienen acceso a esto.`
    );

    const result = req.role
      .map((rol) => roleArr.includes(rol))
      .find((value) => value === true);

    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRole;
