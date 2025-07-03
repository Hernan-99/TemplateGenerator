const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.sendStatus(401);

    const roleArr = [...allowedRoles];
    // verifico si recibe mas de un rol
    const userRoles = Array.isArray(req.role) ? req.role : [req.role];
    console.log(
      `Tu rol [${!req.role}] no tiene permisos para realizar esta accion. Solo los roles: [${roleArr}] tienen acceso a esto.`
    );

    const result = userRoles
      .map((rol) => roleArr.includes(rol))
      .find((value) => value === true);

    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRole;
