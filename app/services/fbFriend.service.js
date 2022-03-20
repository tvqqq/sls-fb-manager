const { CRUDService } = require("./crud.service");
const { FbGraphService } = require("../services/fbGraph.service");
const { SlackService } = require("../services/slack.service");

class FbFriendService extends CRUDService {
  constructor(model) {
    super(model);
    this.fbGraphService = new FbGraphService();
    this.slackService = new SlackService();
  }

  getFriendList = async ({ page, search }) => {
    const limit = 20;
    let filter = {
      unfDate: null,
    };
    if (!_.isUndefined(search)) {
      const searchFilter = {
        $or: [
          {
            fbName: { $regex: search, $options: "i" },
          },
          {
            fbId: search,
          },
        ],
      };
      filter = { ...filter, ...searchFilter };
    }
    const skip =
      _.isUndefined(page) || parseInt(page) === 0 ? 0 : page - 1 * limit;
    const result = await this.paginator(filter, skip, limit);
    return result;
  };

  getUnfriendList = async () => {
    return await this.find({ unfDate: { $ne: null } });
  };

  checkUnfriend = async (newFriendList) => {
    const currentFriendList = await this.getFriendList();
    const currentPluckId = _.map(currentFriendList, "fbId");
    const newPluckId = _.map(newFriendList, "fbId");
    const diff = _.difference(currentPluckId, newPluckId);

    const dataFbUnfriend = [];
    await Promise.all(
      diff.map(async (unfId) => {
        const checkUnfOrDeactivated = await this.fbGraphService.callFbGraph(
          unfId
        );
        if (!_.isEmpty(checkUnfOrDeactivated.id)) {
          await this.update({ unfDate: new Date() }, { fbId: unfId });
          dataFbUnfriend.push(unfId);
        }
      })
    );
    if (dataFbUnfriend.length > 0) {
      const textUnf = dataFbUnfriend.join("\n>");
      await this.slackService.sendMessage(
        "😩 There are some unfriends today\n" + textUnf
      );
    }
  };

  fetchList = async () => {
    const fetch = await this.fbGraphService.fetchUpdateFriends();
    if (!fetch.success) {
      return false;
    }
    await Promise.all(
      fetch.data.map(async (newFriend) => {
        await this.upsert(newFriend, { fbId: newFriend.fbId });
      })
    );
    await this.checkUnfriend(fetch.data);
    return true;
  };
}

module.exports = { FbFriendService };
