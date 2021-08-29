const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./bot.js", {
  token: process.env.TOKEN,
  totalShards: Config.bot.Sharding.TotalShards || "auto",
  shardArgs: [...process.argv, ...["--sharding"]],
  execArgv: [...process.argv, ...[Config.Debug.Enabled ? null : "--trace-warnings"]],
});

// Shard Handlers //
manager.on("shardCreate", Shard => {
  console.log(require("chalk").green(`DEPLOYING - SHARD ${Shard.id}/${manager.totalShards} DEPLOYING`));

  Shard.on("ready", () => {
    console.log(
      require("chalk").blue(`DEPLOY SUCCESS - SHARD ${Shard.id}/${manager.totalShards} DEPLOYED SUCCESSFULLY`),
    );
  });

  Shard.on("disconnect", event => {
    Logger("Fatal", err, {
      shard: Shard.id,
    });

    console.log(
      require("chalk").red(`SHARD DISCONNECTED - SHARD ${Shard.id}/${manager.totalShards} DISCONNECTED. ${event}`),
    );
  });

  Shard.on("reconnecting", () => {
    console.log(require("chalk").red(`SHARD RECONNECTING - SHARD ${Shard.id}/${manager.totalShards} RECONNECTING`));
  });

  Shard.on("death", event => {
    Logger("Fatal", err, {
      shard: Shard.id,
    });

    console.log(
      require("chalk").red(
        `SHARD CLOSED - SHARD ${Shard.id}/${manager.totalShards} UNEXPECTEDLY CLOSED!\nPID: ${event.pid}\nExit Code: ${event.exitCode}.`,
      ),
    );

    if (!event.exitCode) {
      console.warn(`WARNING: SHARD ${Shard.id}/${manager.totalShards} EXITED DUE TO LACK OF AVAILABLE MEMORY.`);
    }
  });
});

manager.spawn();
