const { ConfigService } = require("../services/config.service");

class ConfigController {
  constructor() {
    this.configService = new ConfigService();
  }

  getFat = async (req, res, next) => {
    const data = await this.configService
      .getModel()
      .findById(process.env.CONFIG_FAT_ID);
    return res.status(200).json({
      success: true,
      data: data.value,
    });
  };

  postFat = async (req, res, next) => {
    const data = await this.configService
      .getModel()
      .findById(process.env.CONFIG_FAT_ID)
      .update({
        value: req.body.access_token,
      });
    return res.status(200).json({
      success: true,
      data: data.value,
    });
  };
}

module.exports = new ConfigController();
