const TaskModel  = require("../models/Task");

// ----------Controller function to create task----------
const CreateTask = async (req, res) => {
  const { name, assignee, status, dueDate, description } = req.body;

  try {
    const newTask = new TaskModel({
      name,
      assignee,
      status,
      dueDate,
      description,
    });

    const saveTask = await newTask.save();

    return res.status(201).json({
      status: true,
      task: saveTask,
      success: {
        message: "Successfully Created a new task!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to create a new task!",
      },
    });
  }
};

// ----------Controller function to get all tasks----------
const GetAllTasks = async (req, res) => {
  try {
    const task = await TaskModel.find().exec();
    return res.status(200).json({
      status: true,
      task,
      success: {
        message: "Successfully fetched the tasks!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to fetch the tasks!",
      },
    });
  }
};

// ----------Controller function to get task by id----------
const GetTaskById = async (req, res) => {
  // Request parameters
  const { taskId } = req.params;

  try {
    const task = await TaskModel.findOne({ _id: taskId }).exec();
    return res.status(200).json({
      status: true,
      task,
      success: {
        message: "Successfully fetched the task!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to fetch the task!",
      },
    });
  }
};

// ----------Controller function to update task by id----------
const UpdateTask = async (req, res) => {
  // Request parameters
  const { taskId } = req.params;
  try {
    const task = await TaskModel.findOne({ _id: taskId }).exec();
    if (!task) {
      return res
        .status(404)
        .json({ status: true, error: { message: "Task not found" } });
    }
    const updateTask = await TaskModel.findOneAndUpdate(
      { _id: taskId },
      {
        $set: req.body,
      },
      {
        new: false,
      }
    );
    return res.status(200).json({
      status: true,
      updateTask,
      success: {
        message: "Successfully updated the task!",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to update the task!",
      },
    });
  }
};

// ----------Controller function to delete task by id----------
const DeleteTask = async (req, res) => {
  // Request parameters
  const { taskId } = req.params;
  try {
    const task = await TaskModel.findOne({ _id: taskId }).exec();
    if (!task) {
      return res
        .status(404)
        .json({ status: true, error: { message: "task not found" } });
    }
    const deleteTask = await TaskModel.findOneAndDelete({
      _id: taskId,
    }).exec();
    return res.status(200).json({
      status: true,
      success: {
        message: "Task successfully deleted",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to delete the task!",
      },
    });
  }
};

module.exports = {
  CreateTask,
  GetAllTasks,
  GetTaskById,
  UpdateTask,
  DeleteTask
}
