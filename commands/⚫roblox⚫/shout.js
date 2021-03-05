const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments, command) => {
  if (process.env.TestMode){
    return
  }
  
  const noblox = require("noblox.js");

  Arguments = Arguments.join(" ")
  
  if (IsAdmin === true){
    noblox.shout(process.env.RobloxGroup, Arguments)
      .then(() => {
        msg.channel.send({
          embed: {
            title: "Successfully Shouted",
            description: "Successfully shouted " + Arguments,
            color: "#0099ff",
            url: "https://www.roblox.com/groups/7813201/Ch1ll-Studios",
          
            footer: {
              text: "Shout Command Successful",
              icon_url: process.env.AvatarURL
            },
          }
        }) 

    }).catch((err) => {
        msg.channel.send({
          embed: {
            title: "⚠️Failed to Shout⚠️",
            description: "Failed to shout " + Arguments,
            color: "#0099ff",
            url: "https://www.roblox.com/groups/7813201/Ch1ll-Studios",
          
            footer: {
              text: "⚠️Shout Command Failed⚠️",
              icon_url: process.env.AvatarURL
            },
          }
        })
      })
    } else {
    return msg.channel.send({
      embed: {
        title: "🚫 Invalid Permisions 🚫",
        description: "You don't have permision to use this command. This command is disabled due to too many problems.",
        color: "#0099ff",
          
        footer: {
          text: "⚠️Shout Command Failed⚠️",
          icon_url: process.env.AvatarURL
        },
      }
    });
  }
},

exports.config = {
  name: "Shout",
  description: "Ch1llBlox will shout to any group owned by you!",
  aliases: ["prequelmeme"],
  usage: "<What to shout>",
  category: "⚫roblox⚫",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 10
}