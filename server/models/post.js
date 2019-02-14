var mongoose = require('mongoose');
var Schema = mongoose.Schema;
from
var postSchema = new Schema({
  postOwnerId: { type: Schema.Types.ObjectId, ref: 'user' } ,
  title: String,
  postContent: Object,
  branch: String,
  lastEdited: Number,
  tags: [String],
  comment: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
});

module.exports = mongoose.model('post',postSchema,'posts');
