const { model, Schema } = require("mongoose");

const noteSchema = new Schema({
  title: { type: String, required: false, default: "No title" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  color: {
    type: String,
    enum: ["Yellow", "Green", "Pink", "Blue"],
    default: "Yellow",
  },
});

module.exports = model("Note", noteSchema);
