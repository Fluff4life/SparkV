const Discord = require(`discord.js`);

const user = require("../../../database/schemas/user")

exports.run = async (Bot, message, Arguments) => {
  const data = await user.find({
    id: message.author.id,
    afk: {
      enabled: true
    }
  })

  if (!data) {
    const reason = Arguments.slice(0).join(" ") || "No reason supplied."

    try {
      const newAfk = new afk({
        id: message.author.id,
        afk: {
          enabled: true,
          reason: reason
        }
      })

      newAfk.save()

      message.lineReply(`You're now AFK. Reason: ${reason}`)
    } catch (err) {
      console.error(err)

      message.lineReply("Failed to save AFK status.")
    }
  } else {
    try {
      const newAfk = new user({
        id: message.author.id,
        afk: {
          enabled: false,
          reason: "AFK Disabled"
        }
      })

      newAfk.save()
    } catch (err) {
      console.error(err)

      message.lineReply("Failed to delete AFK status.")
    }

    message.lineReply(Bot.Config.Bot.Responses.AFKWelcomeMessage)
  }
},

  exports.config = {
    name: `Afk`,
    description: `This command will set your status to AFK. If anyone pings you, that person will be notified that you are afk with your selected reason.`,
    aliases: [],
    usage: `<optional reason>`,
    category: `😃fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`],
    member_permissions: [],
    enabled: true,
    cooldown: 3
  }