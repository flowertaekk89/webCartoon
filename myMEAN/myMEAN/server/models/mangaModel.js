const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mangaSchema = new Schema({
  title: {type: String, required: true},
  cover_img: String,
  manga_img: {type: String, required: true, unique: true},
  episode: {type: Number, required: true},
  subtitle: {type: String, required: true},
  uploadedAt: Date
});

var Manga = mongoose.model('Manga', mangaSchema);
module.exports = Manga;
