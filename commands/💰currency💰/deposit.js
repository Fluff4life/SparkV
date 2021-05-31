const Discord = require(`discord.js`);

exports.run = async (Bot, message, Arguments) => {
  var Ch1llBucks = await Bot.Database.get(`UserData.${message.author.id}.ch1llbucks`)
  var Bank = await Bot.Database.get(`UserData.${message.author.id}.bank`)
  var BankMax = await Bot.Database.get(`UserData.${message.author.id}.bankmax`)

  if (!Ch1llBucks) {
    Ch1llBucks = 0
  }

  if (!Bank){
    Bank = 0
  }

  if (!BankMax) {
    BankMax = 4500
  }

  if (!Arguments) {
    return message.lineReply(`${Bot.Config.Emojis.error} | You need to tell me how much you want me to deposit. You can say all if you want all of your Ch1ll Bucks in your bank.`)
  }

  if (Arguments[0].toLowerCase() === `all`) {
    if (Ch1llBucks === 0 || Ch1llBucks === null) {
      return message.lineReply(`${Bot.Config.Emojis.error} | You have no Ch1llBucks!`)
    }

    if (Bank === BankMax){
      return message.lineReply(`${Bot.Config.Emojis.error} | Your bank is full!`)
    }

    if (Ch1llBucks > BankMax) {
      await Bot.Database.add(`UserData.${message.author.id}.bank`, BankMax)
      await Bot.Database.subtract(`UserData.${message.author.id}.ch1llbucks`, BankMax)

      message.lineReplyNoMention(`${Bot.Config.Emojis.success} | You just deposited ❄${await Bot.FormatNumber(BankMax)} into your bank!`)
    } else {
      await Bot.Database.add(`UserData.${message.author.id}.bank`, Ch1llBucks)
      await Bot.Database.subtract(`UserData.${message.author.id}.ch1llbucks`, Ch1llBucks)

      message.lineReplyNoMention(`${Bot.Config.Emojis.success} | You just deposited ❄${await Bot.FormatNumber(Ch1llBucks)} into your bank!`)
    }
  } else {
    if (!Arguments[0]) {
      return message.lineReply(`${Bot.Config.Emojis.error} | lol you can't deposit nothing.`)
    }

    if (isNaN(Arguments[0])) {
      return message.lineReply(`${Bot.Config.Emojis.error} | Bruh please say a number.`)
    }

    if (message.content.includes(`-`)) {
      return message.lineReply(`${Bot.Config.Emojis.error} | You can't deposit negitive Ch1llBucks lol.`)
    }

    if (Ch1llBucks < Arguments[0]) {
      return message.lineReply(`${Bot.Config.Emojis.error} | You don't have that much Ch1llBucks.`)
    }

    if (BankMax < Arguments[0]) {
      return message.lineReply(`${Bot.Config.Emojis.error} | You don't have enough bank space to hold ❄${Arguments[0]}!`)
    }

    await Bot.Database.subtract(`UserData.${message.author.id}.ch1llbucks`, parseInt(Arguments[0]))
    await Bot.Database.add(`UserData.${message.author.id}.bank`, parseInt(Arguments[0]))

    message.lineReplyNoMention(`${Bot.Config.Emojis.success} | Deposited ❄${await Bot.FormatNumber(Arguments[0])} into bank!`)
  }
},


  exports.config = {
    name: `Deposit`,
    description: `Deposit your Ch1llBucks into your bank.`,
    aliases: [`dep`],
    usage: `<all or ammount>`,
    category: `💰currency💰`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
    member_permissions: [],
    enabled: true,
    cooldown: 5
  }