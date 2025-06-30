# ✨ TemplateGenerator

Aplicación web para crear plantillas de email marketing de forma visual e intuitiva, utilizando Angular en el frontend y Node.js + Express en el backend.
La interfaz permite diseñar correos mediante bloques arrastrables usando la libreria Unlayer, que facilita la creación de campañas personalizadas sin necesidad de escribir HTML.

---

# 🔐 Funcionalidades principales
* Registro y login de usuarios con hash de contraseña usando bcrypt.
* Autenticación mediante JWT (JSON Web Tokens).
* Backend configurado con:
    * bcrypt para encriptar contraseñas.
    * jsonwebtoken para generar y verificar tokens.
    * cookie-parser, cors y dotenv para gestión de cookies, CORS y variables de entorno.
    * Servidor creado con express.

---

# 🔐 Autenticación y Seguridad
* Registro e inicio de sesión con hash de contraseñas usando bcrypt.
* Generación de JWT para autenticación.
* Gestión de sesiones con cookies seguras.
* Uso de middlewares protegidos para acceder a rutas privadas (CRUD de plantillas).
    * Rutas públicas: login y registro.
    * Rutas privadas: gestión de plantillas (crear, leer, actualizar, eliminar).

---

# 🚀 Tecnologías utilizadas

## Frontend: 
* Angular
* Tailwind CSS
* Angular icons
* heroicons
* scrollreveal
* Unlayer

## Backend: Node.js + Express
* API RESTfull
* Autenticación: JWT + Bcrypt
* Otros: Cookie Parser, CORS, Dotenv