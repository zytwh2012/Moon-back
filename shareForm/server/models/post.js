var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  id: Number,
  post_owner_id: Number,
  parent_post: Number,
  child_post: Number,
  post_content: String,
  title: String,
  branch: String,
  last_edited: Date

});

module.exports = mongoose.model('post',postSchema,'posts');
