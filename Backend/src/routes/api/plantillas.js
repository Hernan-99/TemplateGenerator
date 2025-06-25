const express = require("express");
const router = express.Router();
const templatesController = require("../../controller/plantilla.controller.js");
const verifyRole = require("../../middlewares/role.middleware.js");
const ROLE_LIST = require("../../config/role.list.js");

router
  .route("/")
  .get(verifyRole(ROLE_LIST.User), templatesController.getAllTemplates)
  .post(verifyRole(ROLE_LIST.User), templatesController.createTemplate);

router
  .get("/:id")
  .get(verifyRole(ROLE_LIST.User), templatesController.getTemplateById);

module.exports = router;
