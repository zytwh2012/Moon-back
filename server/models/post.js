var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  id: Number,
  postOwner_id: Number,
  parent_post: Number,
  child_post: Number,
  postContent: Map,
  title: String,
  branch: String,
  lastEdited: Date

});

module.exports = mongoose.model('post',postSchema,'posts');
