const FbFriend = require("../models/fbFriend.model");
const { FbFriendService } = require("../services/fbFriend.service");
const { FbGraphService } = require("../services/fbGraph.service");

class FbController {
  constructor() {
    this.fbFriendService = new FbFriendService(FbFriend);
    this.fbGraphService = new FbGraphService();
  }

  friendList = async (req, res, next) => {
    const data = await this.fbFriendService.getFriendList(req.query);
    return res.status(200).json({
      success: true,
      data,
    });
  };

  unfriendList = async (req, res, next) => {
    const data = await this.fbFriendService.getUnfriendList();
    return res.status(200).json({
      success: true,
      data,
    });
  };

  fetchList = async (req, res, next) => {
    const result = await this.fbFriendService.fetchList();
    return res.status(200).json({
      success: result,
    });
  };
}

module.exports = new FbController();
