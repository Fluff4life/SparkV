const Discord = require("discord.js");

exports.run = async (Bot, msg) => {
    let BotMessage = await msg.reply("Pinging!");

    BotMessage.edit({
      embed: {
        title: "Pong!",
        description: [
          "**Responce time: **: `" +
            (BotMessage.createdAt - msg.createdAt) +
            "ms`"
        ].join("\n"),
        color: "#0099ff",
        timestamp: new Date()
      }
    }).catch(() =>
      BotMessage.edit(
        "Unknown error occurred. Do I have permision to Embed Links?"
      )
    );

    return;
  
},
  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["ping", "pong"],
    mod_only: false
  },
  
  exports.help = {
    name: "Ping",
    description: "I will return my responce time!",
    usage: "",
    category: "🧰utility🧰",
    cooldown: 2.5
  }