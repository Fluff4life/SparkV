const { ShardingManager } = require("discord.js")

try {
    const ShardManager = new ShardingManager("./bot.js", {
        token: process.env.token
    })

    // Shard Handlers //
    ShardManager.on("shardCreate", Shard => console.log(`Launched shard: ${Shard.id}.`))
    ShardManager.spawn()
} catch(err){
    console.log("WARNING => Failed to activate Shard Manager. Calling bot file without sharding fetures!")

    return require("./bot")
}