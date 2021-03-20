const Discord = require("discord.js");

const Emojis = ["1️⃣", "2️⃣", "3️⃣"]

exports.run = async (Bot, message, Arguments) => {
  async function GetResult(BotChosen, UserChosen) {
    if (UserChosen == BotChosen) {
      return "🎉You found the ball!"
    } else {
      return `❌You failed to find the ball.`
    }
  }

  const embed = new Discord.MessageEmbed()
    .setTitle("Cups")
    .setDescription("React to one of these emojis to begin!")
    .setFooter(Bot.user.username, Bot.user.displayAvatarURL())
    .setColor(Bot.Config.Embed.EmbedColor)

  const Message = await message.channel.send(embed)
  const Reacted = await Bot.PromptMessage(Message, message.author, Emojis, 60)
  const BotChoice = Math.floor(Math.random() * Emojis.length) + 1
  const Result = await GetResult(Reacted, BotChoice)

  embed
    .setTitle("Game Over! - cups")
    .setDescription(`${Result}`)
    .setFooter(`The ball was under cup #${BotChoice}`)

  Message.edit(embed)
},

  exports.config = {
    name: "Cups",
    description: "Play a game of cups with me.",
    aliases: ["ballcups"],
    usage: "",
    category: "🎲games🎲",
    bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS"],
    member_permissions: [],
    enabled: true,
    cooldown: 60
  }