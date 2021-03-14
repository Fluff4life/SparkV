const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first()

  if (!Arguments){
    return message.channel.send("You need to mention someone to pay and how much.")
  }

  if (!User){
    return message.channel.send("I cannot find the user.")
  }

  if (User.id === message.author.id){
    return message.channel.send("You can't give money to yourself lol.")
  }

  if (isNaN(Arguments[1])){
    return message.channel.send("That's not a number!")
  }

  if (message.content.includes("-")){
    return message.channel.send("You cannot give a user negitive Ch1llBucks lol.")
  }

  var Ch1llBucks = await Bot.Database.get(`UserData_${message.author.id}.ch1llbucks`)
  var UserCh1llBucks = await Bot.Database.get(`UserData_${User.id}.ch1llbucks`)

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  if (!UserCh1llBucks){
    UserCh1llBucks = 0
  }

  if (Ch1llBucks < Arguments[1]){
    return message.channel.send("You don't have that much money!")
  }

  await Bot.Database.add(`UserData_${User.id}.ch1llbucks`, parseInt(Arguments[1]))
  await Bot.Database.subtract(`UserData_${message.author.id}.ch1llbucks`, parseInt(Arguments[1]))

  message.channel.send(`You gave ${User} ❄${await Bot.FormatNumber(Arguments[1])} Ch1llBucks!`)
},

exports.config = {
  name: "Pay",
  description: "Give someone some Ch1llBucks!",
  aliases: ["gift"],
  usage: "<user>",
  category: "💰currency💰",
  bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 15
}