const express = require("express");
const passport = require("passport");
const {
  newNote,
  updateNote,
  deleteNote,
  getAllNotes,
} = require("./note.controllers");

const router = express.Router();

router.post("/note", passport.authenticate("jwt", { session: false }), newNote);
router.put(
  "/note/:noteId",
  passport.authenticate("jwt", { session: false }),
  updateNote
);

router.delete(
  "/note/:noteId",
  passport.authenticate("jwt", { session: false }),
  deleteNote
);

router.get(
  "/note",
  passport.authenticate("jwt", { session: false }),
  getAllNotes
);
module.exports = router;
