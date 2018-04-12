const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  thumbnail: { type: String, required: true },
  src: { type: String, required: true },
  alt: String,
});

module.exports = GallerySchema;
