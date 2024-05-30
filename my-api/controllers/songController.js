const Song = require("../models/song");

exports.createSong = async (req, res) => {
  const { title, description } = req.body;
  try {
    const song = new Song({ title, description });
    const savedSong = await song.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getSong = async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findById(id);
    if (!song) res.status(404).json({ error: "Song not found" });
    else res.json(song);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.updateSong = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const song = await Song.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!song) res.status(404).json({ error: "Song not found" });
    else res.json(song);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.deleteSong = async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findByIdAndDelete(id);
    if (!song) res.status(404).json({ error: "Song not found" });
    else res.json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};