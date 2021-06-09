const QuickMongo = require("QuickMongo")
let Database

const StartDatabase = (mongooseURL) => {
  if (!mongooseURL){
    return console.error("Uh oh! You didn't supply a mongoose URL.")
  }

  Database = new QuickMongo.Database(mongooseURL)

  Database.on("ready", async () => {
    console.log("WEBSITE - WEBSITE DATABASE -> ONLINE")
  })

  Database.on("error", async (err) => {
    Bot.Log("ERROR", "DATABASE ERROR", err)
  })

  return Database
}

module.exports = StartDatabase
module.exports.database = Database