const Discord = require("discord.js");
const noblox = require("noblox.js");

exports.run = async (Bot, msg, Arguments, command) => {
  const IsAdmin = Bot.CheckPerm(msg);

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
              icon_url: process.env.bot_logo
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
              text: "⚠️Shout Command Failled⚠️",
              icon_url: process.env.bot_logo
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
          icon_url: process.env.bot_logo
        },
      }
    });
  }
},

exports.config = {
  enabled: true,
  guild_only: false,
  aliases: ["s"],
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
},

exports.help = {
  name: "Shout",  
  description: "Ch1ll Bot will shout to any group owned by you!",
  usage: "<What to shout>",
  cooldown: 10,
  category: "🔴Roblox🔴"
}
