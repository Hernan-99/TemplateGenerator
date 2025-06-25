const express = require("express");
const router = express.Router();
const registerController = require("../controller/register.controller.js");

router.post("/", registerController.createUser);
module.exports = router;
