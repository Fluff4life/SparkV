const Discord = require(`discord.js`);

const afk = require("../../../models/afk")

exports.run = async (Bot, message, Arguments) => {
  console.log("AFK COMMAND WORKING")

  const data = await afk.findOne({
    UserID: message.author.id
  })

  console.log("AFK COMMAND WORKING 2")

  if (!data) {
    console.log("AFK COMMAND NO DATA")

    const reason = args.slice(0).join(" ") || "No reason supplied."


    console.log(reason)
    try {
      const newAfk = new afk({
        UserID: message.author.id,
        Reason: reason
      })

      console.log("New AFK")

      newAfk.save()

      console.log("Saved")

      message.lineReply(`You're now AFK. Reason: ${reason}`)
    } catch (err) {
      console.error(err)

      message.lineReply("Failed to save AFK status.")
    }
  } else {
    try {
      await afk.deleteOne({
        UserID: message.author.id
      })
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
    usage: `<>`,
    category: `😃fun😃`,
    bot_permissions: [`SEND_MESSAGES`, `EMBED_LINKS`, `VIEW_CHANNEL`, `MANAGE_MESSAGES`],
    member_permissions: [],
    enabled: true,
    cooldown: 3
  }