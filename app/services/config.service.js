const { CRUDService } = require("./crud.service");

class ConfigService extends CRUDService {
  constructor(model) {
    super(model);
  }
}

module.exports = { ConfigService };
