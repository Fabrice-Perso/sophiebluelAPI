require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("swagger.yaml");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use("/images", express.static(path.join(__dirname, "images")));

// Importation des routes
const userRoutes = require("./routes/user.routes");
const categoriesRoutes = require("./routes/categories.routes");
const worksRoutes = require("./routes/works.routes");

// Utilisation des routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/works", worksRoutes);

// Swagger UI pour la documentation de l'API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
