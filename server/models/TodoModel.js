const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is require"],
        },
        done: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Todo", Todo);