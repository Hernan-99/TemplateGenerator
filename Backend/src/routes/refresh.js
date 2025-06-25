const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controller/refreshTkn.controller.js");

router.get("/", refreshTokenController.handlerRefreshToken);

module.exports = router;
