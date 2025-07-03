const express = require("express");
const router = express.Router();
const logoutController = require("../controller/logout.controller.js");

router.post("/", logoutController.logout);

module.exports = router;
