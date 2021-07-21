const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (bot, message) => {
  request("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(async json => {
      const AdviceEmbed = new Discord.MessageEmbed()
        .setTitle("Here's an advice")
        .setDescription(json.slip.advice)
        .setFooter(`You got advice #${json.slip.id} • ${bot.config.bot.Embed.Footer}`, bot.user.displayAvatarURL())
        .setColor(bot.config.bot.Embed.Color)
        .setTimestamp();

      const Message = await message.reply(AdviceEmbed);

      Message.react("👍");
      Message.react("👎");
    });
},
  
  exports.config = {
    name: "Advice",
    description: "You'll need it.",
    aliases: [],
    usage: "",
    category: "😃fun😃",
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"],
    member_permissions: [],
    enabled: true,
    cooldown: 5
  }