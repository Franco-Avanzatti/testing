import { connect } from "mongoose";
import logger from "./logger.helper.js";

const dbConnect = async (url) => {
  try {
    await connect(url);
    logger.INFO("connected to mongo database")
  } catch (error) {
    logger.ERROR(error.message);
  }
};

export default dbConnect;