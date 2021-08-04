const Topgg = require("@top-gg/sdk");
const { AutoPoster } = require("topgg-autoposter");

module.exports = async bot => {
  /*
    Const api = new Topgg.Api(process.env.dblkey)

    setInterval(async () => {
        const ServerCount = await bot.GetServerCount()

        try {
            api.postStats({
                serverCount: ServerCount
            }) // Other options: `shardId: bot.shard.ids[0], shardCount: bot.options.shardCount`
        } catch(err) {
            console.log("Failed to publish stats to top.gg!", err)
        }
    }, 1800 * 1000)
    */

  const poster = AutoPoster(process.env.dblkey, bot);

  poster.on("error", err => {
    console.log(`TOP.GG POSTING ERROR! => ${err}`);
  });
};
