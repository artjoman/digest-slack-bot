var mongoose = require('mongoose');

const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: 20,
  reconnectInterval: 5000, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/balloon-bot', options);

var Message = mongoose.model('Message', {
  type: String,
  id: String,
  channel: String,
  votes: Number,
  broadcasted: { type: Boolean, default: false }
});

exports.Message = Message;
