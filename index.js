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
    const Discord = require("discord.js");
    const ShardManager = new Discord.ShardingManager("./ch1llblox.js", {
        token: process.env.token,
        totalShards: Number(process.env.TotalShards) || "auto",
        shardArgs: typeof v8debug === "object" ? ["--inspect"] : undefined,
        execArgv: ["--trace-warnings"]
    })

    // Shard Handlers //
    ShardManager.on("shardCreate", (Shard) => {
        console.log(`SUCCESS - SHARD ${Shard.id + 1}/${ShardManager.totalShards} DEPLOYED`)
    })

    ShardManager.spawn(ShardManager.totalShards || "auto", 8000, -1);
}