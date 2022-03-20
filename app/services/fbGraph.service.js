const fetch = require("node-fetch");
const { SlackService } = require("../services/slack.service");

class FbGraphService {
  constructor() {
    this.slackService = new SlackService();
  }

  callFbGraph = async (node, edges = "", fields = "") => {
    const fbAccessToken = process.env.FB_ACCESS_TOKEN;
    const FB_GRAPH_URL = "https://graph.facebook.com/v6.0/";
    const response = await fetch(
      FB_GRAPH_URL +
        node +
        "/" +
        edges +
        "?access_token=" +
        fbAccessToken +
        fields
    );
    return await response.json();
  };

  fetchUpdateFriends = async () => {
    const curl = await this.callFbGraph(
      "me",
      "friends",
      "&fields=name,picture.width(2048){url},gender&pretty=0&limit=5000"
    );
    if (curl.error) {
      await this.slackService.sendMessage("⛔️ *ERROR*\n" + curl.error.message);
      return {
        success: false,
        error: curl.error,
      };
    }
    const records = curl.data;
    const newFriends = [];
    records.map((record) => {
      newFriends.push({
        fbId: record.id,
        fbName: record.name,
        fbGender: record.gender || null,
        fbAvatar: record.picture.data.url || null,
        unfDate: null,
      });
    });
    return {
      success: true,
      data: newFriends,
    };
  };
}

module.exports = { FbGraphService };
