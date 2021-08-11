const Discord = require("discord.js");

exports.run = async (bot, message, args, command, data) => {
  if (bot.config.Debug.Enabled === true) {
    return;
  }

  const noblox = require("noblox.js");

  args = args.join(" ");

  const RobloxGroupID = 0;

  if (RobloxGroupID) {
    noblox
      .shout(RobloxGroupID, args)
      .then(() => {
        message.reply({
          embed: {
            title: `${bot.config.bot.Emojis.success} | Successfully Shouted`,
            description: `Successfully shouted ${args}`,
            color: "#0099ff",
            url: `https://www.roblox.com/groups/${RobloxGroupID}/`,

            footer: {
              text: "Shout Command Successful",
              icon_url: bot.user.displayAvatarURL(),
            },
          },
        });
      })
      .catch(err => {
        message.reply({
          embed: {
            title: "⚠️Failed to Shout⚠️",
            description: `Failed to shout ${args}`,
            color: "#0099ff",
            url: `https://www.roblox.com/groups/${RobloxGroupID}/`,

            footer: {
              text: "⚠️Shout Command Failed⚠️",
              icon_url: bot.user.displayAvatarURL()
            },
          },
        });
      });
  } else {
    return message.reply({
      embed: {
        title: "🚫 Roblox Group ID Error 🚫",
        description: "Roblox Group ID has not been set for this server.",
        color: "#0099ff",

        footer: {
          text: "⚠️Shout Command Failed⚠️",
          icon_url: bot.user.displayAvatarURL()
        },
      },
    });
  }
},

  exports.config = {
    name: "Shout",
    description: "Ch1llBlox will shout to any group owned by you!",
    aliases: [],
    usage: "<What to shout>",
    category: "⚫roblox⚫",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: ["ADMINISTRATOR"],
    enabled: true,
    cooldown: 10
};
