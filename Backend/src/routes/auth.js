const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller.js");

router.post("/", authController.authLogin);

module.exports = router;
