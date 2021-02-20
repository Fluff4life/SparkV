const { ShardingManager } = require("discord.js")

const { token } = process.env
const ShardManager = new ShardingManager("./bot.js", { token: token })

// Shard Handlers //
ShardManager.on("shardCreate", Shard => console.log(`Launched shard: ${Shard.id}.`))
ShardManager.spawn()