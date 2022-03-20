const { CRUDService } = require("./crud.service");
const Config = require("../models/config.model");

class ConfigService extends CRUDService {
  constructor() {
    super(Config);
  }
}

module.exports = { ConfigService };
