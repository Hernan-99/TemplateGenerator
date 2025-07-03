const express = require("express");
const router = express.Router();

const templatesController = require("../../controller/templates.controller.js");
const verifyRole = require("../../middlewares/role.middleware.js");
const ROLE_LIST = require("../../config/role.list.js");
router
  .route("/")
  .get(verifyRole(ROLE_LIST.User), templatesController.getAllTemplates)
  .post(verifyRole(ROLE_LIST.User), templatesController.createTemplate);

router
  .route("/:id")
  .get(verifyRole(ROLE_LIST.User), templatesController.getTemplateById)
  .put(verifyRole(ROLE_LIST.User), templatesController.updateTemplate)
  .delete(verifyRole(ROLE_LIST.User), templatesController.deleteTemplate);

module.exports = router;
