import cluster from "cluster";
import { cpus } from "os";
import dbConnect from "./helpers/dbConnect.helper.js";
import logger from "./helpers/logger.helper.js";
import argvs from "./helpers/arguments.helper.js";
import app from "./app.js";

const port = process.env.PORT || 8080;

const ready = async () => {
  logger.INFO(`✅ Server ready on port ${port} in mode ${argvs.mode}`);
  try {
    await dbConnect(process.env.LINK_DB);
    logger.INFO("🟢 Conexión a la base de datos exitosa");
  } catch (error) {
    logger.ERROR("🔴 Error al conectar a la base de datos", error);
  }
};

if (argvs.mode !== "test" && cluster.isPrimary) {
  // Limitar a máximo 2 procesos workers (o el número que prefieras)
  const maxWorkers = 2;
  const numberOfProcess = Math.min(cpus().length, maxWorkers);
  logger.INFO(`🔁 Iniciando clustering con ${numberOfProcess} procesos`);

  for (let i = 0; i < numberOfProcess; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.INFO(`Worker ${worker.process.pid} murió. Código: ${code}, señal: ${signal}`);
    // Opcional: reiniciar worker
    // cluster.fork();
  });
} else {
  app.listen(port, ready);
}
