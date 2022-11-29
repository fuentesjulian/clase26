export default class ContenedorMemoria {
  constructor() {
    this.data = [];
    this.id = 0;
  }

  async getById(id) {
    return this.data.find((item) => item.id === id);
  }

  async getAll() {
    return this.data;
  }

  async getByField(field, criteria) {
    return this.data.find((item) => item[field] === criteria);
  }

  async createNew(itemData) {
    itemData.id = this.id++;
    itemData.createdAt = Date.now();
    this.data.push(itemData);
  }

  async updateById(id, itemData) {
    const oldItemData = this.data.find((item) => item.id === id);
    const newItemData = { ...oldItemData, ...itemData };
    this.data.filter((item) => item.id != id);
    this.data.push(newItemData);
  }

  async deleteById(id) {
    this.data.filter((item) => item.id != id);
  }

  async deleteAll() {
    this.data = [];
  }
}
