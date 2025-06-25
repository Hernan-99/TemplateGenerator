const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // if (!authHeader) return res.sendStatus(401);
  if (!authHeader?.startsWith(`Bearer `)) return res.sendStatus(401);
  console.log(authHeader);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);

    // ver esto
    req.email = decoded.UserData.email;
    req.role = decoded.UserData.role;
    next();
  });
};

module.exports = verifyJWT;
