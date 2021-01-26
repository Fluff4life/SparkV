const Discord = require("discord.js");
const request = require("node-fetch");

async function DMReaction(message, AdviceEmbed) {
  const Message = await message.reply(AdviceEmbed);

  Message.react("👍");
  Message.react("👎");
}

async function ChannelReaction(message, AdviceEmbed) {
  const Message = await message.channel.send(AdviceEmbed);

  Message.react("👍");
  Message.react("👎");
}

(exports.run = async (Bot, message) => {
  request("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(json => {
      const AdviceEmbed = new Discord.MessageEmbed()
        .setTitle("Here's an advice")
        .setDescription(json.slip.advice)
        .setFooter(`You got advice #${json.slip.id}`, process.env.bot_logo)
        .setColor("#0099ff")
        .setTimestamp();

      if (message.channel.type === "dm") {
        DMReaction(message, AdviceEmbed);

        return;
      }

      ChannelReaction(message, AdviceEmbed);
    });
}),
  (exports.config = {
    enabled: true,
    guild_only: false,
    mod_only: false,
    aliases: ["ad", "a"]
  }),
  (exports.help = {
    name: "Advice",
    description: "I will send an advice. You'll need it buddy!",
    usage: "",
    category: "😃fun😃",
    cooldown: 2.5
  });
