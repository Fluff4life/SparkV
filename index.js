const { ShardingManager } = require("discord.js");
const { config } = require("dotenv")

// Start Dotenv //--
config({
    path: __dirname + "/.env"
})

if (process.env.TestMode) {
    console.log("WARNING - SHARDMANAGER => Failed to activate Shard Manager. Calling bot file without sharding features!");

    require("./ch1llblox");
    require("./ch1llwebsite")
} else {
    const ShardManager = new ShardingManager("./ch1llblox", {
        totalShards: "auto",
        shardList: "auto",
        mode: "process",
        respawn: true,

        token: process.env.token,
    });

    // Shard Handlers //
    ShardManager.on("shardCreate", (Shard) => console.log(`SUCCESS - SHARD LAUNCH => Successfully launched shard ${Shard.id}.`))
    ShardManager.spawn();
}