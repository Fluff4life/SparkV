const Discord = require("discord.js");

const Emojis = ["✂", "📄", "🗻"]

exports.run = async (Bot, message, Arguments) => {
  function GetResult(UserChosen, BotChosen){
    if ((UserChosen == "✂" && BotChosen == "📄") || (UserChosen == "📄" && BotChosen == "🗻") || (UserChosen == "🗻" && BotChosen == "✂")){
      return "🎉You won!"
    } else if (BotChosen === UserChosen){
      return "It's a tie!"
    } else {
      return `🎉${Bot.user.username} won!`
    }
  }

  const embed = new Discord.MessageEmbed()
    .setTitle("Rock Paper Scissors")
    .setDescription("React to one of these emojis to begin!")
    .setFooter(Bot.user.username, Bot.user.AvatarURL)
    .setColor(process.env.EmbedColor)

  const Message = await message.channel.send(embed)
  const Reacted = await Bot.PromptMessage(Message, message.author, Emojis, 60)
  const BotChoice = Emojis[Math.floor(Math.random() * Emojis.length)]
  const Result = await GetResult(Reacted, BotChoice)

  embed
  .setTitle("Game Over - Rock Paper Scissors")
  .setDescription(`${Result}`)
  .setFooter(`${Reacted} V.S. ${BotChoice}`)

  Message.edit(embed)
},

exports.config = {
  name: "RockPaperScissors",
  description: "Play a game of Rock Paper Scissors with me!",
  aliases: ["rps"],
  usage: "",
  category: "🎲games🎲",
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL"],
  member_permissions: [],
  enabled: true,
  cooldown: 60
}