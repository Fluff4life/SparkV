const mongoose = require("mongoose")

mongoose.connect(process.env.mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    mongoose.set("useFindAndModify", false)

    console.log("Successfullly connected to database.")
}).catch((err) => {
    console.error(`Failed to connect to database. Error: ${err}`)
})