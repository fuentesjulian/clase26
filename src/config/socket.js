import ContenedorSQL from "../contenedores/ContenedorSQL.js";
import config from "../config.js";
import MongoDbContainer from "../contenedores/ContenedorMongoDB.js";
import * as msgsConfig from "../config/msgs.js";
import * as msgNormalizer from "../utils/normalizer.js";
import * as prodConfig from "../config/products.js";

import msgsRepo from "../repos/msgsRepo.js";
import prodsRepo from "../repos/prodsRepo.js";
const mensajesApi = new msgsRepo();
const productosApi = new prodsRepo();

const processMsgData = (msgData) => {
  const originalData = { id: "mensajes", mensajes: msgData };
  return msgNormalizer.getNormalized(originalData);
};

export const socketConfig = (io) => {
  io.on("connection", async (socket) => {
    // apenas se genera la conexión tengo que cargar mensajes y productos
    const productos = await productosApi.getAll();
    io.sockets.emit("productos", productos);
    const msgData = await mensajesApi.getAll();
    const mensajes = processMsgData(msgData);
    io.sockets.emit("mensajes", mensajes);

    console.log("Nueva conexion");
    // cuando llega un producto nuevo grabo, obtengo data, hago emit
    socket.on("newProduct", async (data) => {
      await productosApi.createNew(data);
      const productos = await productosApi.getAll();
      io.sockets.emit("productos", productos);
    });

    // cuando llega un producto nuevo grabo, obtengo data, hago emit
    socket.on("newMessage", async (data) => {
      await mensajesApi.createNew(data);
      const msgData = await mensajesApi.getAll();
      const mensajes = processMsgData(msgData);
      io.sockets.emit("mensajes", mensajes);
    });
  });
};
