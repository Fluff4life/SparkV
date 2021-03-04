const Discord = require("discord.js");

exports.run = async (Bot, msg, Arguments) => {
  if (msg.deletable){
    msg.delete()
  }
  
  if (!msg.member.hasPermission("MANAGE_MESSAGES")){
    return msg.channel.send("You don't have permision to run this command!").then(m => m.delete({ timeout: 5000 }))
  }

  if (isNaN(Arguments[0]) || parseInt(Arguments[0]) <= 0){
    return msg.channel.send("That's not a nunber.").then(m => m.delete({ timeout: 5000 }))
  }
  
  let DeleteAmount
  
  if (parseInt(Arguments[0]) > 100){
    DeleteAmount = 100
  } else {
    DeleteAmount = parseInt(Arguments[0])
  }

  msg.channel
    .bulkDelete(DeleteAmount, true)
    .then(() => {
      msg.channel.send(`Successfully deleted ${DeleteAmount} messages.`).then(m => m.delete({ timeout: 5000 }))
    })
    .catch(() => msg.channel.send(`Uh oh... I couldn't delete these messages!`)).then(m => m.delete({ timeout: 5000 }))
},

  exports.config = {
    name: "Clear",
    description: "I can delete messages for you so you don't have to spend a while deleting them :)",
    aliases: ["purge", "clr"],
    usage: "<number of messages to delete>",
    category: "🛠️moderation🛠️",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES"],
    member_permissions: ["KICK_MEMBERS"],
    enabled: true,
    cooldown: 5
  }