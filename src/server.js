import { httpServer } from "./main.js";
import Yargs from "yargs";
import { fork } from "child_process";
import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;

//--------------------------------------------
// funcion runFork que corre el servidor como fork desde un wrapper
// toma como parametro el puerto
const runFork = (port) => {
  const forked = fork("./src/serverWrapper.js");
  const msg = { action: "start", port: port };
  forked.send(msg);
};

//--------------------------------------------
// funcion runCluster que corre el servidor como cluster
// toma como parametro el puerto
const runCluster = (port) => {
  if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    const connectedServer = httpServer.listen(port, () => {
      console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
    });
    connectedServer.on("error", (error) => console.log(`Error en servidor ${error}`));
  }
};

//--------------------------------------------
// funcion runCluster que corre el servidor normalmente
// toma como parametro el puerto
const runNormal = (port) => {
  const connectedServer = httpServer.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
  });
};

//--------------------------------------------
// inicio el servidor
const yargs = Yargs(process.argv.slice(2));
const args = yargs.alias({ p: "port", m: "mode"}).default({ port: 8080, mode: "NORMAL" }).argv;

const PORT = process.env.PORT || 8080;
const MODE = args.mode;


switch (MODE) {
  case "CLUSTER":
    runCluster(PORT);
    break;

  case "FORK":
    runFork(PORT);
    break;

  case "NORMAL":
    runNormal(PORT);
    break;
  default:
}
