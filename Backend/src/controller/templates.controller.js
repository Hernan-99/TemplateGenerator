const fsPromise = require("node:fs/promises");
const path = require("node:path");

const templateModel = {
  templates: require("../models/templates.json"),
  setTemplates: function (data) {
    this.templates = data;
  },
};

const getAllTemplates = async (req, res) => {
  const userTemplates = templateModel.templates.filter(
    (temp) => temp.userEmail === req.email
  );
  res.json(userTemplates);
};

const getTemplateById = async (req, res) => {
  const template = templateModel.templates.find(
    // (temp) => temp.id === parseInt(req.params.id)
    (temp) =>
      temp.id === parseInt(req.params.id) && temp.userEmail === req.email
  );

  if (!template)
    return res.status(400).json({
      message: `Error al obtener el template con id ${req.params.id}`,
    });
  res.json(template);
};

const getTemplateByStatus = async (req, res) => {}; // para filtrar por templates segun su estado (active | review | pause)
// En tu backend (Node/Express):
// app.get('/api/active-templates', (req, res) => {
//   const templates = require('./templates.json');
//   const activeTemplates = templates.filter(t => t.status === 'active');
//   res.json({ count: activeTemplates.length });
// });
const createTemplate = async (req, res) => {
  const newTemplate = {
    id:
      templateModel.templates.length > 0
        ? templateModel.templates[templateModel.templates.length - 1].id + 1
        : 1,
    name: req.body.name,
    subject: req.body.subject,
    category: req.body.category,
    message: req.body.message,
    html: req.body.html,
    userEmail: req.email, // <- Asocio el template con el usuario autenticado
  };

  if (
    !newTemplate.name ||
    !newTemplate.subject ||
    !newTemplate.message ||
    !newTemplate.category ||
    !newTemplate.html
  )
    return res.status(400).json({ message: "Todos los campos son requeridos" });

  templateModel.setTemplates([...templateModel.templates, newTemplate]);

  try {
    await fsPromise.writeFile(
      path.join(__dirname, "..", "models", "templates.json"),
      JSON.stringify(templateModel.templates)
    );
    console.log(templateModel.templates);
    res.status(201).json({ success: `Template creado correctamente` });
  } catch (err) {
    console.error("Error al guardar:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const updateTemplate = async (req, res) => {
  const { name, subject, category, message, html } = req.body;
  const email = req.email;
  const { id } = req.params;
  const template = templateModel.templates.find(
    (temp) => temp.id === parseInt(id) && temp.userEmail === email
  );

  if (!template)
    return res.status(400).json({
      message: `Template no encontrado`,
    });

  if (name) template.name = name;
  if (subject) template.subject = subject;
  if (category) template.category = category;
  if (message) template.message = message;
  if (html) template.html = html;

  const filteredArr = templateModel.templates.filter(
    (temp) => temp.id !== parseInt(id)
  );

  const updatedTemplates = [...filteredArr, template].sort(
    (a, b) => a.id - b.id
  );
  templateModel.setTemplates(updatedTemplates);

  try {
    await fsPromise.writeFile(
      path.join(__dirname, "..", "models", "templates.json"),
      JSON.stringify(templateModel.templates)
    );
    res.json({ message: "Template actualizado correctamente", template });
  } catch (err) {
    console.error("Error al actualizar:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteTemplate = async (req, res) => {
  const { id } = req.params;
  const email = req.email;

  const template = templateModel.templates.find(
    (temp) => temp.id === parseInt(id) && temp.userEmail === email
  );

  if (!template)
    return res.status(404).json({ message: "Template no encontrado" });

  const filteredArr = templateModel.templates.filter(
    (temp) => temp.id !== parseInt(id)
  );

  templateModel.setTemplates([...filteredArr]);

  try {
    await fsPromise.writeFile(
      path.join(__dirname, "..", "models", "templates.json"),
      JSON.stringify(templateModel.templates)
    );
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
