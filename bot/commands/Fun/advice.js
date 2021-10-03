const Discord = require("discord.js");
const request = require("node-fetch");

const cmd = require("../../templates/command");

async function execute(bot, message) {
  request("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(async json => {
      const AdviceEmbed = new Discord.MessageEmbed()
        .setTitle("Here's an advice")
        .setDescription(json.slip.advice)
        .setFooter(`You got advice #${json.slip.id} • ${bot.config.embed.footer}`, bot.user.displayAvatarURL())
        .setColor(bot.config.embed.color)
        .setTimestamp();

      await message.reply({
        embeds: [AdviceEmbed]
      });
    });
}

module.exports = new cmd(execute, {
  description: "You'll need it.",
  dirname: __dirname,
  aliases: ["job"],
  usage: ``,
});
