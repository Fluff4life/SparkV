const mongoose = require("mongoose")

module.exports = async (Bot) => {
    mongoose.connect(process.env.mongooseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        mongoose.set("useFindAndModify", false)

        Bot.Log("SUCCESS", "DATABASE SUCCESS", `Successfully connected to database!`)
    }).catch((err) => {
        Bot.Log("ERROR", "DATABASE FAILURE", `Failed to connect to database. Error: ${err}`)
        process.exit(0)
    })
}