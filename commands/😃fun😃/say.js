const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  Arguments = Arguments.join(" ")

  msg
    .delete()
    .catch(_ => {});
  
  msg.channel.send(Arguments + "\n*-" + msg.author.username + "*")
},
  
  exports.config = {
    name: "Say",
    description: "I will say whatever you want me to say.",
    aliases: ["talk"],
    usage: "<message>",
    category: "😃fun😃",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES"],
    member_permissions: [],
    enabled: true,
    cooldown: 5
  }