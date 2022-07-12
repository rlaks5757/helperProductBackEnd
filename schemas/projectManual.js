const mongoose = require("mongoose");

const { Schema } = mongoose;

const projectManualSchema = new Schema({
  projectName: {
    type: String,
  },
  categoryName: {
    type: String,
  },
  title: { type: String },
  description: { type: String },
  number: { type: Number },
});

module.exports =
  mongoose.models.projectManual ||
  mongoose.model("projectManual", projectManualSchema);
