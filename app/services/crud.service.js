class CRUDService {
  constructor(model) {
    this.model = model;
  }

  getModel() {
    return this.model;
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

  async find(filter, sort) {
    return await this.model.find(filter).sort(sort).exec();
  }

  async update(data, filter) {
    return await this.model.updateMany(filter, data);
  }

  async paginator(filter, skip, limit, sort) {
    return await this.model.find(filter).sort(sort).skip(skip).limit(limit);
  }
}

module.exports = { CRUDService };
