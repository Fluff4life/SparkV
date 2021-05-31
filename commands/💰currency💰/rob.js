const Discord = require(`discord.js`);

const results = [
  `WIN`,
  `LOST`
]

exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.users.first() || Bot.users.cache.get(Arguments[0])

  if (!User) {
    return message.lineReply(`${Bot.Config.Emojis.error} | Please say a person to rob.`)
  }

  var RobberCh1llBucks = await Bot.Database.get(`UserData.${message.author.id}.ch1llbucks`)
  var UserCh1llBucks = await Bot.Database.get(`UserData.${User.id}.ch1llbucks`)

  if (!RobberCh1llBucks) {
    RobberCh1llBucks = 0
  }

  if (RobberCh1llBucks < 500) {
    return message.lineReply(`${Bot.Config.Emojis.error} | Bruh you cannot rob someone unless you have over ❄500 Ch1llBucks.`)
  }

  if (UserCh1llBucks <= 0 || UserCh1llBucks === null) {
    return message.lineReply(`${Bot.Config.Emojis.error} | Bruh they have no Ch1llBucks leave them alone you noob!`)
  }

  if (message.author.id === User.id) {
    return message.lineReply(`${Bot.Config.Emojis.error} | Why do you want to rob yourself lol.`)
  }

  if (User.id === process.env.OwnerID) {
    return message.lineReply(`${Bot.Config.Emojis.error} | This user is protected! You can buy a protection shield from being robbed in the shop.`)
  }

  if (UserCh1llBucks < 0) {
    return message.lineReply(`${Bot.Config.Emojis.error} | This user is in **DEBT**! LOL!!`)
  }

  const Result = results[Math.floor(Math.random() * results.length)]

  if (Result === `WIN`) {
    const Ammount = Math.floor(Math.random() * UserCh1llBucks)

    await Bot.Database.add(`UserData.${message.author.id}.ch1llbucks`, Ammount)
    await Bot.Database.subtract(`UserData.${User.id}.ch1llbucks`, Ammount)

    message.lineReplyNoMention(`${Bot.Config.Emojis.success} | You robbed ${User} and recieved ${await Bot.FormatNumber(Ammount)} Ch1llBucks!`)
  } else {

    await Bot.Database.subtract(`UserData.${message.author.id}.ch1llbucks`, 250)
    await Bot.Database.add(`UserData.${User.id}.ch1llbucks`, 250)

    message.lineReplyNoMention(`${Bot.Config.Emojis.error} | LOL you got caught! You payed ❄250 to ${User}.`)
  }
},

  exports.config = {
    name: `Rob`,
    description: `why u bully me?`,
    aliases: [`crime`],
    usage: `<user>`,
    category: `💰currency💰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 15
  }