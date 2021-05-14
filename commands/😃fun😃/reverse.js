const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  if (!Arguments){
    return message.lineReply("Bruh I cannot reverse no text lol.")
  }

  Arguments = Arguments.join(" ").split("").reverse().join("")

  message.lineReply(Arguments)


        message.channel.send(`\u180E${converted}`);




        
},
  
  exports.config = {
    name: "Reverse",
    description: "I will reverse any text you give me lol.",
    aliases: ["talk"],
    usage: "<message>",
    category: "😃fun😃",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES"],
    member_permissions: [],
    enabled: true,
    cooldown: 5
  }