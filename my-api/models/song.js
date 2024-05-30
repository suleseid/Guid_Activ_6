const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;