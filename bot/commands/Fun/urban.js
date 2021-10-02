const Discord = require(`discord.js`);
const urban = require(`urban`);

const cmd = require("../../templates/command");

async function execute(bot, message, args, command, data) {
  if (args.length < 1) {
    const ErrorEmbed = new Discord.MessageEmbed()
      .setTitle(`${bot.config.Emojis.error} | Invalid command usage!`)
      .setDescription(`Please provide a word to urban!`)
      .setFooter(`Try ^Urban [Word] • ${bot.config.embed.footer}`);

    return await message
      .reply({
        embeds: [ErrorEmbed],
      })
      .then(m => m.delete({ timeout: 5000 }));
  }

  const UrbanEmbed = new Discord.MessageEmbed()
    .setTitle(`${bot.config.Emojis.success} | Definition of ${json.word}`)
    .setDescription(json.definition)
    .setThumbnail(`https://i.imgur.com/VFXr0ID.jpg`)
    .addField(`Example`, json.example)
    .setURL(json.permalink)
    .setFooter(
      `👍${json.thumbs_up} 👎${json.thumbs_down} | 😃${json.author} • ${bot.config.embed.footer}`,
      bot.user.displayAvatarURL(),
    )
    .setColor(bot.config.embed.color);

  return await message.reply({
    embeds: [UrbanEmbed],
  });
}

module.exports = new cmd(execute, {
  description: `I will return an urban dictionary definition of a word!`,
  aliases: [],
  dirname: __dirname,
  usage: `<word>`,
});
