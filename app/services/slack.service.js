const fetch = require("node-fetch");
class SlackService {
  sendMessage = async (content) => {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: content,
      }),
    });
  };
}

module.exports = { SlackService };
