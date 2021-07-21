exports.run = async (bot, message, args, command, data) => {
  const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(User => User.user.username.toLowerCase() === args.slice(0).join(` `) || User.user.username === args[0])

  if (!args[0]) {
    return message.reply(`${bot.config.bot.Emojis.error} | Please mention someone to view their warnings!`).then(m => m.delete({ timeout: 5000 }))
  }

  if (!User) {
    return message.reply(`${bot.config.bot.Emojis.error} | I cannot find that member!`).then(m => m.delete({ timeout: 5000 }))
  }

  var warnings = bot.Database.get(`ServerData.${message.guild.id}.${User.id}.warnings`)

  if (!warnings){
    warnings = 0
  }

  message.reply(`${User} has **${warnings}** warnings.`)
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