import daoFactory from "../contenedores/daoFactory.js";

export default class msgsRepo {
  constructor() {
    this.dao = daoFactory.getDaoMsgs();
    this.dao2 = daoFactory.getDaoMsgs();
    console.log(this.dao === this.dao2);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getByField(field, criteria) {
    return await this.dao.getByField(field, criteria);
  }

  async createNew(itemData) {
    const newItem = await this.dao.createNew(itemData);
    return newItem;
  }

  async updateById(id, itemData) {
    await this.dao.updateById(id, itemData);
  }

  async deleteById(id) {
    await this.dao.deleteById(id);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }
}
