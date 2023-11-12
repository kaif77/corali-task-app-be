const express = require("express");
const {
  CreateTask,
  GetAllTasks,
  GetTaskById,
  UpdateTask,
  DeleteTask,
} = require("../controllers/Task");

// Initialize the router
const router = express.Router();

router.get("/", GetAllTasks);

router.get("/:taskId", GetTaskById);

router.post("/", CreateTask);

router.put("/:taskId", UpdateTask);

router.delete("/:taskId", DeleteTask);

module.exports = router;