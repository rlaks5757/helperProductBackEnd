const mongoose = require("mongoose");

const { Schema } = mongoose;

const projectInfoSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    unique: true,
    maxlength: [100, "Title cannot be more than 40 characters"],
  },
  clientLogo: { type: String },
  clientImg: { type: String },
  data: { type: Array },
});

module.exports =
  mongoose.models.projectInfo ||
  mongoose.model("projectInfo", projectInfoSchema);
