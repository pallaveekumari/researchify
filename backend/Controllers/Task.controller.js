

const { taskModel } = require("../Models/Task.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Create a new task
const createTask = async (req, res) => {
  const payload = req.body;
  try {
    if (
      !payload.title ||
      !payload.description ||
      payload.description.length > 300
    ) {
      return res.status(400).json({ msg: "Invalid content" });
    }

    const newTask = new taskModel({
      ...payload,
      userID: req.user.userId,
    });

    await newTask.save();
    res.status(200).json({ msg: "Task created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};
  



// Delete a task by id
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.status(200).send({ msg: "Deleted task successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong", error: err.message });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json({ msg: "All tasks", data: tasks });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};

//update the completion status 

const updateTaskCompletion = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
  
    // Convert string "true"/"false" to boolean true/false
    const completedStatus = completed === "true";
  
    try {
      const task = await taskModel.findByIdAndUpdate(
        id,
        { completed: completedStatus },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).send({ msg: "Task not found" });
      }
  
      res.status(200).send({ msg: "Task updated successfully", data: task });
    } catch (err) {
      res.status(500).send({ msg: "Something went wrong", error: err.message });
    }
  };
  


module.exports = {
  createTask,
  deleteTask,
  getAllTasks,
  updateTaskCompletion
};
