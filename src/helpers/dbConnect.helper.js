import { connect } from "mongoose";
import logger from "./logger.helper.js";

const dbConnect = async (url) => {
  try {
    const connection = await connect(url);
    logger.INFO("connected to mongo database");
    return connection; // devolvemos la conexión para que Mocha pueda esperar
  } catch (error) {
    logger.ERROR("Error al conectar con Mongo:", error.message);
    throw error; //  lanzo el error para que Mocha (o el entorno) lo detecte
  }
};

export default dbConnect;
