import express from "express";
const router = express.Router();

export default router.get("/", (req, res) => {
  const data = [];
  data.push({ "Argumento de entrada": process.argv[1] });
  data.push({ "Nombre de la plataforma": process.platform });
  data.push({ "Version de node.js": process.version });
  data.push({ "Memoria total reservada (ress)": process.memoryUsage.rss() });
  data.push({ "Path de ejecucion": process.argv[0] });
  data.push({ "Process id": process.pid });
  data.push({ "Carpeta del proyecto": process.cwd() });
  res.send(data);
});
