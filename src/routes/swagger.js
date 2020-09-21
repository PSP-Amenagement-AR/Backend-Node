const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "ARAmenagement",
        version: "1.0.0",
        description:
          "A test project to understand how easy it is to document and Express API",
      },
      servers: [
        {
          url: "http://localhost:3000/"
        }
      ]
    },
    apis: ['./src/controllers/*.js', './src/models/*.js'],
};

const specs = swaggerJsdoc(options);

router.use("/docs", swaggerUi.serve);
router.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

module.exports = router;
