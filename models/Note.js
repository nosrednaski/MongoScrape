const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

let noteDate = moment().format("MMM D YYYY, kk:mm")
const NoteSchema = new Schema({
  body: String,
  dateCreated: {
    type: String,
    default: noteDate
  }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
