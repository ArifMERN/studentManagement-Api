const mongoose = require("mongoose");

const InterviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  interviewDate: {
    type: String,
    required: true,
  },
  applied: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
});

module.exports = mongoose.model("Interview", InterviewSchema);
