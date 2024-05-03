const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  content : String,
  date : Date,
  nbLike : Number,
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
user : String,
  
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;