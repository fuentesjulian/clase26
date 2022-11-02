import express from "express";
const router = express.Router();
import os from "os";

export default router.get("/", (req, res) => {
  const data = [];
  data.push({ "Argumento de entrada": process.argv.slice(2) });
  data.push({ "Nombre de la plataforma": process.platform });
  data.push({ "Version de node.js": process.version });
  data.push({ "Memoria total reservada (ress)": process.memoryUsage.rss() });
  data.push({ "Path de ejecucion": process.argv[0] });
  data.push({ "Process id": process.pid });
  data.push({ "Carpeta del proyecto": process.cwd() });
  data.push({ "Numero de procesadores": os.cpus().length });
  // Activo o desactivo el console.log de la data
  // console.log(data)
  res.send(data);
});
