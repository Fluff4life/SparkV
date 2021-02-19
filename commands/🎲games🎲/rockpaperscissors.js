const Discord = require("discord.js");

const Emojis = ["🗻", "📄", "✂"]

exports.run = async (Bot, message, Arguments) => {
  function GetResult(BotChosen, UserChosen){
    if ((BotChosen === "🗻" && UserChosen === "✂") || (BotChosen === "📄" && UserChosen === "🗻") || (BotChoice === "✂" && UserChosen === "📄")){
      return "🎉You won!"
    } else if (BotChosen === UserChosen){
      return "It's a tie!"
    } else {
      return `🎉${process.env.name} won!`
    }
  }

  const embed = new Discord.MessageEmbed()
    .setTitle("Rock Paper Scissors")
    .setDescription("React to one of these emojis to begin!")
    .setFooter(process.env.name, Bot.user.displayAvatarURL)
    .setColor("#0099ff")

  const Message = await message.channel.send(embed)
  const Reacted = await Bot.PromptMessage(Message, message.author, Emojis, 30)
  const BotChoice = Emojis[Math.floor(Math.random() * Emojis.length)]
  const Result = await GetResult(Reacted, BotChoice)

  embed
  .setTitle("Game Over - Rock Paper Scissors")
  .setDescription(`${Result}`)
  .setFooter(`${Reacted} V.S. ${BotChoice}`)

  Message.edit(embed)
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["rps"],
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL"]
},
    
exports.help = {
  name: "RockPaperScissors",
  description: "Play a game of Rock Paper Scissors with me!",
  usage: "",
  category: "🎲games🎲",
  cooldown: 60
}
