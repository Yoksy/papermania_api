const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;

const Gallery = require('./Gallery')
const Comment = require('./Comment');

const ItemSchema = new Schema({
  item_id: Number,
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  category: { type: String, required: true },
  tags: [String],
  difficulty: { type: Number, min: 0, max: 4, required: true },
  completion_time: { type: Number, required: true },
  medias: {
    thumbnail: String,
    cover: String,
    video: {
      src: String,
      poster: String
    },
    gallery: [Gallery],
    download: Array,
  },
  meta: {
    votes: Number,
    favorites:  Number,
  },
  comments: [Comment.schema]
},
{
  timestamps: true
});

ItemSchema.plugin(autoIncrement.plugin, { model: 'Item', field: 'item_id' });
ItemSchema.plugin(URLSlugs('item_id title'));

module.exports = mongoose.model('Item', ItemSchema);
