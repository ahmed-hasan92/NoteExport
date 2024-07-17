const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  google: String,
  image: { type: String, default: null },
  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
});

module.exports = model("User", userSchema);
