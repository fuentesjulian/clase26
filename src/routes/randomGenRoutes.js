import express from "express";
const router = express.Router();
import { fork } from "child_process";
import { genRandoms } from "../api/randomGen.js";

export default router.get("/", (req, res) => {
  // si no está definida la cantidad, le pongo por default 100.000.000
  let cantidad = req.query.cant ?? 1e8;

  // DESACTIVO RANDOM GEN EN MODO FORK
  // const forked = fork("./src/api/randomGen.js");
  // const msg = { action: "start", count: cantidad };
  // forked.send(msg);
  // forked.on("message", (randomArray) => {
  //   res.send(randomArray);
  // });

  // lo hago en modo secuencial
  const randomArray = genRandoms(cantidad);
  res.send(randomArray)
});
