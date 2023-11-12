const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assignee: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
