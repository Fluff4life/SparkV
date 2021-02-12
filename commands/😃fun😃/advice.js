const Discord = require("discord.js");
const request = require("node-fetch");

exports.run = async (Bot, message) => {
  request("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(async json => {
      const AdviceEmbed = new Discord.MessageEmbed()
        .setTitle("Here's an advice")
        .setDescription(json.slip.advice)
        .setFooter(`You got advice #${json.slip.id}`, process.env.bot_logo)
        .setColor("#0099ff")
        .setTimestamp();

      const Message = await message.channel.send(AdviceEmbed);

      Message.react("👍");
      Message.react("👎");
    });
},
  
  exports.config = {
    enabled: true,
    guild_only: false,
    aliases: ["ad", "a"],
    bot_permissions: ["SEND_MESSAGES", "EMBED_LINKS", "VIEW_CHANNEL", "ADD_REACTIONS"]
  },
  
  exports.help = {
    name: "Advice",
    description: "I will send an advice.",
    usage: "",
    category: "😃fun😃",
    cooldown: 2.5
  }