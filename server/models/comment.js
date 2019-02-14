var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    commentOwnerId: { type: Schema.Types.ObjectId, ref: 'post' },
    commentContent: String,
    lastEdited: Number,
    children: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    parent: { type: Schema.Types.ObjectId, ref: 'post' } | { type: Schema.Types.ObjectId, ref: 'comment' },
    root: { type: Schema.Types.ObjectId, ref: 'post' },
})

module.exports = mongoose.model('comment',commentSchema,'comments');