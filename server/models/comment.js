var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    id: String | Int32Array,
    commentOwnerId: String,
    commentContent: String,
    lastEdited: Number,
    children: [commentSchema],
    parent: String,
    root: String,
})

module.exports = mongoose.model('comment',commentSchema,'comments');