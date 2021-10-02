const Discord = require("discord.js");
const dbots = require("dbots");

module.exports = {
  once: true,
  async execute(bot) {
    // Start Loading
    bot.user.setPresence({
      status: "dnd",
      activities: [{ name: "Loading SparkV (100%)" }],
    });

    // Check Guild's Blacklist status
    setInterval(async () => {
      for (const guild of bot.guilds.cache) {
        if (process.env.USERBLACKLIST.includes(guild.ownerId)) {
          try {
            await guild.leave();

            console.log(`Left guild ${guild.name} because it's on the UserBlacklist.`);
          } catch {
            console.log(`Failed to leave Blacklisted User's Guild! GuildName: ${guild.name} GuildID: ${id}`);
          }
        }

        if (process.env.GUILDBLACKLIST.includes(guild.id)) {
          try {
            await guild.leave();

            console.log(`Left guild ${guild.name} because it's on the GuildBlacklist.`);
          } catch {
            console.log(`Failed to leave Blacklisted guild! GuildName: ${guild.name} GuildID: ${id}`);
          }
        }
      }
    }, 60 * 1000);

    // Bot Lists //
    if (bot.config.debug.enabled === false) {
      const poster = new dbots.Poster({
        client: bot,
        apiKeys: {
          topgg: process.env.DBLKEY,
          // voidbots: process.env.VBLKEY,
          // discordlabs: process.env.DLBLKEY
        },
        clientLibrary: "discord.js",
        serverCount: async () => await bot.functions.GetServerCount(),
        userCount: async () => await bot.functions.GetUserCount(),
      });

      // Start Posting to Bot Lists
      poster.post();
      poster.startInterval();

      // Auto Post Bot Stats
      bot.StatClient.post();
      bot.StatClient.autopost();
    }

    console.log("-------- SparkV --------");
    bot.user.setPresence({
      status: "online",
      activities: [
        {
          name: `${bot.config.prefix}Help | ${bot.functions.formatNumber(
            await bot.functions.GetServerCount(),
          )} servers`,
          type: "PLAYING",
        },
      ],
    });

    bot.logger(
      `Logged into Discord as ${bot.user.tag} (${bot.user.id})\n🏢 | Servers: ${bot.functions.formatNumber(
        await bot.functions.GetServerCount(),
      )}\n👥 | Users: ${bot.functions.formatNumber(await bot.functions.GetUserCount())}`,
      "bot",
    );
  },
};
