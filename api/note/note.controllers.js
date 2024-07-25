const Note = require("../../models/Note");
const User = require("../../models/User");

exports.newNote = async (req, res, next) => {
  try {
    const newNote = await Note.create({
      title: req.body.title,
      content: req.body.content,
      color: req.body.color,
      user: req.user._id,
    });

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { notes: newNote._id } }
    );
    res.status(201).json("A new note has been added");
  } catch (error) {
    next(error);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const existingNote = await Note.findById(noteId);
    if (!existingNote) {
      return res
        .status(404)
        .json("The note you're trying to reach can't be found");
    }

    await Note.findByIdAndUpdate(
      { _id: existingNote._id },
      {
        title: req.body.title,
        content: req.body.content,
        color: req.body.color,
      }
    );
    res.status(200).json("The note has been updated");
  } catch (error) {
    next(error);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const existingNote = await Note.findById(noteId);
    if (!existingNote) {
      return res
        .status(404)
        .json("The note you have been trying to delete can't be found");
    }
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { notes: existingNote._id } }
    );
    await Note.findByIdAndDelete({ _id: existingNote._id });
    res.status(200).json("The note has been deleted");
  } catch (error) {
    next(error);
  }
};

exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    if (!notes || notes.length === 0) {
      return res.status(404).json("There are no available notes!");
    }
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

exports.getOneNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const existingNote = await Note.findById(noteId);
    if (!existingNote) {
      return res.status(404).json("This not is not existed!");
    }

    res.status(200).json(existingNote);
  } catch (error) {
    next(error);
  }
};
