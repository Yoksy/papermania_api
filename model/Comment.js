const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  item_id: Schema.Types.ObjectId,
  parent_id: Schema.Types.ObjectId,
  slug: String,
  full_slug: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: String,
  authorAvatar: String,
  content: String
});

module.exports = mongoose.model('Comment', CommentSchema);
