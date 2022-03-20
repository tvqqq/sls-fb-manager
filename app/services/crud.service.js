class CRUDService {
  constructor(model) {
    this.model = model;
  }

  /**
   * @see: https://mongoosejs.com/docs/tutorials/findoneandupdate.html#upsert
   */
  async upsert(data, filter) {
    return await this.model.findOneAndUpdate(filter, data, {
      new: true,
      upsert: true, // Make this update into an upsert
    });
  }

  async find(filter) {
    return await this.model.find(filter).exec();
  }

  async update(data, filter) {
    return await this.model.updateMany(filter, data);
  }

  async paginator(filter, skip, limit) {
    return await this.model.find(filter).skip(skip).limit(limit).exec();
  }
}

module.exports = { CRUDService };
