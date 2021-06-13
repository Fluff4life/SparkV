const Discord = require(`discord.js`);

exports.run = async (Bot, message, Arguments) => {
  var Ch1llBucks = await Bot.Database.get(`UserData.${message.author.id}.ch1llbucks`)
  var Bank = await Bot.Database.get(`UserData.${message.author.id}.bank`)

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  if (!Bank) {
    Bank = 0
  }

  if (!Arguments) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | You need to tell me how much you want me to withdraw. You can say all if you want all of your Ch1ll Bucks from the bank into your wallet.`)
  }

  if (Arguments[0].toLowerCase() === `all`) {
    if (Bank === 0 || Bank === null) {
      return message.lineReply(`${Bot.Config.Bot.Emojis.error} | You have no Ch1llBucks in your bank!`)
    }

    await Bot.Database.subtract(`UserData.${message.author.id}.bank`, Bank)
    await Bot.Database.add(`UserData.${message.author.id}.ch1llbucks`, Bank)

    message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.success} | You just withdrawed ❄${await Bot.FormatNumber(Bank)} from your bank!`)
  } else {
    if (!Arguments[0]) {
      return message.lineReply(`${Bot.Config.Bot.Emojis.error} | lol you can't withdraw nothing.`)
    }

    if (isNaN(Arguments[0])) {
      return message.lineReply(`${Bot.Config.Bot.Emojis.error} | Bruh please say a number.`)
    }

    if (message.content.includes(`-`)) {
      return message.lineReply(`${Bot.Config.Bot.Emojis.error} | You can't withdraw negitive Ch1llBucks lol.`)
    }

    if (Bank < Arguments[0]) {
      return message.lineReply(`${Bot.Config.Bot.Emojis.error} | You don't have that much Ch1llBucks in your bank!`)
    }

    await Bot.Database.add(`UserData.${message.author.id}.ch1llbucks`, parseInt(Arguments[0]))
    await Bot.Database.subtract(`UserData.${message.author.id}.bank`, parseInt(Arguments[0]))

    message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.success} | Withdrawed ❄${await Bot.FormatNumber(Arguments[0])} from your bank!`)
  }
},


exports.config = {
  name: `Withdraw`,
  description: `Withdraw your Ch1llBucks in your bank into your wallet.`,
  aliases: [`with`],
  usage: ``,
  category: `💰currency💰`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 15
}