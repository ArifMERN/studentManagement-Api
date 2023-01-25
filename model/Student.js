const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  college: {
    type: String,
  },
  status: {
    type: String,
    default: "Not Placed",
  },
  dsaScore: {
    type: Number,
    default: 0,
  },
  reactScore: {
    type: Number,
    default: 0,
  },
  webdScore: {
    type: Number,
    default: 0,
  },

  // results: [{ type: mongoose.Schema.Types.ObjectId, ref: "result" }],
  interviews: [
    {
      id: { type: String },
      company: {
        type: String,
      },
      result: { type: String },
    },
  ],
});

module.exports = mongoose.model("student", studentSchema);
