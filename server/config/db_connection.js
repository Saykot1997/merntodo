const mongoose = require("mongoose")

const db = async () => {
    mongoose.set('strictQuery', false)
    try {
        await mongoose.connect(
            process.env.DATABASE_CONNECTION_STRING,
            { useNewUrlParser: true, useUnifiedTopology: true, },
            () => {
                console.log("databes has been conected");
            }
        );
    } catch (error) {
        console.log(error.message)
        throw new Error(error)
    }
}

module.exports = db 