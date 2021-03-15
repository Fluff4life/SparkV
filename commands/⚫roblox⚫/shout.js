const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments, command) => {
  if (Bot.Config.Debug === true) {
    return
  }

  const noblox = require("noblox.js");

  Arguments = Arguments.join(" ")

  const RobloxGroupID = Bot.Database.get(`ServerData_${message.guild.id}.GroupID`)

  if (RobloxGroupID) {
    noblox.shout((RobloxGroupID), Arguments).then(() => {
      msg.channel.send({
        embed: {
          title: "Successfully Shouted",
          description: "Successfully shouted " + Arguments,
          color: "#0099ff",
          url: `https://www.roblox.com/groups/${RobloxGroupID}/`,

          footer: {
            text: "Shout Command Successful",
            icon_url: Bot.user.AvatarURL
          },
        }
      })

    }).catch((err) => {
      msg.channel.send({
        embed: {
          title: "⚠️Failed to Shout⚠️",
          description: "Failed to shout " + Arguments,
          color: "#0099ff",
          url: `https://www.roblox.com/groups/${RobloxGroupID}/`,

          footer: {
            text: "⚠️Shout Command Failed⚠️",
            icon_url: Bot.user.AvatarURL
          },
        }
      })
    })
  } else {
    return msg.channel.send({
      embed: {
        title: "🚫 Roblox Group ID Error 🚫",
        description: "Roblox Group ID has not been set for this server. You can set it up by doing (prefix)SetGroupID <GroupID>.",
        color: "#0099ff",

        footer: {
          text: "⚠️Shout Command Failed⚠️",
          icon_url: Bot.user.AvatarURL
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