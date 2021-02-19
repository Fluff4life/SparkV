const { ShardingManager } = require("discord.js")
const ShardManager = new ShardingManager("./bot.js", { token: process.env.token })

// Error Handlers //
process.on("uncaughtException", err => {
    const ErrorMessage = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")
  
    console.log(`Uncaught Exception error! ${ErrorMessage}`)
    console.error(err)
  
    process.exit(1)
})

process.on("unhandledRejection", err => {
    console.log(`Unhandled rejection error! ${err}`)
})

// Start Website //

// Shard Handlers //
ShardManager.on("shardCreate", Shard => console.log(`Launched shard: ${Shard.id}.`))
ShardManager.spawn()
