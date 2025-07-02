const Template = require("../models/template.model.js");
// const fsPromise = require("node:fs/promises");
// const path = require("node:path");
// const templateModel = {
//   templates: require("../models/templates.json"),
//   setTemplates: function (data) {
//     this.templates = data;
//   },
// };

const getAllTemplates = async (req, res) => {
  const email = req.email;
  try {
    const templates = await Template.findAll({
      where: { userEmail: email },
    });
    res.json(templates);
  } catch (err) {
    console.error("❌ Error al obtener templates:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getTemplateById = async (req, res) => {
  const { id } = req.params;
  const email = req.email;
  try {
    const template = await Template.findOne({ where: { id, userEmail: email } });
    if (!template)
      return res.status(400).json({
        message: `Error al obtener el template con id ${id}`,
      });
    res.json(template);
  } catch (err) {
    console.error("❌ Error al obtener template por ID:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// feature futura
const getTemplateByStatus = async (req, res) => {}; // para filtrar por templates segun su estado (active | review | pause)
// app.get('/api/active-templates', (req, res) => {
//   const templates = require('./templates.json');
//   const activeTemplates = templates.filter(t => t.status === 'active');
//   res.json({ count: activeTemplates.length });
// });

const createTemplate = async (req, res) => {
  const { name, subject, category, message, html } = req.body;
  if (
    !newTemplate.name ||
    !newTemplate.subject ||
    !newTemplate.message ||
    !newTemplate.category ||
    !newTemplate.html
  )
    return res.status(400).json({ message: "Todos los campos son requeridos" });

  try {
    const newTemplate = await Template.create({
      // id: se genera automáticamente como UUID v4
      name,
      subject,
      category,
      message,
      html,
      userEmail: req.email, // <- Asocio el template con el usuario autenticado
    });
    res.status(201).json({
      message: "Template creado correctamente",
      template: newTemplate,
    });
  } catch (err) {
    console.error("❌ Error al crear template:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const updateTemplate = async (req, res) => {
  const { name, subject, category, message, html } = req.body;
  const { id } = req.params;
  const email = req.email;

  try {
    const template = await Template.findOne({ where: { id, userEmail: email } });
    if (!template)
      return res.status(404).json({
        message: `Template con el ${id} no encontrado`,
      });

    template.name = name || template.name;
    template.subject = subject || template.subject;
    template.category = category || template.category;
    template.message = message || template.message;
    template.html = html || template.html;

    await template.save();
    res.json({ message: "Template actualizado correctamente", template });
  } catch (err) {
    console.error("❌ Error al actualizar template:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteTemplate = async (req, res) => {
  const { id } = req.params;
  const email = req.email;
  try {
    const template = await Template.findOne({ where: { id, userEmail: email } });
    if (!template)
      return res.status(404).json({
        message: `Template con el ${id} no encontrado`,
      });

    await template.destroy();
    res.json({ message: "Template eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
