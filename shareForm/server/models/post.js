var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  id:  'string',
  password: 'string',
});

module.exports = mongoose.model('post',podtSchema,'posts');
