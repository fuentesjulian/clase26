import mongoose from "mongoose";
import * as objectUtils from "../utils/objectUtils.js";
import * as dotenv from "dotenv";
import logger from "../log/logger.js";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

dotenv.config();

await mongoose.connect(process.env.MONGOBD_CONNECTION_STRING, options);


export default class MongoDbContainer {
  constructor(collectionString, schema) {
    this.model = mongoose.model(collectionString, schema);
  }

  async getById(id) {
    try {
      const data = await this.model.findOne({ _id: id });
      const plainData = objectUtils.returnPlainObj(data);
      if (plainData === null) {
        return plainData;
      } else {
        const item = objectUtils.renameField(plainData, "_id", "id");
        return item;
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async getAll() {
    try {
      const data = await this.model.find({});
      const plainData = objectUtils.returnPlainObj(data);
      if (plainData.length) {
        const items = plainData.map((item) => objectUtils.renameField(item, "_id", "id"));
        return items;
      } else {
        return plainData;
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async getByField(field, criteria) {
    try {
      const data = await this.model.findOne().where(field).equals(criteria);
      const plainData = objectUtils.returnPlainObj(data);
      if (plainData === null) {
        return plainData;
      } else {
        const item = objectUtils.renameField(plainData, "_id", "id");
        return item;
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async createNew(itemData) {
    try {
      const data = await this.model.create(itemData);
      const plainData = objectUtils.returnPlainObj(data);
      const newItem = objectUtils.renameField(plainData, "_id", "id");
      return newItem;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateById(id, itemData) {
    try {
      await this.model.updateOne({ _id: id }, { $set: { ...itemData } });
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteById(id) {
    try {
      await this.model.deleteOne({ _id: id });
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteAll() {
    try {
      await this.model.deleteMany({});
    } catch (error) {
      logger.error(error);
    }
  }
}
