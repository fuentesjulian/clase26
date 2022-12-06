import daoFactory from "../contenedores/daoFactory.js";
import { asDto } from "../dtos/ProdsDto.js";

export default class prodsRepo {
  constructor() {
    this.dao = daoFactory.getDaoProds();
  }

  async getById(id) {
    const data = await this.dao.getById(id);
    if (data) return asDto(data);
    return null;
  }

  async getAll() {
    const data = await this.dao.getAll();
    if (data) return asDto(data);
    return null;
  }

  async getByField(field, criteria) {
    return await this.dao.getByField(field, criteria);
  }

  async createNew(itemData) {
    const newItem = await this.dao.createNew(itemData);
    return newItem;
  }

  async updateById(id, itemData) {
    const updatedItem = await this.dao.updateById(id, itemData);
  }

  async deleteById(id) {
    await this.dao.deleteById(id);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }
}
