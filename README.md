src/
    config/
        corsOptions.config.js
        origins.config.js
        role.config.js

    controller/
        auth.controller.js 
        logout.controller.js
        refreshTkn.controller.js
        register.controller.js

    middlewares/
        credentials.middleware.js
        jwt.middleware.js
        role.middleware.js

    models/
        users.json
    routes/
        api/ <- accede una vez se loguea
        auth.js
        logout.js
        refresh.js
        register.js
    server.js

.env <- refresh token y acces token