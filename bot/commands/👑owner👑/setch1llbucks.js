const Discord = require(`discord.js`);

exports.run = async (Bot, message, Arguments) => {
  if (message.author.id !== process.env.OwnerID) {
    return message.lineReply(`${Bot.Config.Bot.Emojis.error} | Access denied.`)
  }

  const User = Bot.GetMember(message, Arguments)
  var Ch1llBucks = await Bot.UserShema.find({
    id: User.id
  })

  if (!Ch1llBucks){
    Ch1llBucks = 0
  }

  var Ch1llBucks = await Bot.UserShema.updateOne({
    id: User.id
  })

  await Bot.Database.set(`${User.id}.ch1llbucks`, parseInt(Arguments[1]))

  message.lineReplyNoMention(`${Bot.Config.Bot.Emojis.success} | Success!`)
},

exports.config = {
  name: `SetCh1llBucks`,
  description: `Set someone's Ch1llBucks!`,
  aliases: [],
  usage: `<user> <ammount>`,
  category: `👑owner👑`,
  bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`],
  member_permissions: [],
  enabled: true,
  cooldown: 15
}