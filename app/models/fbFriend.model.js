const mongoose = require("mongoose");

const { Schema } = mongoose;

const FbFriend = new Schema(
  {
    fbId: { type: String, required: true },
    fbName: { type: String, required: true },
    fbAvatar: String,
    fbGender: String,
    unfDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FbFriend", FbFriend);
