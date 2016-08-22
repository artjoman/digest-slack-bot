var model = require('./model');
var config = require('./config');
var request = require('request');

var LIMIT = 20;

function fetchMessageContent(msgs, callback) {
  var url = 'https://slack.com/api/channels.list?token=' + config.SLACK_TOKEN;
  //console.log(url);
  request.get(url, { json: true }, (err, res, body) => {
    //console.log(err, typeof body, body);
    var channels = {};
    body.channels.forEach(c => {
      channels[c.id] = c;
    });
    callback(err, msgs.map(m => Object.assign(m, {
      channelName: channels[m.channel]
    })));
  });
}

model.Message.find({ broadcasted: false }).sort({ votes: -1 }).limit(LIMIT).exec(function(err, msgs){
  fetchMessageContent(msgs, function(err, messages){
    messages.forEach(function(msg){
      // syntax: <nb_votes> :balloon: <URL>
      var url = 'http://' + config.SLACK_NAME + '.slack.com/archive/' + msg.channelName + '/p' + msg.id.replace('.', '');
      var digestLine = msg.votes + ' :' + config.REACTION_NAME + ': ' + url;
      // display in the #gen-bot channel
      //config.bot.postMessageToChannel(config.DIGEST_CHANNEL, digestLine);
      console.log(digestLine); // TODO
    });

    // TODO: send digest to admin, then allow admin to edit it before sharing it publicly
    // config.bot.postMessageToUser(config.ADMIN_USERNAME, digest, { 'slackbot': true, icon_emoji: ':cat:' });
    // will post the user, from "Gem Bot" (instead of slack's slackbot channel)

    // mark messages
    const ids = messages.map(m => m.id);
    model.Message.update({ id: { $in : ids } }, { $set: { broadcasted: true } }, { multi: true }, (err, res) => {
      err && console.error(err);
    });
  });
});