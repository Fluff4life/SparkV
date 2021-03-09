const { config } = require("dotenv")

// Start Dotenv //--
config({
    path: __dirname + "/.env"
})

if (process.env.TestMode === "true") {
    console.log("WARNING - SHARDMANAGER => Failed to activate Shard Manager. Calling bot file without sharding features!");

    if (process.env.BotEnabled === "true") {
        require("./ch1llblox");
    }

    if (process.env.WebsiteEnabled === "true") {
        require("./ch1llwebsite")
    }
} else {
    const { ShardingManager } = require("discord.js");
    const ShardManager = new ShardingManager("./ch1llblox.js", {
        totalShards: 1,
        shardList: "auto",
        mode: "process",
        respawn: true,

        token: process.env.token,
    });

    // Shard Handlers //
    ShardManager.on("shardCreate", (Shard) => console.log(`SUCCESS - SHARD LAUNCH => Successfully launched shard ${Shard.id}.`))
    ShardManager.spawn();
}