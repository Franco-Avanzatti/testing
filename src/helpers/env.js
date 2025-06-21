import { config } from "dotenv";
import process from "process";

// Extraemos el modo desde los argumentos de línea de comando, ej. --mode=test
const args = process.argv;
const modeArg = args.find(arg => arg.startsWith("--mode="));
const mode = modeArg ? modeArg.split("=")[1] : "dev";

const path = `.env.${mode}`;

// Carga el .env correspondiente según modo
config({ path });


const env = {
  PORT: process.env.PORT,
  LINK_DB: process.env.LINK_DB,
};

export default env;
