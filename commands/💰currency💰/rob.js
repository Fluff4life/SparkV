const Discord = require("discord.js");

const results = [
  "WIN",
  "LOST"
]

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0])

  if (User.id === process.env.OwnerID){
    return message.channel.send("This user is protected! You can buy a protection shield from being robbed in the shop.")
  }

  var Ch1llBucks = await Bot.Database.get(`UserData_${message.author.id}.ch1llbucks`)
  var UserCh1llBucks = await Bot.Database.get(`UserData_${User.id}.ch1llbucks`)
  var Multiplier = await Bot.Database.get(`UserData_${User.id}.multiplier`)

  if (!UserCh1llBucks) {
    return message.channel.send("Bruh he has no money leave them alone you noob!")
  }

  if (Ch1llBucks < 250) {
    return message.channel.send("Bruh you cannot rob someone unless you have over ❄250 Ch1llBucks.")
  }

  if (Ch1llBucks < 0){
    return message.channel.send("You can't rob someone in debt lol.")
  }

  const Result = results[Math.floor(Math.random() * results.length)]

  if (!Ch1llBucks) {
    Ch1llBucks = 0
  }

  if (!Multiplier) {
    Multiplier = 1
  }

  if (Result === "WIN") {
    const RandomAmmount = Math.floor(Math.random() * UserCh1llBucks)
    const Ammount = RandomAmmount * Multiplier

    await Bot.Database.set(`UserData_${message.author.id}.ch1llbucks`, Ch1llBucks + Ammount)
    await Bot.Database.set(`UserData_${User.id}.ch1llbucks`, UserCh1llBucks - Ammount)

    message.channel.send(`You robbed ${User} and recieved ${await Bot.FormatNumber(Ammount)} Ch1llBucks!`)
  } else {

    await Bot.Database.set(`UserData_${message.author.id}.ch1llbucks`, Ch1llBucks - 250)
    await Bot.Database.set(`UserData_${User.id}.ch1llbucks`, UserCh1llBucks + 250)

    message.channel.send(`LOL you got caught! You payed ❄250 to ${User}.`)
  }
},

  exports.config = {
    name: "Rob",
    description: "why u bully me?",
    aliases: ["crime"],
    usage: "<user>",
    category: "💰currency💰",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 45
  }