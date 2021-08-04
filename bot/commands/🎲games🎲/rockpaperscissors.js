const Discord = require("discord.js");

const Emojis = ["✂", "📄", "🗻"];

exports.run = async (bot, message, args, command, data) => {
  function GetResult(UserChosen, BotChosen) {
    if (
      (UserChosen === "🗻" && BotChosen === "✂") ||
      (UserChosen === "📄" && BotChosen === "🗻") ||
      (UserChosen === "✂" && BotChosen === "📄")
    ) {
      return "🎉You won!";
    } else if (BotChosen === UserChosen) {
      return "It's a tie!";
    } else {
      return `🎉${bot.user.username} won!`;
    }
  }

  const embed = new Discord.MessageEmbed()
    .setTitle("Rock Paper Scissors")
    .setDescription("React to one of these emojis to begin!")
    .setFooter(`${bot.user.username} • ${bot.config.bot.Embed.Footer}`, bot.user.displayAvatarURL())
    .setColor(bot.config.bot.Embed.Color);

  const Message = await message.reply(embed);
  const Reacted = await bot.PromptMessage(Message, message.author, Emojis, 60);
  const BotChoice = Emojis[Math.floor(Math.random() * Emojis.length)];
  const Result = await GetResult(Reacted, BotChoice);

  embed
    .setTitle("Game Over - Rock Paper Scissors")
    .setDescription(`${Result}`)
    .setFooter(`${Reacted} V.S. ${BotChoice} • ${bot.config.bot.Embed.Footer}`);

  Message.edit(embed);
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
};
