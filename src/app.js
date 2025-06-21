import "./helpers/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import { serve, setup } from "swagger-ui-express";
import swaggerSpecs from "./helpers/swagger.helper.js";
import winston from "./middlewares/winston.mid.js";
import errorHandler from "./middlewares/errorHandler.mid.js";
import pathHandler from "./middlewares/pathHandler.mid.js";
import indexRouter from "./routers/index.router.js";

const app = express();

/* middlewares */
app.use(compression({ brotli: { enabled: true, zlib: {} } }));
app.use(cookieParser());
app.use(express.json());
app.use(winston);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(`/api/docs`, serve, setup(swaggerSpecs));

/* router */
app.use("/", indexRouter);
app.use(errorHandler);
app.use(pathHandler);

export default app;
