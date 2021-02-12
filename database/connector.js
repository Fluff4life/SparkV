const mongoose = require("mongoose")

async function ConnectDatastore(){
    mongoose.connect(`mongodb+srv://${process.env.mongoose_name}:${process.env.mongoose_password}@${process.env.mongoose_name_lowered}.egdb0.mongodb.net/Data`, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.set("useFindAndModify", false)
}

ConnectDatastore().then(() => {
    console.log("Successfullly connected to database.")
}).catch((err) => {
    console.error(`Failed to connect to database. Error: ${err}`)
})