const express = require("express");
const Router = express.Router();

// controllers
const { createTodo, getAllTodos, getSingleTodo, updateTodo, deleteTodo } = require("../controllers/TodoControllers")

Router.route("/").post(createTodo).get(getAllTodos);
Router.route("/:id").get(getSingleTodo).put(updateTodo).delete(deleteTodo)


module.exports = Router;