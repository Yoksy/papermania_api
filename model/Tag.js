const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String, required: true, trim: true }
});

TagSchema.plugin(URLSlugs('name'));

module.exports = mongoose.model('Tag', TagSchema);
