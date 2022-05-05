var SlackBot = require('slackbots');

module.exports = {
  REACTION_NAME: process.env.REACTION_NAME || 'balloon',
  SLACK_NAME: process.env.SLACK_NAME || 'artjoman',
  SLACK_TOKEN: process.env.SLACK_TOKEN.substr(),
  DIGEST_CHANNEL: process.env.DIGEST_CHANNEL || 'techies-of-baltics-bot',
  BOT_NAME: process.env.BOT_NAME || 'Techies of Baltics Bot',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'artjoman'
};

// create a bot
module.exports.bot = new SlackBot({
    token: module.exports.SLACK_TOKEN,
    name: module.exports.BOT_NAME
});
