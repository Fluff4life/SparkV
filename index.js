const { ShardingManager } = require("discord.js")
const ShardManager = new ShardingManager("./bot.js", { token: process.env.token })

ShardManager.on("shardCreate", Shard => console.log(`Launched shard: ${Shard.id}.`))
ShardManager.spawn()