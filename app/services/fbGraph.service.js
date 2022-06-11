const fetch = require("node-fetch");
const { SlackService } = require("../services/slack.service");
const { ConfigService } = require("../services/config.service");

class FbGraphService {
  constructor() {
    this.slackService = new SlackService();
    this.configService = new ConfigService();
  }

  callFbGraph = async (node, edges = "", fields = "") => {
    let fbAccessToken = await this.configService
      .getModel()
      .findById(process.env.CONFIG_FAT_ID);
    fbAccessToken = fbAccessToken.value;
    let fbCookie = await this.configService
      .getModel()
      .findById(process.env.CONFIG_FC_ID);
    fbCookie = fbCookie.value;
    // @see https://developers.facebook.com/docs/graph-api/changelog/version14.0
    const FB_GRAPH_URL = "https://graph.facebook.com/v14.0/";
    const response = await fetch(
      FB_GRAPH_URL +
        node +
        "/" +
        edges +
        "?access_token=" +
        fbAccessToken +
        fields,
      {
        headers: {
          Cookie: fbCookie,
        },
      }
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
