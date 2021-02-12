const Discord = require("discord.js");

const showerthoughts = ["showerthoughts"];

exports.run = async (Bot, message) => {
  const random_showerthought =
    showerthoughts[Math.floor(Math.random() * showerthoughts.length)];

  const ShowerThoughtEmbed = new Discord.MessageEmbed()
    .setTitle("Here's a shower thought")
    .setImage()
    .setFooter(
      `Shower Thought from r/${random_showerthought}`,
      process.env.bot_logo
    )
    .setURL(`https://reddit.com/r/${random_showerthought}`)
    .setColor("#0099ff")
    .setTimestamp();

  await message.reply(ShowerThoughtEmbed);
},
  
  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["sthought", "thought"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL"]
  },
  
  exports.help = {
    name: "ShowerThought",
    description: "I will return a thought you would only think of in the shower. Hmmmm...",
    usage: "",
    category: "😃fun😃",
    cooldown: 1.5
  }