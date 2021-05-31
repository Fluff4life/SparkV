exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.members.first() || message.guild.members.cache.get(Arguments[0]) || message.guild.members.cache.find(User => User.user.username.toLowerCase() === Arguments.slice(0).join(` `) || User.user.username === Arguments[0])

  if (!Arguments[0]) {
    return message.lineReply(`${Bot.Config.Emojis.error} | Please mention someone to view their warnings!`).then(m => m.delete({ timeout: 5000 }))
  }

  if (!User) {
    return message.lineReply(`${Bot.Config.Emojis.error} | I cannot find that member!`).then(m => m.delete({ timeout: 5000 }))
  }

  var warnings = Bot.Database.get(`ServerData.${message.guild.id}.${User.id}.warnings`)

  if (!warnings){
    warnings = 0
  }

  message.lineReplyNoMention(`${User} has **${warnings}** warnings.`)
},

  exports.config = {
    name: `Warnings`,
    description: `I'll display a user's warnings.`,
    aliases: [],
    usage: `<user>`,
    category: `🛠️moderation🛠️`,
    bot_permissions: [`SEND_MESSAGES`, `READ_MESSAGE_HISTORY`, `EMBED_LINKS`, `VIEW_CHANNEL`, `CONNECT`, `SPEAK`],
    member_permissions: [`MANAGE_MESSAGES`],
    enabled: true,
    cooldown: 2.5
  }