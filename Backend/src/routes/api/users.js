const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  partialUptadeProfile,
  deleteProfile,
} = require("../../controller/user.controller.js");

router.get("/", getProfile);
router.put("/", updateProfile);
router.patch("/", partialUptadeProfile);
router.delete("/", deleteProfile);

module.exports = router;
