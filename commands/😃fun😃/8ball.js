const Discord = require("discord.js");

const Replies = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes, definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs pointing to yes",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "very doubtful"
]

exports.run = async (Bot, msg, Arguments) => {
  if (!Arguments || !Arguments[0]){
    return msg.channel.send("Please provide a question to ask 8ball.")
  }

  const ReplyText = Math.floor((Math.random() * Replies.length) + 0)

  return msg.channel.send(Replies[ReplyText])
},
  
exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["ball"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES"]
  },
  
  exports.help = {
    name: "8Ball",
    description: "Just a little fun.",
    usage: "[question]",
    category: "😃fun😃",
    cooldown: 5
  }