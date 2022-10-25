import { httpServer } from "./main.js";

process.on("message", (msg) => {
  if (msg.action === "start") {
    const connectedServer = httpServer.listen(msg.port, () => {
      console.log(
        `Servidor http escuchando en el puerto ${
          connectedServer.address().port
        }`
      );
    });
    connectedServer.on("error", (error) =>
      console.log(`Error en servidor ${error}`)
    );
  }
});
