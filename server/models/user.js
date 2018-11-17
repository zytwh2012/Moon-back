var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email:  'string',
  password: 'string',
});

module.exports = mongoose.model('user',userSchema,'users');
