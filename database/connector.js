const mongoose = require("mongoose")
const { mongoose_name, mongoose_name_lowered, mongoose_password} = process.env

async function ConnectDatastore(name, name_lowered, password){
    mongoose.connect(`mongodb+srv://${name}:${password}@${name_lowered}.egdb0.mongodb.net/Data`, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.set("useFindAndModify", false)
}

ConnectDatastore(mongoose_name, mongoose_name_lowered, mongoose_password).then(() => {
    console.log("Successfullly connected to database.")
}).catch((err) => {
    console.error(`Failed to connect to database. Error: ${err}`)
})