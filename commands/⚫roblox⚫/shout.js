const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments, command) => {
  if (Bot.Config.Debug.Enabled === true) {
    return
  }

  const noblox = require("noblox.js");

  Arguments = Arguments.join(" ")

  const RobloxGroupID = await Bot.dashboard.getVal("GroupID")

  if (RobloxGroupID) {
    noblox.shout((RobloxGroupID), Arguments).then(() => {
      message.lineReplyNoMention({
        embed: {
          title: `${Bot.Config.Bot.Emojis.success} | Successfully Shouted`,
          description: "Successfully shouted " + Arguments,
          color: "#0099ff",
          url: `https://www.roblox.com/groups/${RobloxGroupID}/`,

          footer: {
            text: "Shout Command Successful",
            icon_url: Bot.user.displayAvatarURL()
          },
        }
      })

    }).catch((err) => {
      message.lineReplyNoMention({
        embed: {
          title: "⚠️Failed to Shout⚠️",
          description: "Failed to shout " + Arguments,
          color: "#0099ff",
          url: `https://www.roblox.com/groups/${RobloxGroupID}/`,

          footer: {
            text: "⚠️Shout Command Failed⚠️",
            icon_url: Bot.user.displayAvatarURL()
          },
        }
      })
    })
  } else {
    return message.lineReply({
      embed: {
        title: "🚫 Roblox Group ID Error 🚫",
        description: "Roblox Group ID has not been set for this server.",
        color: "#0099ff",

        footer: {
          text: "⚠️Shout Command Failed⚠️",
          icon_url: Bot.user.displayAvatarURL()
        },
      }
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
  }