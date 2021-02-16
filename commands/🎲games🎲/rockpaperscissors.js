const Discord = require("discord.js");

exports.run = async (Bot, message, Arguments) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("Rock Paper Scissors")
    .setDescription("React to one of these emojis to begin!")
    .setFooter(process.env.name, Bot.user.displayAvatarURL)
    .setTimestamp()




  const embed = new RichEmbed()
  .setColor("#ffffff")
  .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
  .setDescription("Add a reaction to one of these emojis to play the game!")
  .setTimestamp();

const m = await message.channel.send(embed);
// Wait for a reaction to be added
const reacted = await promptMessage(m, message.author, 30, chooseArr);

// Get a random emoji from the array
const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

// Check if it's a win/tie/loss
const result = await getResult(reacted, botChoice);
// Clear the reactions
await m.clearReactions();

embed
  .setDescription("")
  .addField(result, `${reacted} vs ${botChoice}`);

m.edit(embed);

function getResult(me, clientChosen) {
  if ((me === "🗻" && clientChosen === "✂") ||
      (me === "📰" && clientChosen === "🗻") ||
      (me === "✂" && clientChosen === "📰")) {
          return "You won!";
  } else if (me === clientChosen) {
      return "It's a tie!";
  } else {
      return "You lost!";
  }
}
},

exports.config = {
  enabled: true,
  guild_only: true,
  aliases: ["ttt"],
  bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL"]
},
    
exports.help = {
  name: "RockPaperScissors",
  description: "Play a game of Rock Paper Scissors with me!",
  usage: "",
  category: "🎲games🎲",
  cooldown: 60
}
