const Discord = require("discord.js");
const dbots = require("dbots");

module.exports = {
  once: true,
  async execute(bot) {
    // Bot Lists //
    const poster = new dbots.Poster({
      clientID: bot.user.id,
      apiKeys: {
        topgg: process.env.DBLKEY
      },
      clientLibrary: "discord.js",
      serverCount: async () => await bot.functions.GetServerCount(),
      userCount: async () => await bot.functions.GetUserCount(),
    });

    poster.startInterval();

    const Activities = [
      {
        text: `${bot.config.bot.prefix}Help | ^Invite`,
        type: "WATCHING",
        status: "online",
      },

      {
        text: `${bot.functions.FormatNumber(await bot.functions.GetServerCount())} servers! | ^Invite`,
        type: "WATCHING",
        status: "online",
      },

      {
        text: `${bot.functions.FormatNumber(await bot.functions.GetUserCount())} users | ^Invite!`,
        type: "WATCHING",
        status: "online",
      },
    ];

    setInterval(async () => {
      const Activity = Activities[Math.floor(Math.random() * Activities.length)];

      bot.user.setPresence({
        status: Activity.status,

        activity: {
          name: Activity.text,
          type: Activity.type,
          url: Activity.url,
        },
      });

      for (const guild of bot.guilds.cache) {
        if (process.env.USERBLACKLIST.includes(guild.ownerID)) {
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

    bot.user.setPresence({
      status: "dnd",

      activity: {
        name: "Loading SparkV (100%)",
        type: "CUSTOM_STATUS",
      },
    });

    if (bot.StatClient) {
      bot.StatClient.autopost();
    }

    console.log("-------- SparkV --------");
    bot.logger(
      `Logged into Discord as ${bot.user.tag} (${bot.user.id})\n🏢 | Servers: ${bot.functions.FormatNumber(
        await bot.functions.GetServerCount(),
      )}\n👥 | Users: ${bot.functions.FormatNumber(await bot.functions.GetUserCount())}`,
      "bot",
    );
  },
};
