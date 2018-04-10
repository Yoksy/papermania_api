const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const ItemSchema = new mongoose.Schema({
  itemId: Number,
  title: String,
  description: String,
  slug: String,
  userId: Number,
  category_id: Number,
  tag_ids: Array,
  medias: {
    cover_id: Number,
    video_id: Number,
    gallery_id: Number,
    download_ids: Array,
  },
  meta: {
    difficulty: Number,
    completion_time: Number,
    votes: Number,
    favorites:  Number,
  },
},
{
  timestamps: true
});

ItemSchema.plugin(autoIncrement.plugin, { model: 'Item', field: 'itemId' });

module.exports = mongoose.model('Item', ItemSchema);
