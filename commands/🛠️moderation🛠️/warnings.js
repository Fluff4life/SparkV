exports.run = async (Bot, message, Arguments) => {
  const User = message.mentions.members.first() || message.guild.members.cache.get(Arguments[0]) || message.guild.members.cache.find(User => User.user.username.toLowerCase() === Arguments.slice(0).join(" ") || User.user.username === Arguments[0])

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("❌You don't have permision to do that!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!Arguments[0]) {
    return message.channel.send("❌Please mention someone to view their warnings!").then(m => m.delete({ timeout: 5000 }))
  }

  if (!User) {
    return message.channel.send("❌I cannot find that member!").then(m => m.delete({ timeout: 5000 }))
  }

  var warnings = Bot.Database.get(`ServerData_${message.guild.id}.warnings.${User.id}`).warnings

  if (!warnings){
    warnings = 0
  }

  message.channel.send(`${User} has **${warnings}** warnings.`)
},

  exports.config = {
    enabled: true,
    guild_only: true,
    aliases: ["wings"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "MANAGE_MESSAGES", "ADD_REACTIONS"]
  },

  exports.help = {
    name: "🆕Warnings",
    description: "I'll display a user's warnings.",
    usage: "",
    category: "🛠️moderation🛠️",
    cooldown: 2.5
  }