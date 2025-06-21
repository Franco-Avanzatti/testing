import swaggerJsDoc from "swagger-jsdoc";
import _dirname from "../../utils.js";

const opts = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "CODER TESTING",
            description: "Documentación de la API de CoderCommerce"
        }
    },
    apis: [`${_dirname}/src/docs/*.yaml`],
};

const swaggerSpecs = swaggerJsDoc(opts);

export default swaggerSpecs;