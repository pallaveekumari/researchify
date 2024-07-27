const { Router } = require("express");
const { Signup, Login } = require("../Controllers/User.controller");
const authentication = require("../Middlewares/Authentication");
const {
  createTask,
  deleteTask,
  getAllTasks,
  updateTaskCompletion,
} = require("../Controllers/Task.controller");

const AllRoutes = Router();

// User routes
AllRoutes.post("/signup", Signup);
AllRoutes.post("/login", Login);

//Task routes

AllRoutes.post("/addtask", authentication, createTask);
AllRoutes.delete("/deletetask/:id", authentication, deleteTask);
AllRoutes.get("/alltask", authentication, getAllTasks);
AllRoutes.put("/completion/:id", authentication, updateTaskCompletion); 



module.exports = AllRoutes;
