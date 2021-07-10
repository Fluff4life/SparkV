const Discord = require(`discord.js`);

const afk = require("../../../models/afk")

exports.run = async (Bot, message, Arguments) => {
  if (message.mentions.roles.first()) {
    return message.channel.send("I cannot ping roles.")
  }

  const data = await afk.findOne({
    UserID: message.author.id
  })

  if (!data) {
    const reason = args.slice(0).join(" ") || "No reason supplied."

    try {
      const newAfk = new afk({
        UserID: message.author.id,
        Reason: reason
      })

      newAfk.save()

      message.lineReply(`You're now AFK. Reason: ${reason}`)
    } catch (err) {
      message.lineReply("Failed to save AFK status.")
    }
  } else {
    await afk.deleteOne({
      UserID: message.author.id
    })

    message.lineReply(Bot.Config.Bot.Responses.AFKWelcomeMessage)
  }
},

  exports.config = {
    name: `Afk`,
    description: `This command will set your status to AFK. If anyone pings you, that person will be notified that you are afk with your selected reason.`,
    aliases: [],
    usage: `<>`,
    category: `😃fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`],
    member_permissions: [],
    enabled: true,
    cooldown: 3
  }