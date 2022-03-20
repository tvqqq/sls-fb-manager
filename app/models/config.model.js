const mongoose = require("mongoose");

const { Schema } = mongoose;

const Config = new Schema(
  {
    value: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Config", Config);
