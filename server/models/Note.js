const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    idOwner: String,
    text: String,
    isVisible: Boolean
  }, {timestamps: true});
  
  const Note = mongoose.model('Note', NoteSchema);
  module.exports = {Note};