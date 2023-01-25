const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db_connection");
const env = require("dotenv");
const TodoRouter = require("./routers/TodoRouter")
const createError = require('http-errors');
const { error_handler } = require("./error/error_handler");


// env config
env.config();
// corse config
app.use(cors());
// json body parser
app.use(express.json());
// connect to mongodb
db()

app.get("/api/", (req, res) => {
    res.send("wellcome to todo api")
})

app.use("/api/todos", TodoRouter);

app.use((req, res, next) => {
    next(createError(404, "route not found"));
})

app.use(error_handler);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
