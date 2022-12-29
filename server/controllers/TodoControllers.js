const Todo = require("../models/TodoModel");
const createError = require('http-errors')

// post  /api/todos
exports.createTodo = async (req, res, next) => {
    const { name } = req.body
    try {
        // check exist
        const todo = await Todo.findOne(
            {
                $or: [
                    {
                        name: name
                    },
                    {
                        name: name.toLocaleUpperCase()
                    },
                    {
                        name: name.toLocaleLowerCase()
                    },
                ]
            }
        )
        if (todo) {
            return next(createError(409, "todo already exist"))
        }
        const newtodo = await Todo.create({ name });
        res.status(200).json({
            message: "todo created",
            data: newtodo
        })
    } catch (error) {
        return next(createError(500, err.message))
    }
}

// get  /api/todos
exports.getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json({
            message: "todos fatch success",
            data: todos
        })
    } catch (error) {
        return next(createError(500, err.message))
    }
}

// get  /api/todos/:id
exports.getSingleTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)
        if (!todo) {
            return next(createError(404, "todo not found"))
        }
        res.status(200).json({
            message: "todo fatch success",
            data: todo
        })
    } catch (error) {
        return next(createError(500, err.message))
    }
}
// put  /api/todos/:id
exports.updateTodo = async (req, res, next) => {

    if (!req.body.name) {
        return next(createError(403, "todo name is required"))
    }

    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!todo) {
            return next(createError(404, "todo not found"))
        }
        res.status(200).json({
            message: "todo update success",
            data: todo
        })
    } catch (error) {
        return next(createError(500, err.message))
    }
}
// put  /api/todos/:id
exports.deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)
        if (!todo) {
            return next(createError(404, "todo not found"))
        }
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "todo delete success",
            data: todo
        })
    } catch (error) {
        return next(createError(500, err.message))
    }
}