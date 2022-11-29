import knex from "knex";
import logger from "../log/logger.js";

class ContenedorSQL {
  constructor(config, tabla) {
    this.knex = knex(config);
    this.tabla = tabla;
  }

  async getById(id) {
    try {
      const resultado = await this.knex(this.tabla).where("id", id).select("*");
      const data = JSON.parse(JSON.stringify(resultado));
      return data;
    } catch (error) {
      logger.error(error);
    }
  }

  async getAll() {
    try {
      const resultado = await this.knex(this.tabla).select("*");
      const data = JSON.parse(JSON.stringify(resultado));
      return data;
    } catch (error) {
      logger.error(error);
    }
  }

  async createNew(elem) {
    try {
      const elemId = await this.knex(this.tabla).insert(elem);
      return elemId;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateById(id, elem) {
    try {
      await this.knex(this.tabla).where("id", id).update(elem);
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteById(id) {
    try {
      await this.knex(this.tabla).where("id", id).del();
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteAll() {
    try {
      await this.knex(this.tabla).del();
    } catch (error) {
      logger.error(error);
    }
  }

  async desconectar() {
    try {
      await this.knex.destroy();
    } catch (error) {
      logger.error(error);
    }
  }
}

export default ContenedorSQL;
