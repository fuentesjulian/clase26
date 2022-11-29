import MongoDbContainer from "./ContenedorMongoDB.js";
import ContenedorArchivo from "./ContenedorArchivo.js";
import ContenedorMemoria from "./ContenedorMemoria.js";
import Yargs from "yargs";
import * as msgsConfig from "../config/msgs.js";
import * as prodConfig from "../config/products.js";

const yargs = Yargs(process.argv.slice(2));
const args = yargs.alias({ d: "database" }).default({ database: "mongo" }).argv;

let dao = null;
const option = args.database;

export default class daoFactory {
  constructor() {
    this.uuid = Date.now();
    switch (option) {
      case "mongo":
        this.msgs = new MongoDbContainer(msgsConfig.msgsCollection, msgsConfig.msgsSchema);
        this.prods = new MongoDbContainer(prodConfig.prodCollection, prodConfig.prodSchema);
        break;
      case "file":
        this.msgs = new ContenedorArchivo("msgs");
        this.prods = new ContenedorArchivo("prods");
        break;
      case "mem":
        this.msgs = new ContenedorMemoria();
        this.prods = new ContenedorMemoria();
        break;
    }
  }
  static getDaos() {
    if (!dao) {
      dao = new daoFactory();
    }
    return dao;
  }

  static getDaoMsgs() {
    if (!dao) {
      dao = new daoFactory();
    }
    return dao.msgs;
  }

  static getDaoProds() {
    if (!dao) {
      dao = new daoFactory();
    }

    return dao.prods;
  }
}
